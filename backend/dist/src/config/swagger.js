"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Banco de Questões API',
            version: '1.0.0',
            description: 'API para gerenciamento de banco de questões educacionais',
            contact: {
                name: 'Suporte',
            },
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Servidor de desenvolvimento',
            },
        ],
        components: {
            schemas: {
                // Schemas de Questão
                BlocoEnunciado: {
                    type: 'object',
                    required: ['tipo', 'conteudo', 'ordem'],
                    properties: {
                        tipo: {
                            type: 'string',
                            enum: ['texto', 'imagem'],
                            description: 'Tipo do bloco (texto ou imagem)',
                        },
                        conteudo: {
                            type: 'string',
                            description: 'Conteúdo textual ou URL da imagem',
                        },
                        ordem: {
                            type: 'number',
                            description: 'Ordem do bloco no enunciado',
                        },
                    },
                },
                Alternativa: {
                    type: 'object',
                    required: ['letra', 'conteudo', 'correta'],
                    properties: {
                        letra: {
                            type: 'string',
                            enum: ['A', 'B', 'C', 'D', 'E'],
                            description: 'Letra da alternativa',
                        },
                        conteudo: {
                            type: 'string',
                            description: 'Conteúdo da alternativa',
                        },
                        correta: {
                            type: 'boolean',
                            description: 'Indica se é a alternativa correta',
                        },
                    },
                },
                Origem: {
                    type: 'object',
                    required: ['tipo'],
                    properties: {
                        tipo: {
                            type: 'string',
                            enum: ['vestibular', 'enem', 'concurso', 'olimpiada', 'propria', 'outro'],
                            description: 'Tipo da origem da questão',
                        },
                        nome: {
                            type: 'string',
                            description: 'Nome da origem (ex: FUVEST, ENEM 2023)',
                        },
                        ano: {
                            type: 'number',
                            description: 'Ano da questão',
                        },
                    },
                },
                QuestaoInput: {
                    type: 'object',
                    required: ['enunciado', 'assunto_ids', 'tipo', 'dificuldade', 'gabarito', 'origem'],
                    properties: {
                        enunciado: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/BlocoEnunciado' },
                            description: 'Array de blocos do enunciado',
                        },
                        assunto_ids: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'IDs dos assuntos relacionados',
                        },
                        topico_id: {
                            type: 'string',
                            description: 'ID do tópico específico (opcional)',
                        },
                        tipo: {
                            type: 'string',
                            enum: ['multipla_escolha', 'discursiva', 'verdadeiro_falso'],
                            description: 'Tipo da questão',
                        },
                        dificuldade: {
                            type: 'string',
                            enum: ['facil', 'media', 'dificil'],
                            description: 'Nível de dificuldade',
                        },
                        texto_base_id: {
                            type: 'string',
                            description: 'ID do texto base (opcional)',
                        },
                        alternativas: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Alternativa' },
                            description: 'Alternativas (para questões objetivas)',
                        },
                        gabarito: {
                            type: 'string',
                            description: 'Gabarito (letra A-E ou texto para discursiva)',
                        },
                        origem: {
                            $ref: '#/components/schemas/Origem',
                        },
                    },
                },
                Questao: {
                    allOf: [
                        { $ref: '#/components/schemas/QuestaoInput' },
                        {
                            type: 'object',
                            properties: {
                                _id: { type: 'string', description: 'ID único da questão' },
                                conteudo_hash: { type: 'string', description: 'Hash SHA256 para detecção de duplicatas' },
                                texto_normalizado: { type: 'string', description: 'Texto normalizado para busca' },
                                ativa: { type: 'boolean', description: 'Status de ativação' },
                                criado_em: { type: 'string', format: 'date-time' },
                                atualizado_em: { type: 'string', format: 'date-time' },
                            },
                        },
                    ],
                },
                PaginatedQuestoes: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Questao' },
                        },
                        pagination: {
                            type: 'object',
                            properties: {
                                total: { type: 'number' },
                                page: { type: 'number' },
                                limit: { type: 'number' },
                                totalPages: { type: 'number' },
                                hasNext: { type: 'boolean' },
                                hasPrev: { type: 'boolean' },
                            },
                        },
                    },
                },
                // Schemas de Matéria
                MateriaInput: {
                    type: 'object',
                    required: ['nome', 'slug'],
                    properties: {
                        nome: { type: 'string', description: 'Nome da matéria' },
                        slug: { type: 'string', description: 'Slug URL-friendly (único)' },
                        cor: { type: 'string', description: 'Código de cor hexadecimal' },
                        icone: { type: 'string', description: 'Nome do ícone' },
                        ordem: { type: 'number', description: 'Ordem de exibição' },
                    },
                },
                Materia: {
                    allOf: [
                        { $ref: '#/components/schemas/MateriaInput' },
                        {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                createdAt: { type: 'string', format: 'date-time' },
                                updatedAt: { type: 'string', format: 'date-time' },
                            },
                        },
                    ],
                },
                // Schemas de Assunto
                AssuntoInput: {
                    type: 'object',
                    required: ['nome', 'slug', 'materia_id'],
                    properties: {
                        nome: { type: 'string', description: 'Nome do assunto' },
                        slug: { type: 'string', description: 'Slug URL-friendly' },
                        materia_id: { type: 'string', description: 'ID da matéria' },
                        descricao: { type: 'string', description: 'Descrição do assunto' },
                        ordem: { type: 'number', description: 'Ordem de exibição' },
                    },
                },
                Assunto: {
                    allOf: [
                        { $ref: '#/components/schemas/AssuntoInput' },
                        {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                createdAt: { type: 'string', format: 'date-time' },
                                updatedAt: { type: 'string', format: 'date-time' },
                            },
                        },
                    ],
                },
                // Schemas de Tópico
                TopicoInput: {
                    type: 'object',
                    required: ['nome', 'slug', 'assunto_id'],
                    properties: {
                        nome: { type: 'string', description: 'Nome do tópico' },
                        slug: { type: 'string', description: 'Slug URL-friendly' },
                        assunto_id: { type: 'string', description: 'ID do assunto' },
                        descricao: { type: 'string', description: 'Descrição do tópico' },
                        ordem: { type: 'number', description: 'Ordem de exibição' },
                    },
                },
                Topico: {
                    allOf: [
                        { $ref: '#/components/schemas/TopicoInput' },
                        {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                createdAt: { type: 'string', format: 'date-time' },
                                updatedAt: { type: 'string', format: 'date-time' },
                            },
                        },
                    ],
                },
                // Schemas de Texto Base
                ImagemTextoBase: {
                    type: 'object',
                    required: ['url', 'ordem'],
                    properties: {
                        url: { type: 'string', description: 'URL da imagem' },
                        legenda: { type: 'string', description: 'Legenda da imagem' },
                        ordem: { type: 'number', description: 'Ordem da imagem' },
                    },
                },
                TextoBaseInput: {
                    type: 'object',
                    required: ['conteudo', 'tipo'],
                    properties: {
                        titulo: { type: 'string', description: 'Título do texto base' },
                        conteudo: { type: 'string', description: 'Conteúdo do texto' },
                        tipo: {
                            type: 'string',
                            enum: ['texto_literario', 'grafico', 'infografico', 'tabela', 'outro'],
                            description: 'Tipo do texto base',
                        },
                        imagens: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/ImagemTextoBase' },
                        },
                        materia_id: { type: 'string', description: 'ID da matéria relacionada' },
                        metadata: {
                            type: 'object',
                            properties: {
                                autor: { type: 'string' },
                                obra: { type: 'string' },
                                ano: { type: 'number' },
                            },
                            additionalProperties: true,
                        },
                    },
                },
                TextoBase: {
                    allOf: [
                        { $ref: '#/components/schemas/TextoBaseInput' },
                        {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                createdAt: { type: 'string', format: 'date-time' },
                                updatedAt: { type: 'string', format: 'date-time' },
                            },
                        },
                    ],
                },
                // Schemas de Lista de Exercícios
                QuestaoLista: {
                    type: 'object',
                    required: ['questao_id', 'ordem', 'peso', 'obrigatoria'],
                    properties: {
                        questao_id: { type: 'string', description: 'ID da questão' },
                        ordem: { type: 'number', description: 'Ordem na lista' },
                        peso: { type: 'number', description: 'Peso da questão' },
                        obrigatoria: { type: 'boolean', description: 'Se é obrigatória' },
                    },
                },
                ListaExerciciosInput: {
                    type: 'object',
                    required: ['titulo', 'materia_id', 'questoes', 'pontuacao_total', 'publica', 'criada_por'],
                    properties: {
                        titulo: { type: 'string', description: 'Título da lista' },
                        descricao: { type: 'string', description: 'Descrição da lista' },
                        materia_id: { type: 'string', description: 'ID da matéria' },
                        assunto_ids: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'IDs dos assuntos',
                        },
                        topico_ids: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'IDs dos tópicos',
                        },
                        questoes: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/QuestaoLista' },
                            description: 'Questões da lista',
                        },
                        dificuldade_geral: {
                            type: 'string',
                            enum: ['facil', 'media', 'dificil', 'mista'],
                        },
                        tempo_estimado: { type: 'number', description: 'Tempo estimado em minutos' },
                        pontuacao_total: { type: 'number', description: 'Pontuação total' },
                        publica: { type: 'boolean', description: 'Se a lista é pública' },
                        criada_por: { type: 'string', description: 'ID do criador' },
                        turma_ids: {
                            type: 'array',
                            items: { type: 'string' },
                            description: 'IDs das turmas',
                        },
                    },
                },
                ListaExercicios: {
                    allOf: [
                        { $ref: '#/components/schemas/ListaExerciciosInput' },
                        {
                            type: 'object',
                            properties: {
                                _id: { type: 'string' },
                                createdAt: { type: 'string', format: 'date-time' },
                                updatedAt: { type: 'string', format: 'date-time' },
                            },
                        },
                    ],
                },
                // Schema de Erro
                Error: {
                    type: 'object',
                    properties: {
                        error: { type: 'string', description: 'Mensagem de erro' },
                        message: { type: 'string', description: 'Descrição do erro' },
                        details: { type: 'object', description: 'Detalhes adicionais' },
                    },
                },
            },
        },
        tags: [
            { name: 'Questões', description: 'Operações de questões' },
            { name: 'Matérias', description: 'Operações de matérias' },
            { name: 'Assuntos', description: 'Operações de assuntos' },
            { name: 'Tópicos', description: 'Operações de tópicos' },
            { name: 'Textos Base', description: 'Operações de textos base' },
            { name: 'Listas de Exercícios', description: 'Operações de listas de exercícios' },
            { name: 'Analyzer', description: 'Análise de PDFs com IA' },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);

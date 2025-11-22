import { Document, Types } from 'mongoose';

// Bloco de conteúdo do enunciado (texto ou imagem)
export interface IBlocoEnunciado {
    tipo: 'texto' | 'imagem';
    conteudo: string; // texto ou URL da imagem
    ordem: number;
}

// Alternativa para questões objetivas
export interface IAlternativa {
    letra: 'A' | 'B' | 'C' | 'D' | 'E';
    conteudo: string; // texto ou URL se for imagem
    correta: boolean;
}

// Interface principal da Questão
export interface IQuestao extends Document {
    // === CAMPOS PREENCHIDOS PELO PROFESSOR ===

    enunciado: IBlocoEnunciado[];           // Array de blocos (texto/imagem) em ordem

    assunto_ids: Types.ObjectId[];          // Assuntos (pode ter mais de 1)
    topico_id?: Types.ObjectId;             // Tópico específico (opcional)

    tipo: 'multipla_escolha' | 'discursiva' | 'verdadeiro_falso';
    dificuldade: 'facil' | 'media' | 'dificil' | 'muito_dificil';

    texto_base_id?: Types.ObjectId;         // Texto de apoio (opcional)

    alternativas?: IAlternativa[];          // Apenas para questões objetivas
    gabarito: string;                       // Letra (A-E) ou texto para discursiva

    origem_id?: Types.ObjectId;             // Referência à origem (opcional)

    // === CAMPOS GERADOS PELO SISTEMA (detecção de duplicatas) ===

    conteudo_hash?: string;                 // Hash SHA256 para duplicatas exatas
    texto_normalizado?: string;             // Texto limpo para busca de similaridade

    ativa: boolean;
    criado_em: Date;
    atualizado_em: Date;
}

// Interface para criação (o que o professor envia)
export interface IQuestaoInput {
    enunciado: IBlocoEnunciado[];
    assunto_ids: string[];
    topico_id?: string;
    tipo: 'multipla_escolha' | 'discursiva' | 'verdadeiro_falso';
    dificuldade: 'facil' | 'media' | 'dificil';
    texto_base_id?: string;
    alternativas?: IAlternativa[];
    gabarito: string;
    origem_id?: string;                     // ID da origem (opcional)
}

// Interface para resultado de similaridade
export interface ISimilarityResult {
    questao_id: Types.ObjectId;
    similaridade: number; // 0-100
    tipo_match: 'hash_exato' | 'texto_similar';
}

// Interface para filtros de busca
export interface IQuestaoFilters {
    assunto_ids?: string[];
    topico_id?: string;
    tipo?: 'multipla_escolha' | 'discursiva' | 'verdadeiro_falso';
    dificuldade?: 'facil' | 'media' | 'dificil' | 'muito_dificil';
    origem_id?: string;
    search?: string;
}

// Interface para paginação
export interface IPaginationOptions {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

// Interface para resultado paginado
export interface IPaginatedResult<T> {
    data: T[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}

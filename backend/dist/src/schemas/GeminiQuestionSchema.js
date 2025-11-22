"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geminiQuestionSchema = void 0;
const generative_ai_1 = require("@google/generative-ai");
exports.geminiQuestionSchema = {
    description: "Lista de questões extraídas de uma prova/lista em PDF",
    type: generative_ai_1.SchemaType.ARRAY,
    items: {
        type: generative_ai_1.SchemaType.OBJECT,
        properties: {
            enunciado: {
                type: generative_ai_1.SchemaType.ARRAY,
                items: {
                    type: generative_ai_1.SchemaType.OBJECT,
                    properties: {
                        tipo: { type: generative_ai_1.SchemaType.STRING, enum: ["texto", "imagem_pendente", "imagem"] },
                        conteudo: { type: generative_ai_1.SchemaType.STRING },
                        legenda: { type: generative_ai_1.SchemaType.STRING, nullable: true }
                    },
                    required: ["tipo", "conteudo"]
                }
            },
            materia: { type: generative_ai_1.SchemaType.STRING, nullable: true },
            assuntos: {
                type: generative_ai_1.SchemaType.ARRAY,
                items: { type: generative_ai_1.SchemaType.STRING },
                nullable: true
            },
            is_multiple_choice: { type: generative_ai_1.SchemaType.BOOLEAN },
            dificuldade: {
                type: generative_ai_1.SchemaType.STRING,
                enum: ["Fácil", "Médio", "Difícil", "Muito Difícil"],
                nullable: true
            },
            gabarito: { type: generative_ai_1.SchemaType.STRING, nullable: true },
            topico: { type: generative_ai_1.SchemaType.ARRAY,
                items: { type: generative_ai_1.SchemaType.STRING },
                nullable: true
            },
            alternativas: {
                type: generative_ai_1.SchemaType.ARRAY,
                nullable: true,
                items: {
                    type: generative_ai_1.SchemaType.OBJECT,
                    properties: {
                        letra: { type: generative_ai_1.SchemaType.STRING },
                        // A IA deve marcar como "imagem_pendente" se não for texto
                        tipo: {
                            type: generative_ai_1.SchemaType.STRING,
                            enum: ["texto", "imagem_pendente"]
                        },
                        conteudo: { type: generative_ai_1.SchemaType.STRING }
                    },
                    required: ["letra", "tipo", "conteudo"]
                }
            },
            origem: {
                type: generative_ai_1.SchemaType.OBJECT,
                nullable: true,
                properties: {
                    tipo: {
                        type: generative_ai_1.SchemaType.STRING,
                        enum: ['Vestibular', 'Livro', 'Simulado', 'Outro'],
                        nullable: true
                    },
                    nome_fonte: { type: generative_ai_1.SchemaType.STRING, nullable: true }, // Ex: "IME"
                    ano: { type: generative_ai_1.SchemaType.NUMBER, nullable: true }, // Ex: 2023
                    detalhe: { type: generative_ai_1.SchemaType.STRING, nullable: true } // Ex: "2ª Fase"
                }
            }
        },
        required: ["enunciado", "is_multiple_choice"]
    }
};

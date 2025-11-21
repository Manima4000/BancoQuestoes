import { SchemaType } from "@google/generative-ai";

export const geminiQuestionSchema = {
    description: "Lista de questões extraídas de uma prova/lista em PDF",
    type: SchemaType.ARRAY,
    items: {
        type: SchemaType.OBJECT,
        properties: {
            enunciado: {
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.OBJECT,
                    properties: {
                        tipo: { type: SchemaType.STRING, enum: ["texto", "imagem_pendente"] },
                        conteudo: { type: SchemaType.STRING },
                        legenda: { type: SchemaType.STRING, nullable: true }
                    },
                    required: ["tipo", "conteudo"]
                }
            },
            materia: { type: SchemaType.STRING, nullable: true },
            assuntos: { 
                type: SchemaType.ARRAY, 
                items: { type: SchemaType.STRING },
                nullable: true 
            },
            is_multiple_choice: { type: SchemaType.BOOLEAN },
            dificuldade: { 
                type: SchemaType.STRING, 
                enum: ["Fácil", "Médio", "Difícil", "Muito Difícil"],
                nullable: true 
            },
            gabarito: { type: SchemaType.STRING, nullable: true },
            topico: {type: SchemaType.ARRAY, 
                items: { type: SchemaType.STRING },
                nullable: true 
            },
            alternativas: {
                type: SchemaType.ARRAY,
                nullable: true,
                items: {
                    type: SchemaType.OBJECT,
                    properties: {
                        letra: { type: SchemaType.STRING },
                        texto: { type: SchemaType.STRING }
                    }
                }
            },
            origem: {
                type: SchemaType.OBJECT,
                nullable: true,
                properties: {
                    tipo: { 
                        type: SchemaType.STRING, 
                        enum: ['Vestibular', 'Livro', 'Simulado', 'Outro'],
                        nullable: true
                    },
                    nome_fonte: { type: SchemaType.STRING, nullable: true }, // Ex: "IME"
                    ano: { type: SchemaType.NUMBER, nullable: true },        // Ex: 2023
                    detalhe: { type: SchemaType.STRING, nullable: true }     // Ex: "2ª Fase"
                }
            }
        },
        required: ["enunciado", "is_multiple_choice"]
    }
};
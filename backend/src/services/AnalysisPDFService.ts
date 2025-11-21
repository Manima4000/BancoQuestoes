import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import { geminiQuestionSchema } from '../schemas/GeminiQuestionSchema'; 


class AnalysisService {

    private fileToGenerativePart(path: string, mimeType: string) {
        return {
            inlineData: {
                data: fs.readFileSync(path).toString("base64"),
                mimeType
            },
        };
    }

    async analyzePdfAndDraftQuestions(filePath: string) {

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("A chave GEMINI_API_KEY não está definida no arquivo .env");
        }
        const genAI = new GoogleGenerativeAI(apiKey);


        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.0-flash",
            generationConfig: { 
                responseMimeType: "application/json",
                responseSchema: geminiQuestionSchema as any
            }
        });

        // 👇 Prompt refinado com o exemplo do IME
        const prompt = `
            Analise o PDF anexo e extraia as questões para um formato estruturado.
            
            INSTRUÇÕES GERAIS:
            1. Fórmulas Matemáticas: Converta OBRIGATORIAMENTE para LaTeX entre cifrões (Ex: $x^2 + y^2 = 1$).
            2. Imagens: Se houver gráficos/figuras, crie um bloco {"tipo": "imagem_pendente", "conteudo": "UPLOAD_PENDENTE"}.
            3. Matéria/Assuntos: Deduza pelo contexto da questão.
            4. O campo assuntos é algo mais abrangente enquanto o campo topico é algo mais específico. Por exemplo, "Cálculo" pode ser um assunto, enquanto "Derivadas" é um tópico dentro de Cálculo, e esses dois estão dentro da matéria Matemática
            5. o campo "materia" corresponde a "Matemática", "Física", "Química", "Biologia", "História", "Geografia", etc
            6. O campo "enunciado" é um array de blocos, onde cada bloco pode ser texto ou imagem. Quero que ele seja preenchido na ordem. Se tiver um texto, uma imagem e um outro texto, quero que seja exatamente nessa ordem.
            7. Alternativas: Identifique claramente as opções (A, B, C...) e associe-as corretamente. Lembre de preencher em CapsLock
            8. Gabarito: Se não encontrar no PDF, deixe o campo "gabarito" como string vazia "".

            FORMATO DE SAÍDA:   
            
            [
                {
                    "enunciado": [
                        { "tipo": "texto", "conteudo": "Texto do enunciado com fórmulas em LaTeX..." },
                        { "tipo": "imagem_pendente", "conteudo": "UPLOAD_PENDENTE", "legenda": "Gráfico ilustrativo" }
                    ],
                    "materia": "Matemática",
                    "assuntos": ["Cálculo", "Geometria Analítica"],
                    "is_multiple_choice": true,
                    "dificuldade": "Médio",
                    "topico": ["Integrais Indefinidas","Cônicas"],
                    "origem": {
                        "tipo": "Vestibular",
                        "nome_fonte": "IME",
                        "ano": 2023
                    },
                    "gabarito": "A",
                    "alternativas": [
                        { "letra": "A", "texto": "$x^3/3 + C$" },
                        { "letra": "B", "texto": "$2x + C$" },
                        { "letra": "C", "texto": "$\\ln|x| + C$" }
                    ]
                },
                ...
            ]
            
            INSTRUÇÕES DE ORIGEM (CONTEXTO):
            Analise o cabeçalho ou rodapé do PDF para identificar a origem (Instituição, Ano, Fase). Essa informação também pode vir no inicio do enunciado das questões
            
            EXEMPLO DE EXTRAÇÃO:
            Se o documento for uma prova do IME 2023 da Segunda Fase, preencha o campo origem assim:
            "origem": {
                "tipo": "Vestibular",
                "nome_fonte": "IME",
                "ano": 2023,
                "detalhe": "2ª Fase"
            }
            
            Se não houver indicação clara no PDF, deixe o campo origem como null.
        `;

        try {
            const pdfPart = this.fileToGenerativePart(filePath, "application/pdf");
            const result = await model.generateContent([prompt, pdfPart]);
            
            return JSON.parse(result.response.text());
        } catch (error) {
            console.error("Erro na IA:", error);
            throw new Error("Falha ao analisar o PDF.");
        }
    }
}

export default new AnalysisService();
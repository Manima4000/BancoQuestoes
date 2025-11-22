import { GoogleGenerativeAI } from "@google/generative-ai";
import { geminiQuestionSchema } from '../schemas/GeminiQuestionSchema';

class GeminiParserService {
    
    public async parseMarkdownToQuestions(markdownText: string): Promise<any> {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) throw new Error("Chave GEMINI_API_KEY ausente.");

        const genAI = new GoogleGenerativeAI(apiKey);
        
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.0-flash",
            generationConfig: { 
                responseMimeType: "application/json",
                responseSchema: geminiQuestionSchema as any,
                maxOutputTokens: 15000 
            }
        });

        const prompt = `
            Você é um especialista em estruturar dados de provas militares.
            Abaixo está o conteúdo de uma lista de exercícios extraída via OCR (Markdown).
            
            TAREFA PRINCIPAL:
            Converta este Markdown em um JSON Array de questões.

            TRATAMENTO DE IMAGENS (MUITO IMPORTANTE):
            O OCR Mathpix retorna imagens assim: ![](https://cdn.mathpix.com/...)
            
            1. ENUNCIADO: Se encontrar uma imagem no meio do texto da questão:
               Crie um bloco: { "tipo": "imagem", "conteudo": "A_URL_DA_MATHPIX" }
            
            2. ALTERNATIVAS: Se uma alternativa for uma imagem:
               { "letra": "A", "tipo": "imagem", "texto": "A_URL_DA_MATHPIX" }

            OUTRAS REGRAS:
            - Identifique separação de questões por números (1., 2., Questão 1).
            - Identifique a Origem (Cabeçalho) se houver.
            - Mantenha o LaTeX ($...$) intacto.

            ENTRADA (MARKDOWN):
            ${markdownText}
        `;

        try {
            const result = await model.generateContent(prompt);
            return JSON.parse(result.response.text());
        } catch (error) {
            console.error("Erro no GeminiParserService:", error);
            throw new Error("Falha ao estruturar os dados com a IA.");
        }
    }
}

export default new GeminiParserService();
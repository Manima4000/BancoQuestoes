import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

class PdfExtractionService {

    private fileToGenerativePart(path: string, mimeType: string) {
        return {
            inlineData: {
                data: fs.readFileSync(path).toString("base64"),
                mimeType
            },
        };
    }

    async extractQuestionsFromPdf(filePath: string) {
        // O modelo Flash é suficiente e mais rápido
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" } // Força saída JSON
        });

        const prompt = `
            Analise o PDF anexo. Extraia as questões seguindo ESTRITAMENTE este esquema JSON.
            
            REGRAS:
            1. "enunciado" DEVE ser uma lista de blocos. Use APENAS {"tipo": "texto", "conteudo": "..."}.
            2. Se houver imagem ou gráfico no PDF, insira um bloco de texto escrito "[IMAGEM DO PDF]" no local.
            3. Fórmulas matemáticas DEVEM ser convertidas para LaTeX entre cifrões ($...$).
            4. "is_multiple_choice": true se tiver alternativas (A, B, C...), false se for discursiva.
            5. "dificuldade": Estime entre 'Fácil', 'Médio', 'Difícil', 'Muito Difícil'.
            6. "gabarito": Se não encontrar no PDF, deixe string vazia "".
            7. Caso a questão possuam alguma origem explicita como por exemplo (IME 2023): adicione o campo "origem" com "tipo": "Vestibular" ou "Livro" ou "Simulado ou "Outro", "nome_fonte": "IME", "ano": 2023.
            8. Caso não tenha a origem explicita, omita o campo "origem".

            EXEMPLO DE SAÍDA ESPERADA (Array de Objetos):
            [
                {
                    "enunciado": [
                        { "tipo": "texto", "conteudo": "Calcule a integral abaixo:" },
                        { "tipo": "texto", "conteudo": "$\\int x^2 dx$" },
                        { "tipo": "texto", "conteudo": "[IMAGEM DO PDF]" }
                    ],
                    "materia": "Matemática",
                    "tipo": "Exatas",
                    "is_multiple_choice": true,
                    "assuntos": ["Cálculo"],
                    "topicos": ["Integrais Indefinidas"],
                    "dificuldade": "Médio",
                    "origem": {
                        "tipo": "Vestibular",
                        "nome_fonte": "AFA",
                        "ano": 2023
                    },
                    "gabarito": "A",
                    "alternativas": [
                        { "letra": "A", "texto": "$x^3/3 + C$" },
                        { "letra": "B", "texto": "$x^2 + C$" }
                    ]
                }
            ]
        `;

        const pdfPart = this.fileToGenerativePart(filePath, "application/pdf");

        try {
            const result = await model.generateContent([prompt, pdfPart]);
            const response = result.response;
            
            // Como configuramos responseMimeType: "application/json", ele já deve vir limpo
            const text = response.text(); 
            return JSON.parse(text);
        } catch (error) {
            console.error("Erro na extração IA:", error);
            throw new Error("Falha ao interpretar o PDF com IA.");
        }
    }
}

export default new PdfExtractionService();
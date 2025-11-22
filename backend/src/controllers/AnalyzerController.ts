import { Request, Response } from 'express';
import fs from 'fs';
import MathpixService from '../services/MathpixService';
import GeminiParserService from '../services/GeminiParserService';

export const analyzePdf = async (req: Request, res: Response) => {
    // 1. Validação Básica
    if (!req.file) {
        return res.status(400).json({ error: 'Envie um arquivo PDF.' });
    }

    try {
        console.log(`🚀 [Analyzer] Iniciando processamento do arquivo: ${req.file.originalname}`);

        console.log("1️⃣  Enviando para Mathpix...");
        const markdownResult = await MathpixService.convertPdfToMarkdown(req.file.path);
        
        console.log("2️⃣  Enviando para Gemini estruturar...");
        const questoesEstruturadas = await GeminiParserService.parseMarkdownToQuestions(markdownResult);

        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        console.log(`✅ [Analyzer] Sucesso! ${questoesEstruturadas.length} questões identificadas.`);

        return res.json({
            message: 'Análise concluída com sucesso.',
            total_questoes: questoesEstruturadas.length,
            rascunho: questoesEstruturadas
        });

    } catch (error: any) {
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        console.error("❌ [Analyzer] Erro fatal:", error.message);
        
        return res.status(500).json({ 
            message: 'Erro ao processar o documento.',
            error: error.message,
            details: error.response?.data || "Sem detalhes externos"
        });
    }
};
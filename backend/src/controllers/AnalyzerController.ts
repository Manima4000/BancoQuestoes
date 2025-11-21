import { Request, Response } from 'express';
import AnalysisPDFService from '../services/AnalysisPDFService'; // 👈 Importando o novo service
import fs from 'fs';

export const analyzePdf = async (req: Request, res: Response) => {
    if (!req.file) return res.status(400).json({ error: 'Envie um PDF.' });

    try {
        const rascunho = await AnalysisPDFService.analyzePdfAndDraftQuestions(req.file.path);

        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        res.json({ 
            message: 'Análise concluída com sucesso.', 
            rascunho: rascunho 
        });

    } catch (error: any) {
        // Garante limpeza em caso de erro
        if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        res.status(500).json({ 
            message: 'Erro ao analisar PDF.',
            error: error.message 
        });
    }
};
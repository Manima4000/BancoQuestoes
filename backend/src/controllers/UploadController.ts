import { Request, Response } from 'express';
import UploadService from '../services/UploadService';

export const uploadImage = async (req: Request, res: Response) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    try {
        const fileUrl = await UploadService.salvarImagem(req.file.buffer, req.file.originalname);

        return res.status(201).json({ 
            message: 'Upload realizado com sucesso!',
            url: fileUrl
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao processar imagem.' });
    }
};
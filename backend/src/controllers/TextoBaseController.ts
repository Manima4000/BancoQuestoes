import { Request, Response } from 'express';
import { TextoBaseService } from '../services/TextoBaseService';

const textoBaseService = new TextoBaseService();

export class TextoBaseController {
    async create(req: Request, res: Response) {
        try {
            const textoBase = await textoBaseService.create(req.body);
            res.status(201).json(textoBase);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async find(req: Request, res: Response) {
        try {
            const textoBases = await textoBaseService.find();
            res.status(200).json(textoBases);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const textoBase = await textoBaseService.findOne(req.params.id);
            if (!textoBase) {
                return res.status(404).json({ message: 'TextoBase not found' });
            }
            res.status(200).json(textoBase);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const textoBase = await textoBaseService.update(req.params.id, req.body);
            if (!textoBase) {
                return res.status(404).json({ message: 'TextoBase not found' });
            }
            res.status(200).json(textoBase);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const textoBase = await textoBaseService.delete(req.params.id);
            if (!textoBase) {
                return res.status(404).json({ message: 'TextoBase not found' });
            }
            res.status(200).json({ message: 'TextoBase deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

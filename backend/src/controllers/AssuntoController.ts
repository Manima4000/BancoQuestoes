import { Request, Response } from 'express';
import { AssuntoService } from '../services/AssuntoService';

const assuntoService = new AssuntoService();

export class AssuntoController {
    async create(req: Request, res: Response) {
        try {
            const assunto = await assuntoService.create(req.body);
            res.status(201).json(assunto);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async find(req: Request, res: Response) {
        try {
            const assuntos = await assuntoService.find();
            res.status(200).json(assuntos);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const assunto = await assuntoService.findOne(req.params.id);
            if (!assunto) {
                return res.status(404).json({ message: 'Assunto not found' });
            }
            res.status(200).json(assunto);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const assunto = await assuntoService.update(req.params.id, req.body);
            if (!assunto) {
                return res.status(404).json({ message: 'Assunto not found' });
            }
            res.status(200).json(assunto);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const assunto = await assuntoService.delete(req.params.id);
            if (!assunto) {
                return res.status(404).json({ message: 'Assunto not found' });
            }
            res.status(200).json({ message: 'Assunto deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async findByMateria(req: Request, res: Response) {
        try {
            const assuntos = await assuntoService.findByMateria(req.params.materiaId);
            res.status(200).json(assuntos);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

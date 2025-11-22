import { Request, Response } from 'express';
import { TopicoService } from '../services/TopicoService';

const topicoService = new TopicoService();

export class TopicoController {
    async create(req: Request, res: Response) {
        try {
            const topico = await topicoService.create(req.body);
            res.status(201).json(topico);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async find(req: Request, res: Response) {
        try {
            const topicos = await topicoService.find();
            res.status(200).json(topicos);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const topico = await topicoService.findOne(req.params.id);
            if (!topico) {
                return res.status(404).json({ message: 'Topico not found' });
            }
            res.status(200).json(topico);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const topico = await topicoService.update(req.params.id, req.body);
            if (!topico) {
                return res.status(404).json({ message: 'Topico not found' });
            }
            res.status(200).json(topico);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const topico = await topicoService.delete(req.params.id);
            if (!topico) {
                return res.status(404).json({ message: 'Topico not found' });
            }
            res.status(200).json({ message: 'Topico deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async findByAssunto(req: Request, res: Response) {
        try {
            const topicos = await topicoService.findByAssunto(req.params.assuntoId);
            res.status(200).json(topicos);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

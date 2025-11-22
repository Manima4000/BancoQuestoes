import { Request, Response } from 'express';
import { MateriaService } from '../services/MateriaService';

const materiaService = new MateriaService();

export class MateriaController {
    async create(req: Request, res: Response) {
        try {
            const materia = await materiaService.create(req.body);
            res.status(201).json(materia);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async find(req: Request, res: Response) {
        try {
            const materias = await materiaService.find();
            res.status(200).json(materias);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const materia = await materiaService.findOne(req.params.id);
            if (!materia) {
                return res.status(404).json({ message: 'Materia not found' });
            }
            res.status(200).json(materia);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const materia = await materiaService.update(req.params.id, req.body);
            if (!materia) {
                return res.status(404).json({ message: 'Materia not found' });
            }
            res.status(200).json(materia);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const materia = await materiaService.delete(req.params.id);
            if (!materia) {
                return res.status(404).json({ message: 'Materia not found' });
            }
            res.status(200).json({ message: 'Materia deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

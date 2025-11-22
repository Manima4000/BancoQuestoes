import { Request, Response } from 'express';
import { ListaExerciciosService } from '../services/ListaExerciciosService';

const listaExerciciosService = new ListaExerciciosService();

export class ListaExerciciosController {
    async create(req: Request, res: Response) {
        try {
            const listaExercicios = await listaExerciciosService.create(req.body);
            res.status(201).json(listaExercicios);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async find(req: Request, res: Response) {
        try {
            const listaExercicios = await listaExerciciosService.find();
            res.status(200).json(listaExercicios);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const listaExercicios = await listaExerciciosService.findOne(req.params.id);
            if (!listaExercicios) {
                return res.status(404).json({ message: 'ListaExercicios not found' });
            }
            res.status(200).json(listaExercicios);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const listaExercicios = await listaExerciciosService.update(req.params.id, req.body);
            if (!listaExercicios) {
                return res.status(404).json({ message: 'ListaExercicios not found' });
            }
            res.status(200).json(listaExercicios);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const listaExercicios = await listaExerciciosService.delete(req.params.id);
            if (!listaExercicios) {
                return res.status(404).json({ message: 'ListaExercicios not found' });
            }
            res.status(200).json({ message: 'ListaExercicios deleted successfully' });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

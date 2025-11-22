import { Request, Response } from 'express';
import { OrigemService } from '../services/OrigemService';
import { TipoOrigem } from '../interfaces/IOrigem';

const origemService = new OrigemService();

export class OrigemController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const origem = await origemService.create(req.body);
            res.status(201).json(origem);
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro ao criar origem' });
            }
        }
    }

    async find(req: Request, res: Response): Promise<void> {
        try {
            const { tipo, search, ano } = req.query;
            const filters: any = {};

            if (tipo) filters.tipo = tipo as TipoOrigem;
            if (search) filters.search = search as string;
            if (ano) filters.ano = parseInt(ano as string);

            const origens = await origemService.find(filters);
            res.json(origens);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar origens' });
        }
    }

    async findOne(req: Request, res: Response): Promise<void> {
        try {
            const origem = await origemService.findOne(req.params.id);
            if (!origem) {
                res.status(404).json({ error: 'Origem não encontrada' });
                return;
            }
            res.json(origem);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar origem' });
        }
    }

    async findByTipo(req: Request, res: Response): Promise<void> {
        try {
            const origens = await origemService.findByTipo(req.params.tipo as TipoOrigem);
            res.json(origens);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar origens por tipo' });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const origem = await origemService.update(req.params.id, req.body);
            if (!origem) {
                res.status(404).json({ error: 'Origem não encontrada' });
                return;
            }
            res.json(origem);
        } catch (error: any) {
            if (error.name === 'ValidationError') {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro ao atualizar origem' });
            }
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const origem = await origemService.delete(req.params.id);
            if (!origem) {
                res.status(404).json({ error: 'Origem não encontrada' });
                return;
            }
            res.json({ message: 'Origem desativada com sucesso' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao desativar origem' });
        }
    }

    async hardDelete(req: Request, res: Response): Promise<void> {
        try {
            const origem = await origemService.hardDelete(req.params.id);
            if (!origem) {
                res.status(404).json({ error: 'Origem não encontrada' });
                return;
            }
            res.json({ message: 'Origem removida permanentemente' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao remover origem' });
        }
    }

    async countQuestoes(req: Request, res: Response): Promise<void> {
        try {
            const count = await origemService.countQuestoes(req.params.id);
            res.json({ count });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao contar questões' });
        }
    }

    async getEstatisticas(req: Request, res: Response): Promise<void> {
        try {
            const estatisticas = await origemService.getEstatisticas();
            res.json(estatisticas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter estatísticas' });
        }
    }
}

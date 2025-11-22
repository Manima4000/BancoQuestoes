import { Request, Response } from 'express';
import { QuestaoService } from '../services/QuestaoService';
import { IQuestaoFilters, IPaginationOptions } from '../interfaces/IQuestao';

const questaoService = new QuestaoService();

export class QuestaoController {

    // POST /api/questoes
    async create(req: Request, res: Response) {
        try {
            const verificarDuplicata = req.query.verificarDuplicata !== 'false';
            const questao = await questaoService.create(req.body, verificarDuplicata);
            res.status(201).json(questao);
        } catch (error: any) {
            if (error.message.includes('similar') || error.message.includes('duplicada')) {
                return res.status(409).json({ error: error.message });
            }
            if (error.message.includes('deve ter') || error.message.includes('não devem')) {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    // GET /api/questoes
    async find(req: Request, res: Response) {
        try {
            const filters: IQuestaoFilters = {};
            const pagination: IPaginationOptions = {};

            // Paginação
            if (req.query.page) pagination.page = parseInt(req.query.page as string);
            if (req.query.limit) pagination.limit = Math.min(parseInt(req.query.limit as string), 100);
            if (req.query.sortBy) pagination.sortBy = req.query.sortBy as string;
            if (req.query.sortOrder) pagination.sortOrder = req.query.sortOrder as 'asc' | 'desc';

            // Filtros
            if (req.query.assunto_ids) {
                filters.assunto_ids = Array.isArray(req.query.assunto_ids)
                    ? req.query.assunto_ids as string[]
                    : [req.query.assunto_ids as string];
            }
            if (req.query.topico_id) filters.topico_id = req.query.topico_id as string;
            if (req.query.tipo) filters.tipo = req.query.tipo as any;
            if (req.query.dificuldade) filters.dificuldade = req.query.dificuldade as any;
            if (req.query.origem_id) filters.origem_id = req.query.origem_id as string;
            if (req.query.search) filters.search = req.query.search as string;

            const resultado = await questaoService.find(filters, pagination);
            res.status(200).json(resultado);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // GET /api/questoes/estatisticas
    async getEstatisticas(req: Request, res: Response) {
        try {
            const estatisticas = await questaoService.getEstatisticas();
            res.status(200).json(estatisticas);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // GET /api/questoes/aleatorias
    async findRandom(req: Request, res: Response) {
        try {
            const filters: IQuestaoFilters = {};
            const quantidade = Math.min(parseInt(req.query.quantidade as string) || 10, 50);

            if (req.query.assunto_ids) {
                filters.assunto_ids = Array.isArray(req.query.assunto_ids)
                    ? req.query.assunto_ids as string[]
                    : [req.query.assunto_ids as string];
            }
            if (req.query.tipo) filters.tipo = req.query.tipo as any;
            if (req.query.dificuldade) filters.dificuldade = req.query.dificuldade as any;

            const questoes = await questaoService.findRandom(filters, quantidade);
            res.status(200).json(questoes);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // POST /api/questoes/verificar-similaridade
    async verificarSimilaridade(req: Request, res: Response) {
        try {
            const limiar = parseInt(req.query.limiar as string) || 80;
            const similares = await questaoService.verificarSimilaridade(req.body, limiar);

            res.status(200).json({
                temSimilar: similares.length > 0,
                questoesSimilares: similares
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // GET /api/questoes/contagem
    async count(req: Request, res: Response) {
        try {
            const filters: IQuestaoFilters = {};

            if (req.query.assunto_ids) {
                filters.assunto_ids = Array.isArray(req.query.assunto_ids)
                    ? req.query.assunto_ids as string[]
                    : [req.query.assunto_ids as string];
            }
            if (req.query.tipo) filters.tipo = req.query.tipo as any;
            if (req.query.dificuldade) filters.dificuldade = req.query.dificuldade as any;

            const count = await questaoService.count(filters);
            res.status(200).json({ count });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // GET /api/questoes/:id
    async findOne(req: Request, res: Response) {
        try {
            const questao = await questaoService.findOne(req.params.id);
            if (!questao) {
                return res.status(404).json({ error: 'Questão não encontrada' });
            }
            res.status(200).json(questao);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // PUT /api/questoes/:id
    async update(req: Request, res: Response) {
        try {
            const questao = await questaoService.update(req.params.id, req.body);
            res.status(200).json(questao);
        } catch (error: any) {
            if (error.message.includes('duplicada')) {
                return res.status(409).json({ error: error.message });
            }
            if (error.message.includes('não encontrada')) {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: error.message });
        }
    }

    // DELETE /api/questoes/:id
    async delete(req: Request, res: Response) {
        try {
            const questao = await questaoService.delete(req.params.id);
            if (!questao) {
                return res.status(404).json({ error: 'Questão não encontrada' });
            }
            res.status(200).json({ message: 'Questão desativada', questao });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // DELETE /api/questoes/:id/permanente
    async hardDelete(req: Request, res: Response) {
        try {
            const questao = await questaoService.hardDelete(req.params.id);
            if (!questao) {
                return res.status(404).json({ error: 'Questão não encontrada' });
            }
            res.status(200).json({ message: 'Questão removida permanentemente' });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

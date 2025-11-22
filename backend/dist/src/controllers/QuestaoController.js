"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestaoController = void 0;
const QuestaoService_1 = require("../services/QuestaoService");
const questaoService = new QuestaoService_1.QuestaoService();
class QuestaoController {
    // POST /api/questoes
    async create(req, res) {
        try {
            const verificarDuplicata = req.query.verificarDuplicata !== 'false';
            const questao = await questaoService.create(req.body, verificarDuplicata);
            res.status(201).json(questao);
        }
        catch (error) {
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
    async find(req, res) {
        try {
            const filters = {};
            const pagination = {};
            // Paginação
            if (req.query.page)
                pagination.page = parseInt(req.query.page);
            if (req.query.limit)
                pagination.limit = Math.min(parseInt(req.query.limit), 100);
            if (req.query.sortBy)
                pagination.sortBy = req.query.sortBy;
            if (req.query.sortOrder)
                pagination.sortOrder = req.query.sortOrder;
            // Filtros
            if (req.query.assunto_ids) {
                filters.assunto_ids = Array.isArray(req.query.assunto_ids)
                    ? req.query.assunto_ids
                    : [req.query.assunto_ids];
            }
            if (req.query.topico_id)
                filters.topico_id = req.query.topico_id;
            if (req.query.tipo)
                filters.tipo = req.query.tipo;
            if (req.query.dificuldade)
                filters.dificuldade = req.query.dificuldade;
            if (req.query.origem_tipo)
                filters.origem_tipo = req.query.origem_tipo;
            if (req.query.search)
                filters.search = req.query.search;
            const resultado = await questaoService.find(filters, pagination);
            res.status(200).json(resultado);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // GET /api/questoes/estatisticas
    async getEstatisticas(req, res) {
        try {
            const estatisticas = await questaoService.getEstatisticas();
            res.status(200).json(estatisticas);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // GET /api/questoes/aleatorias
    async findRandom(req, res) {
        try {
            const filters = {};
            const quantidade = Math.min(parseInt(req.query.quantidade) || 10, 50);
            if (req.query.assunto_ids) {
                filters.assunto_ids = Array.isArray(req.query.assunto_ids)
                    ? req.query.assunto_ids
                    : [req.query.assunto_ids];
            }
            if (req.query.tipo)
                filters.tipo = req.query.tipo;
            if (req.query.dificuldade)
                filters.dificuldade = req.query.dificuldade;
            const questoes = await questaoService.findRandom(filters, quantidade);
            res.status(200).json(questoes);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // POST /api/questoes/verificar-similaridade
    async verificarSimilaridade(req, res) {
        try {
            const limiar = parseInt(req.query.limiar) || 80;
            const similares = await questaoService.verificarSimilaridade(req.body, limiar);
            res.status(200).json({
                temSimilar: similares.length > 0,
                questoesSimilares: similares
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // GET /api/questoes/contagem
    async count(req, res) {
        try {
            const filters = {};
            if (req.query.assunto_ids) {
                filters.assunto_ids = Array.isArray(req.query.assunto_ids)
                    ? req.query.assunto_ids
                    : [req.query.assunto_ids];
            }
            if (req.query.tipo)
                filters.tipo = req.query.tipo;
            if (req.query.dificuldade)
                filters.dificuldade = req.query.dificuldade;
            const count = await questaoService.count(filters);
            res.status(200).json({ count });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // GET /api/questoes/:id
    async findOne(req, res) {
        try {
            const questao = await questaoService.findOne(req.params.id);
            if (!questao) {
                return res.status(404).json({ error: 'Questão não encontrada' });
            }
            res.status(200).json(questao);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // PUT /api/questoes/:id
    async update(req, res) {
        try {
            const questao = await questaoService.update(req.params.id, req.body);
            res.status(200).json(questao);
        }
        catch (error) {
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
    async delete(req, res) {
        try {
            const questao = await questaoService.delete(req.params.id);
            if (!questao) {
                return res.status(404).json({ error: 'Questão não encontrada' });
            }
            res.status(200).json({ message: 'Questão desativada', questao });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // DELETE /api/questoes/:id/permanente
    async hardDelete(req, res) {
        try {
            const questao = await questaoService.hardDelete(req.params.id);
            if (!questao) {
                return res.status(404).json({ error: 'Questão não encontrada' });
            }
            res.status(200).json({ message: 'Questão removida permanentemente' });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.QuestaoController = QuestaoController;

import { Router } from 'express';
import { OrigemController } from '../controllers/OrigemController';

const router = Router();
const origemController = new OrigemController();

/**
 * @swagger
 * /api/origens/estatisticas:
 *   get:
 *     summary: Obtém estatísticas das origens
 *     tags: [Origens]
 *     responses:
 *       200:
 *         description: Estatísticas das origens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total: { type: number }
 *                 porTipo: { type: object }
 */
router.get('/origens/estatisticas', origemController.getEstatisticas);

/**
 * @swagger
 * /api/origens/tipo/{tipo}:
 *   get:
 *     summary: Lista origens por tipo
 *     tags: [Origens]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         schema:
 *           type: string
 *           enum: [vestibular, enem, concurso, olimpiada, livro, simulado, propria, outro]
 *         description: Tipo da origem
 *     responses:
 *       200:
 *         description: Lista de origens do tipo especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Origem'
 */
router.get('/origens/tipo/:tipo', origemController.findByTipo);

/**
 * @swagger
 * /api/origens/{id}/questoes/count:
 *   get:
 *     summary: Conta questões vinculadas a uma origem
 *     tags: [Origens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da origem
 *     responses:
 *       200:
 *         description: Contagem de questões
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count: { type: number }
 */
router.get('/origens/:id/questoes/count', origemController.countQuestoes);

/**
 * @swagger
 * /api/origens:
 *   post:
 *     summary: Cria uma nova origem
 *     tags: [Origens]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrigemInput'
 *     responses:
 *       201:
 *         description: Origem criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Origem'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/origens', origemController.create);

/**
 * @swagger
 * /api/origens:
 *   get:
 *     summary: Lista todas as origens
 *     tags: [Origens]
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [vestibular, enem, concurso, olimpiada, livro, simulado, propria, outro]
 *         description: Filtrar por tipo
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Busca textual no nome
 *       - in: query
 *         name: ano
 *         schema:
 *           type: number
 *         description: Filtrar por ano
 *     responses:
 *       200:
 *         description: Lista de origens
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Origem'
 */
router.get('/origens', origemController.find);

/**
 * @swagger
 * /api/origens/{id}:
 *   get:
 *     summary: Obtém uma origem específica
 *     tags: [Origens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da origem
 *     responses:
 *       200:
 *         description: Origem encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Origem'
 *       404:
 *         description: Origem não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/origens/:id', origemController.findOne);

/**
 * @swagger
 * /api/origens/{id}:
 *   put:
 *     summary: Atualiza uma origem
 *     tags: [Origens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da origem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrigemInput'
 *     responses:
 *       200:
 *         description: Origem atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Origem'
 *       404:
 *         description: Origem não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/origens/:id', origemController.update);

/**
 * @swagger
 * /api/origens/{id}:
 *   delete:
 *     summary: Desativa uma origem (soft delete)
 *     tags: [Origens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da origem
 *     responses:
 *       200:
 *         description: Origem desativada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *       404:
 *         description: Origem não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/origens/:id', origemController.delete);

/**
 * @swagger
 * /api/origens/{id}/permanente:
 *   delete:
 *     summary: Remove permanentemente uma origem (hard delete)
 *     tags: [Origens]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da origem
 *     responses:
 *       200:
 *         description: Origem removida permanentemente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *       404:
 *         description: Origem não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/origens/:id/permanente', origemController.hardDelete);

export default router;

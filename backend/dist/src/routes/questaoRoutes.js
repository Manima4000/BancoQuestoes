"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QuestaoController_1 = require("../controllers/QuestaoController");
const router = (0, express_1.Router)();
const questaoController = new QuestaoController_1.QuestaoController();
/**
 * @swagger
 * /api/questoes/estatisticas:
 *   get:
 *     summary: Obtém estatísticas das questões
 *     tags: [Questões]
 *     responses:
 *       200:
 *         description: Estatísticas das questões
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total: { type: number }
 *                 porTipo: { type: object }
 *                 porDificuldade: { type: object }
 *                 porOrigem: { type: object }
 *       500:
 *         description: Erro interno
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/questoes/estatisticas', questaoController.getEstatisticas);
/**
 * @swagger
 * /api/questoes/contagem:
 *   get:
 *     summary: Obtém contagem de questões com filtros
 *     tags: [Questões]
 *     parameters:
 *       - in: query
 *         name: assunto_ids
 *         schema:
 *           type: array
 *           items: { type: string }
 *         description: Filtrar por IDs de assuntos
 *       - in: query
 *         name: topico_id
 *         schema:
 *           type: string
 *         description: Filtrar por ID de tópico
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [multipla_escolha, discursiva, verdadeiro_falso]
 *         description: Filtrar por tipo
 *       - in: query
 *         name: dificuldade
 *         schema:
 *           type: string
 *           enum: [facil, media, dificil]
 *         description: Filtrar por dificuldade
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
router.get('/questoes/contagem', questaoController.count);
/**
 * @swagger
 * /api/questoes/aleatorias:
 *   get:
 *     summary: Obtém questões aleatórias
 *     tags: [Questões]
 *     parameters:
 *       - in: query
 *         name: quantidade
 *         schema:
 *           type: number
 *           maximum: 50
 *           default: 10
 *         description: Quantidade de questões (máximo 50)
 *       - in: query
 *         name: assunto_ids
 *         schema:
 *           type: array
 *           items: { type: string }
 *         description: Filtrar por assuntos
 *       - in: query
 *         name: dificuldade
 *         schema:
 *           type: string
 *           enum: [facil, media, dificil]
 *         description: Filtrar por dificuldade
 *     responses:
 *       200:
 *         description: Lista de questões aleatórias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Questao'
 */
router.get('/questoes/aleatorias', questaoController.findRandom);
/**
 * @swagger
 * /api/questoes/verificar-similaridade:
 *   post:
 *     summary: Verifica similaridade com questões existentes
 *     tags: [Questões]
 *     parameters:
 *       - in: query
 *         name: limiar
 *         schema:
 *           type: number
 *           default: 0.8
 *         description: Limiar de similaridade (0-1)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [enunciado]
 *             properties:
 *               enunciado:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/BlocoEnunciado'
 *     responses:
 *       200:
 *         description: Resultado da verificação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 similar: { type: boolean }
 *                 questoes_similares:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       questao_id: { type: string }
 *                       similaridade: { type: number }
 *                       tipo_match: { type: string }
 */
router.post('/questoes/verificar-similaridade', questaoController.verificarSimilaridade);
/**
 * @swagger
 * /api/questoes:
 *   post:
 *     summary: Cria uma nova questão
 *     tags: [Questões]
 *     parameters:
 *       - in: query
 *         name: verificarDuplicata
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Verificar duplicatas antes de criar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestaoInput'
 *     responses:
 *       201:
 *         description: Questão criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Questao'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Questão duplicada ou similar detectada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/questoes', questaoController.create);
/**
 * @swagger
 * /api/questoes:
 *   get:
 *     summary: Lista questões com paginação e filtros
 *     tags: [Questões]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *         description: Página atual
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *           maximum: 100
 *         description: Itens por página
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Campo para ordenação
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Direção da ordenação
 *       - in: query
 *         name: assunto_ids
 *         schema:
 *           type: array
 *           items: { type: string }
 *         description: Filtrar por assuntos
 *       - in: query
 *         name: topico_id
 *         schema:
 *           type: string
 *         description: Filtrar por tópico
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [multipla_escolha, discursiva, verdadeiro_falso]
 *         description: Filtrar por tipo
 *       - in: query
 *         name: dificuldade
 *         schema:
 *           type: string
 *           enum: [facil, media, dificil]
 *         description: Filtrar por dificuldade
 *       - in: query
 *         name: origem_tipo
 *         schema:
 *           type: string
 *           enum: [vestibular, enem, concurso, olimpiada, propria, outro]
 *         description: Filtrar por tipo de origem
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Busca textual no enunciado
 *     responses:
 *       200:
 *         description: Lista paginada de questões
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedQuestoes'
 */
router.get('/questoes', questaoController.find);
/**
 * @swagger
 * /api/questoes/{id}:
 *   get:
 *     summary: Obtém uma questão específica
 *     tags: [Questões]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da questão
 *     responses:
 *       200:
 *         description: Questão encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Questao'
 *       404:
 *         description: Questão não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/questoes/:id', questaoController.findOne);
/**
 * @swagger
 * /api/questoes/{id}:
 *   put:
 *     summary: Atualiza uma questão
 *     tags: [Questões]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da questão
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestaoInput'
 *     responses:
 *       200:
 *         description: Questão atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Questao'
 *       404:
 *         description: Questão não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/questoes/:id', questaoController.update);
/**
 * @swagger
 * /api/questoes/{id}:
 *   delete:
 *     summary: Desativa uma questão (soft delete)
 *     tags: [Questões]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da questão
 *     responses:
 *       200:
 *         description: Questão desativada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *       404:
 *         description: Questão não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/questoes/:id', questaoController.delete);
/**
 * @swagger
 * /api/questoes/{id}/permanente:
 *   delete:
 *     summary: Remove permanentemente uma questão (hard delete)
 *     tags: [Questões]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da questão
 *     responses:
 *       200:
 *         description: Questão removida permanentemente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *       404:
 *         description: Questão não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/questoes/:id/permanente', questaoController.hardDelete);
exports.default = router;

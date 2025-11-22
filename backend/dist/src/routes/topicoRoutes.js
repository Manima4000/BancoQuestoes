"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TopicoController_1 = require("../controllers/TopicoController");
const router = (0, express_1.Router)();
const topicoController = new TopicoController_1.TopicoController();
/**
 * @swagger
 * /api/topicos:
 *   post:
 *     summary: Cria um novo tópico
 *     tags: [Tópicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TopicoInput'
 *     responses:
 *       201:
 *         description: Tópico criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topico'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/topicos', topicoController.create);
/**
 * @swagger
 * /api/topicos:
 *   get:
 *     summary: Lista todos os tópicos
 *     tags: [Tópicos]
 *     responses:
 *       200:
 *         description: Lista de tópicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topico'
 */
router.get('/topicos', topicoController.find);
/**
 * @swagger
 * /api/topicos/assunto/{assuntoId}:
 *   get:
 *     summary: Lista tópicos de um assunto específico
 *     tags: [Tópicos]
 *     parameters:
 *       - in: path
 *         name: assuntoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do assunto
 *     responses:
 *       200:
 *         description: Lista de tópicos do assunto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topico'
 *       404:
 *         description: Assunto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/topicos/assunto/:assuntoId', topicoController.findByAssunto);
/**
 * @swagger
 * /api/topicos/{id}:
 *   get:
 *     summary: Obtém um tópico específico
 *     tags: [Tópicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do tópico
 *     responses:
 *       200:
 *         description: Tópico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topico'
 *       404:
 *         description: Tópico não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/topicos/:id', topicoController.findOne);
/**
 * @swagger
 * /api/topicos/{id}:
 *   put:
 *     summary: Atualiza um tópico
 *     tags: [Tópicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do tópico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TopicoInput'
 *     responses:
 *       200:
 *         description: Tópico atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topico'
 *       404:
 *         description: Tópico não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/topicos/:id', topicoController.update);
/**
 * @swagger
 * /api/topicos/{id}:
 *   delete:
 *     summary: Remove um tópico
 *     tags: [Tópicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do tópico
 *     responses:
 *       200:
 *         description: Tópico removido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *       404:
 *         description: Tópico não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/topicos/:id', topicoController.delete);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AssuntoController_1 = require("../controllers/AssuntoController");
const router = (0, express_1.Router)();
const assuntoController = new AssuntoController_1.AssuntoController();
/**
 * @swagger
 * /api/assuntos:
 *   post:
 *     summary: Cria um novo assunto
 *     tags: [Assuntos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssuntoInput'
 *     responses:
 *       201:
 *         description: Assunto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assunto'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/assuntos', assuntoController.create);
/**
 * @swagger
 * /api/assuntos:
 *   get:
 *     summary: Lista todos os assuntos
 *     tags: [Assuntos]
 *     responses:
 *       200:
 *         description: Lista de assuntos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assunto'
 */
router.get('/assuntos', assuntoController.find);
/**
 * @swagger
 * /api/assuntos/materia/{materiaId}:
 *   get:
 *     summary: Lista assuntos de uma matéria específica
 *     tags: [Assuntos]
 *     parameters:
 *       - in: path
 *         name: materiaId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da matéria
 *     responses:
 *       200:
 *         description: Lista de assuntos da matéria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assunto'
 *       404:
 *         description: Matéria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/assuntos/materia/:materiaId', assuntoController.findByMateria);
/**
 * @swagger
 * /api/assuntos/{id}:
 *   get:
 *     summary: Obtém um assunto específico
 *     tags: [Assuntos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do assunto
 *     responses:
 *       200:
 *         description: Assunto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assunto'
 *       404:
 *         description: Assunto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/assuntos/:id', assuntoController.findOne);
/**
 * @swagger
 * /api/assuntos/{id}:
 *   put:
 *     summary: Atualiza um assunto
 *     tags: [Assuntos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do assunto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssuntoInput'
 *     responses:
 *       200:
 *         description: Assunto atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assunto'
 *       404:
 *         description: Assunto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/assuntos/:id', assuntoController.update);
/**
 * @swagger
 * /api/assuntos/{id}:
 *   delete:
 *     summary: Remove um assunto
 *     tags: [Assuntos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do assunto
 *     responses:
 *       200:
 *         description: Assunto removido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *       404:
 *         description: Assunto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/assuntos/:id', assuntoController.delete);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ListaExerciciosController_1 = require("../controllers/ListaExerciciosController");
const router = (0, express_1.Router)();
const listaExerciciosController = new ListaExerciciosController_1.ListaExerciciosController();
/**
 * @swagger
 * /api/listas-exercicios:
 *   post:
 *     summary: Cria uma nova lista de exercícios
 *     tags: [Listas de Exercícios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListaExerciciosInput'
 *     responses:
 *       201:
 *         description: Lista criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListaExercicios'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/listas-exercicios', listaExerciciosController.create);
/**
 * @swagger
 * /api/listas-exercicios:
 *   get:
 *     summary: Lista todas as listas de exercícios
 *     tags: [Listas de Exercícios]
 *     responses:
 *       200:
 *         description: Lista de listas de exercícios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ListaExercicios'
 */
router.get('/listas-exercicios', listaExerciciosController.find);
/**
 * @swagger
 * /api/listas-exercicios/{id}:
 *   get:
 *     summary: Obtém uma lista de exercícios específica
 *     tags: [Listas de Exercícios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista
 *     responses:
 *       200:
 *         description: Lista encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListaExercicios'
 *       404:
 *         description: Lista não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/listas-exercicios/:id', listaExerciciosController.findOne);
/**
 * @swagger
 * /api/listas-exercicios/{id}:
 *   put:
 *     summary: Atualiza uma lista de exercícios
 *     tags: [Listas de Exercícios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListaExerciciosInput'
 *     responses:
 *       200:
 *         description: Lista atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListaExercicios'
 *       404:
 *         description: Lista não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/listas-exercicios/:id', listaExerciciosController.update);
/**
 * @swagger
 * /api/listas-exercicios/{id}:
 *   delete:
 *     summary: Remove uma lista de exercícios
 *     tags: [Listas de Exercícios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista
 *     responses:
 *       200:
 *         description: Lista removida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *       404:
 *         description: Lista não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/listas-exercicios/:id', listaExerciciosController.delete);
exports.default = router;

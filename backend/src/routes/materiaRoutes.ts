import { Router } from 'express';
import { MateriaController } from '../controllers/MateriaController';

const router = Router();
const materiaController = new MateriaController();

/**
 * @swagger
 * /api/materias:
 *   post:
 *     summary: Cria uma nova matéria
 *     tags: [Matérias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MateriaInput'
 *     responses:
 *       201:
 *         description: Matéria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Materia'
 *       400:
 *         description: Dados inválidos ou slug duplicado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/materias', materiaController.create);

/**
 * @swagger
 * /api/materias:
 *   get:
 *     summary: Lista todas as matérias
 *     tags: [Matérias]
 *     responses:
 *       200:
 *         description: Lista de matérias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Materia'
 */
router.get('/materias', materiaController.find);

/**
 * @swagger
 * /api/materias/{id}:
 *   get:
 *     summary: Obtém uma matéria específica
 *     tags: [Matérias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da matéria
 *     responses:
 *       200:
 *         description: Matéria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Materia'
 *       404:
 *         description: Matéria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/materias/:id', materiaController.findOne);

/**
 * @swagger
 * /api/materias/{id}:
 *   put:
 *     summary: Atualiza uma matéria
 *     tags: [Matérias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da matéria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MateriaInput'
 *     responses:
 *       200:
 *         description: Matéria atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Materia'
 *       404:
 *         description: Matéria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/materias/:id', materiaController.update);

/**
 * @swagger
 * /api/materias/{id}:
 *   delete:
 *     summary: Remove uma matéria
 *     tags: [Matérias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da matéria
 *     responses:
 *       200:
 *         description: Matéria removida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *       404:
 *         description: Matéria não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/materias/:id', materiaController.delete);

export default router;

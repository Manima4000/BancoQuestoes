import { Router } from 'express';
import { TextoBaseController } from '../controllers/TextoBaseController';

const router = Router();
const textoBaseController = new TextoBaseController();

/**
 * @swagger
 * /api/textos-base:
 *   post:
 *     summary: Cria um novo texto base
 *     tags: [Textos Base]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextoBaseInput'
 *     responses:
 *       201:
 *         description: Texto base criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TextoBase'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/textos-base', textoBaseController.create);

/**
 * @swagger
 * /api/textos-base:
 *   get:
 *     summary: Lista todos os textos base
 *     tags: [Textos Base]
 *     responses:
 *       200:
 *         description: Lista de textos base
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TextoBase'
 */
router.get('/textos-base', textoBaseController.find);

/**
 * @swagger
 * /api/textos-base/{id}:
 *   get:
 *     summary: Obtém um texto base específico
 *     tags: [Textos Base]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do texto base
 *     responses:
 *       200:
 *         description: Texto base encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TextoBase'
 *       404:
 *         description: Texto base não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/textos-base/:id', textoBaseController.findOne);

/**
 * @swagger
 * /api/textos-base/{id}:
 *   put:
 *     summary: Atualiza um texto base
 *     tags: [Textos Base]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do texto base
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TextoBaseInput'
 *     responses:
 *       200:
 *         description: Texto base atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TextoBase'
 *       404:
 *         description: Texto base não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/textos-base/:id', textoBaseController.update);

/**
 * @swagger
 * /api/textos-base/{id}:
 *   delete:
 *     summary: Remove um texto base
 *     tags: [Textos Base]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do texto base
 *     responses:
 *       200:
 *         description: Texto base removido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *       404:
 *         description: Texto base não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/textos-base/:id', textoBaseController.delete);

export default router;

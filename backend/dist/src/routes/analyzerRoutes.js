"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../config/upload");
const AnalyzerController_1 = require("../controllers/AnalyzerController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/analyzer/analyze:
 *   post:
 *     summary: Analisa um arquivo PDF e extrai questões usando IA
 *     tags: [Analyzer]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo PDF (máximo 20MB)
 *     responses:
 *       200:
 *         description: Análise concluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Análise concluída com sucesso."
 *                 total_questoes:
 *                   type: number
 *                   description: Total de questões extraídas
 *                 rascunho:
 *                   type: array
 *                   description: Array de questões extraídas do PDF
 *                   items:
 *                     type: object
 *                     properties:
 *                       numero:
 *                         type: number
 *                       enunciado:
 *                         type: string
 *                       alternativas:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             letra:
 *                               type: string
 *                               enum: [A, B, C, D, E]
 *                             texto:
 *                               type: string
 *                       gabarito:
 *                         type: string
 *                       tipo:
 *                         type: string
 *                         enum: [multipla_escolha, discursiva, verdadeiro_falso]
 *                       dificuldade:
 *                         type: string
 *                         enum: [facil, media, dificil]
 *       400:
 *         description: Arquivo não enviado ou formato inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Envie um arquivo PDF."
 *       500:
 *         description: Erro ao processar o documento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao processar o documento."
 *                 error:
 *                   type: string
 *                 details:
 *                   type: object
 */
router.post('/analyze', upload_1.uploadPdf.single('file'), AnalyzerController_1.analyzePdf);
exports.default = router;

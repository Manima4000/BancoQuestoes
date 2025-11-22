"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzePdf = void 0;
const fs_1 = __importDefault(require("fs"));
const MathpixService_1 = __importDefault(require("../services/MathpixService"));
const GeminiParserService_1 = __importDefault(require("../services/GeminiParserService"));
const analyzePdf = async (req, res) => {
    // 1. Validação Básica
    if (!req.file) {
        return res.status(400).json({ error: 'Envie um arquivo PDF.' });
    }
    try {
        console.log(`🚀 [Analyzer] Iniciando processamento do arquivo: ${req.file.originalname}`);
        console.log("1️⃣  Enviando para Mathpix...");
        const markdownResult = await MathpixService_1.default.convertPdfToMarkdown(req.file.path);
        console.log("2️⃣  Enviando para Gemini estruturar...");
        const questoesEstruturadas = await GeminiParserService_1.default.parseMarkdownToQuestions(markdownResult);
        if (fs_1.default.existsSync(req.file.path)) {
            fs_1.default.unlinkSync(req.file.path);
        }
        console.log(`✅ [Analyzer] Sucesso! ${questoesEstruturadas.length} questões identificadas.`);
        return res.json({
            message: 'Análise concluída com sucesso.',
            total_questoes: questoesEstruturadas.length,
            rascunho: questoesEstruturadas
        });
    }
    catch (error) {
        if (fs_1.default.existsSync(req.file.path)) {
            fs_1.default.unlinkSync(req.file.path);
        }
        console.error("❌ [Analyzer] Erro fatal:", error.message);
        return res.status(500).json({
            message: 'Erro ao processar o documento.',
            error: error.message,
            details: error.response?.data || "Sem detalhes externos"
        });
    }
};
exports.analyzePdf = analyzePdf;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const dotenv = __importStar(require("dotenv"));
// 1. Carrega o .env
const envPath = path_1.default.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });
const MathpixService_1 = __importDefault(require("../src/services/MathpixService"));
async function runTest() {
    console.log("🧪 INICIANDO TESTE DO MATHPIX SERVICE");
    if (!process.env.MATHPIX_APP_ID || !process.env.MATHPIX_APP_KEY) {
        console.error("❌ ERRO: Credenciais não carregadas.");
        return;
    }
    // Arquivo de entrada (seu PDF de teste)
    const pdfPath = path_1.default.resolve(__dirname, 'Semana08.pdf');
    if (!fs_1.default.existsSync(pdfPath)) {
        console.error(`❌ Arquivo de teste não encontrado: ${pdfPath}`);
        return;
    }
    try {
        console.log(`📄 Lendo arquivo: ${path_1.default.basename(pdfPath)}`);
        console.log("🚀 Enviando para Mathpix...");
        // 2. Recebe o Markdown (Texto)
        const markdown = await MathpixService_1.default.convertPdfToMarkdown(pdfPath);
        console.log("✅ Mathpix retornou com sucesso!");
        // 3. SALVA O ARQUIVO NO DISCO (AQUI ESTÁ A MÁGICA ✨)
        const outputPath = path_1.default.resolve(__dirname, '../resultado_mathpix.md');
        console.log(`💾 Salvando arquivo em: ${outputPath}...`);
        fs_1.default.writeFileSync(outputPath, markdown, 'utf-8');
        console.log("--------------------------------------------------");
        console.log("🎉 ARQUIVO SALVO COM SUCESSO!");
        console.log("👉 Abra o arquivo 'resultado_mathpix.md' na raiz do projeto para ver o conteúdo.");
        console.log("--------------------------------------------------");
    }
    catch (error) {
        console.error("\n❌ FALHA NO TESTE:", error.message);
    }
}
runTest();

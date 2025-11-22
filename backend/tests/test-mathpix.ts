import path from 'path';
import fs from 'fs';
import * as dotenv from 'dotenv';

// 1. Carrega o .env
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

import MathpixService from '../src/services/MathpixService';

async function runTest() {
    console.log("🧪 INICIANDO TESTE DO MATHPIX SERVICE");

    if (!process.env.MATHPIX_APP_ID || !process.env.MATHPIX_APP_KEY) {
        console.error("❌ ERRO: Credenciais não carregadas.");
        return;
    }

    // Arquivo de entrada (seu PDF de teste)
    const pdfPath = path.resolve(__dirname, 'Semana08.pdf');

    if (!fs.existsSync(pdfPath)) {
        console.error(`❌ Arquivo de teste não encontrado: ${pdfPath}`);
        return;
    }

    try {
        console.log(`📄 Lendo arquivo: ${path.basename(pdfPath)}`);
        console.log("🚀 Enviando para Mathpix...");

        // 2. Recebe o Markdown (Texto)
        const markdown = await MathpixService.convertPdfToMarkdown(pdfPath);

        console.log("✅ Mathpix retornou com sucesso!");

        // 3. SALVA O ARQUIVO NO DISCO (AQUI ESTÁ A MÁGICA ✨)
        const outputPath = path.resolve(__dirname, '../resultado_mathpix.md');
        
        console.log(`💾 Salvando arquivo em: ${outputPath}...`);
        fs.writeFileSync(outputPath, markdown, 'utf-8');

        console.log("--------------------------------------------------");
        console.log("🎉 ARQUIVO SALVO COM SUCESSO!");
        console.log("👉 Abra o arquivo 'resultado_mathpix.md' na raiz do projeto para ver o conteúdo.");
        console.log("--------------------------------------------------");

    } catch (error: any) {
        console.error("\n❌ FALHA NO TESTE:", error.message);
    }
}

runTest();
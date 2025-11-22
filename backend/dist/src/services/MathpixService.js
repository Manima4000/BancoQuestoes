"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/MathpixService.ts
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const form_data_1 = __importDefault(require("form-data"));
class MathpixService {
    // Helper privado para pegar as credenciais na hora da execução
    getCredentials() {
        const appId = process.env.MATHPIX_APP_ID;
        const appKey = process.env.MATHPIX_APP_KEY;
        if (!appId || !appKey) {
            throw new Error("Credenciais Mathpix (APP_ID ou APP_KEY) ausentes no arquivo .env");
        }
        return { appId, appKey };
    }
    /**
     * Converte um PDF local para Markdown usando a API da Mathpix.
     * Lógica baseada no script de teste de upload via FormData.
     */
    async convertPdfToMarkdown(filePath) {
        const { appId, appKey } = this.getCredentials();
        const url = "https://api.mathpix.com/v3/pdf";
        // 1. PREPARA O FORM-DATA
        // Exatamente igual ao teste que funcionou
        const form = new form_data_1.default();
        // Anexa o arquivo (Stream)
        form.append('file', fs_1.default.createReadStream(filePath));
        // Anexa as opções (JSON Stringificado - crucial!)
        const options = {
            conversion_formats: { md: true },
            math_inline_delimiters: ["$", "$"],
            rm_spaces: true
        };
        form.append('options_json', JSON.stringify(options));
        try {
            console.log("📤 [MathpixService] Iniciando Upload...");
            const formHeaders = form.getHeaders();
            const config = {
                headers: {
                    ...formHeaders, // Mistura os headers do form
                    'app_id': appId, // Com as credenciais
                    'app_key': appKey
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity
            };
            const resUpload = await axios_1.default.post(url, form, config);
            const pdfId = resUpload.data.pdf_id;
            console.log(`✅ [MathpixService] Upload OK! ID: ${pdfId}. Iniciando polling...`);
            let status = 'processing';
            let tentativas = 0;
            const maxTentativas = 120;
            while (status !== 'completed') {
                tentativas++;
                if (tentativas > maxTentativas)
                    throw new Error("Timeout: Mathpix demorou demais.");
                await new Promise(r => setTimeout(r, 2000)); // Espera 2s
                const resStatus = await axios_1.default.get(`${url}/${pdfId}`, {
                    headers: { 'app_id': appId, 'app_key': appKey }
                });
                status = resStatus.data.status;
                console.log(`⏳ [MathpixService] Status: ${status} (${tentativas}/${maxTentativas})`);
                if (status === 'error') {
                    throw new Error("Erro fatal na API da Mathpix durante o processamento.");
                }
            }
            console.log("📥 [MathpixService] Baixando Markdown final...");
            const resMmd = await axios_1.default.get(`${url}/${pdfId}.mmd`, {
                headers: { 'app_id': appId, 'app_key': appKey }
            });
            return resMmd.data;
        }
        catch (error) {
            console.error("❌ Erro no MathpixService:", error.message);
            if (error.response) {
                console.error("Detalhes da API:", JSON.stringify(error.response.data, null, 2));
            }
            throw error;
        }
    }
}
exports.default = new MathpixService();

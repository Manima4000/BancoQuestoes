"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
class UploadService {
    async salvarImagem(fileBuffer, originalName) {
        // Gera um nome único
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
        const uploadPath = path_1.default.resolve(__dirname, '..', '..', 'uploads', fileName);
        // 🛡️ O PROCESSO DE LIMPEZA (SANITIZAÇÃO)
        await (0, sharp_1.default)(fileBuffer)
            .toFormat('webp') // 1. Converte para WEBP 
            .webp({ quality: 80 }) // 2. Comprime um pouco para economizar espaço
            .rotate() // 3. Corrige orientação automaticamente mas sem manter EXIF
            .toFile(uploadPath); // 4. Salva o NOVO arquivo limpo
        // Retorna a URL pública
        const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
        return `${baseUrl}/uploads/${fileName}`;
    }
}
exports.default = new UploadService();

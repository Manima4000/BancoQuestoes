"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const UploadService_1 = __importDefault(require("../services/UploadService"));
const uploadImage = async (req, res) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }
    try {
        const fileUrl = await UploadService_1.default.salvarImagem(req.file.buffer, req.file.originalname);
        return res.status(201).json({
            message: 'Upload realizado com sucesso!',
            url: fileUrl
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao processar imagem.' });
    }
};
exports.uploadImage = uploadImage;

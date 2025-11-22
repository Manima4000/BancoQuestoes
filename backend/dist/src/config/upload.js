"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPdf = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
// ==========================================
// 1. CONFIGURAÇÃO PARA IMAGENS (Memória)
// ==========================================
const storageMemory = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
    storage: storageMemory,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Tipo de arquivo inválido. Apenas imagens são permitidas aqui.'));
        }
    }
});
// ==========================================
// 2. CONFIGURAÇÃO PARA PDFS (Disco)
// ==========================================
const storageDisk = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `temp-pdf-${uniqueSuffix}.pdf`);
    }
});
exports.uploadPdf = (0, multer_1.default)({
    storage: storageDisk,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB (PDFs podem ser maiores)
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        }
        else {
            cb(new Error('Tipo de arquivo inválido. Apenas PDF é permitido.'));
        }
    }
});

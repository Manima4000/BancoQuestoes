import multer from 'multer';
import path from 'path';
import { Request } from 'express';

// ==========================================
// 1. CONFIGURAÇÃO PARA IMAGENS (Memória)
// ==========================================
const storageMemory = multer.memoryStorage();

export const upload = multer({ 
    storage: storageMemory,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req: Request, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo inválido. Apenas imagens são permitidas aqui.'));
        }
    }
});

// ==========================================
// 2. CONFIGURAÇÃO PARA PDFS (Disco)
// ==========================================
const storageDisk = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `temp-pdf-${uniqueSuffix}.pdf`);
    }
});

export const uploadPdf = multer({
    storage: storageDisk,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20MB (PDFs podem ser maiores)
    fileFilter: (req: Request, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo inválido. Apenas PDF é permitido.'));
        }
    }
});
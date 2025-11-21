import sharp from 'sharp';
import path from 'path';

class UploadService {
    
    public async salvarImagem(fileBuffer: Buffer, originalName: string): Promise<string> {
        // Gera um nome único
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
        const uploadPath = path.resolve(__dirname, '..', '..', 'uploads', fileName);

        // 🛡️ O PROCESSO DE LIMPEZA (SANITIZAÇÃO)
        await sharp(fileBuffer)
            .toFormat('webp') // 1. Converte para WEBP 
            .webp({ quality: 80 }) // 2. Comprime um pouco para economizar espaço
            .rotate() // 3. Corrige orientação automaticamente mas sem manter EXIF
            .toFile(uploadPath); // 4. Salva o NOVO arquivo limpo

        // Retorna a URL pública
        const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
        return `${baseUrl}/uploads/${fileName}`;
    }
}

export default new UploadService();
import mongoose, { Schema } from 'mongoose';
import { IAlternativa } from '../interfaces/IAlternativa';

const AlternativaSchema: Schema = new Schema({
    tipo: { type: String, required: true , enum: ['texto', 'imagem'] },
    letra: { type: String, required: true },
    conteudo: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IAlternativa>('Alternativa', AlternativaSchema);
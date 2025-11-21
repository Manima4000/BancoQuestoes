import mongoose, { Schema } from 'mongoose';
import { IAlternativa } from '../interfaces/IAlternativa';

const AlternativaSchema: Schema = new Schema({
    texto: { type: String, required: true },
    letra: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IAlternativa>('Alternativa', AlternativaSchema);
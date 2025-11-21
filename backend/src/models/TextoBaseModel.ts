import mongoose, { Schema } from 'mongoose';
import { ITextoBase } from '../interfaces/ITextoBase';

const TextoBaseSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    conteudo: { type: String, required: true },
    fonte: { type: String }
}, { timestamps: true });

export default mongoose.model<ITextoBase>('TextoBase', TextoBaseSchema);
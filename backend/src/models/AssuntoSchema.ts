import mongoose, { Schema } from 'mongoose';
import { IAssunto } from '../interfaces/IAssunto';

const AssuntoSchema: Schema = new Schema({
    nome: { type: String, required: true },
    slug: { type: String, required: true },
    materia_id: { type: Schema.Types.ObjectId, ref: 'Materia', required: true },
    descricao: { type: String },
    ordem: { type: Number, default: 0 }
}, { timestamps: true });

AssuntoSchema.index({ materia_id: 1, slug: 1 }, { unique: true });

export default mongoose.model<IAssunto>('Assunto', AssuntoSchema);
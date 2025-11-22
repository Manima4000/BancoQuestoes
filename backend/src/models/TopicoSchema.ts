import mongoose, { Schema } from 'mongoose';
import { ITopico } from '../interfaces/ITopico';

const TopicoSchema: Schema = new Schema({
    nome: { type: String, required: true },
    slug: { type: String, required: true },
    assunto_id: { type: Schema.Types.ObjectId, ref: 'Assunto', required: true },
    descricao: { type: String },
    ordem: { type: Number, default: 0 }
}, { timestamps: true });

TopicoSchema.index({ assunto_id: 1, slug: 1 }, { unique: true });

export default mongoose.model<ITopico>('Topico', TopicoSchema);
import mongoose, { Schema } from 'mongoose';
import { IMateria } from '../interfaces/IMateria';

const MateriaSchema: Schema = new Schema({
    nome: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    cor: { type: String },
    icone: { type: String },
    ordem: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model<IMateria>('Materia', MateriaSchema);
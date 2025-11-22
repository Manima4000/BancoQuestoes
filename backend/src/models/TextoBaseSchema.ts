import mongoose, { Schema } from 'mongoose';
import { ITextoBase } from '../interfaces/ITextoBase';

const TextoBaseSchema: Schema = new Schema({
    titulo: { type: String },
    conteudo: { type: String, required: true },
    tipo: { 
        type: String, 
        required: true,
        enum: ['texto_literario', 'grafico', 'infografico', 'tabela', 'outro']
    },
    imagens: [{
        url: { type: String, required: true },
        legenda: { type: String },
        ordem: { type: Number, required: true },
        _id: false
    }],
    materia_id: { type: Schema.Types.ObjectId, ref: 'Materia' },
    metadata: { type: Schema.Types.Mixed }
}, { timestamps: true });

TextoBaseSchema.index({ materia_id: 1 });

export default mongoose.model<ITextoBase>('TextoBase', TextoBaseSchema);
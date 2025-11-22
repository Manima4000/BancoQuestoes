import mongoose, { Schema } from 'mongoose';
import { IOrigem } from '../interfaces/IOrigem';

const OrigemSchema = new Schema<IOrigem>(
    {
        tipo: {
            type: String,
            enum: ['vestibular', 'enem', 'concurso', 'olimpiada', 'livro', 'simulado', 'propria', 'outro'],
            required: [true, 'O tipo da origem é obrigatório'],
        },
        nome: {
            type: String,
            required: [true, 'O nome da origem é obrigatório'],
            trim: true,
        },
        ano: {
            type: Number,
            min: [1900, 'Ano deve ser maior que 1900'],
            max: [2100, 'Ano deve ser menor que 2100'],
        },
        informacoes_adicionais: {
            type: String,
            trim: true,
        },
        ativa: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Índices para busca eficiente
OrigemSchema.index({ tipo: 1 });
OrigemSchema.index({ nome: 'text' });
OrigemSchema.index({ ano: -1 });

export default mongoose.model<IOrigem>('Origem', OrigemSchema);

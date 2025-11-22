import mongoose, { Schema } from 'mongoose';
import { IListaAlternativas } from '../interfaces/IListaAlternativas';

const ListaAlternativasSchema: Schema = new Schema({
    alternativas: [{
        letra: { type: String, required: true },
        tipo: { 
            type: String, 
            required: true, 
            enum: ['texto', 'imagem'], 
            default: 'texto' 
        },
        conteudo: { type: String, required: true },
        _id: false
    }]
}, { timestamps: true });

export default mongoose.model<IListaAlternativas>('ListaAlternativas', ListaAlternativasSchema);
import mongoose, { Schema } from 'mongoose';
import { IListaAlternativas } from '../interfaces/IListaAlternativas';

const ListaAlternativasSchema: Schema = new Schema({
    alternativas: [{
        letra: { type: String, required: true }, // Ex: "A"
        texto: { type: String, required: true }, // Ex: "Zero"
        _id: false
    }]
}, { timestamps: true });

export default mongoose.model<IListaAlternativas>('ListaAlternativas', ListaAlternativasSchema);
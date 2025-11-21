import mongoose, { Schema } from 'mongoose';
import { IListaAlternativas } from '../interfaces/IListaAlternativas';

const ListaAlternativasSchema: Schema = new Schema({
    alternativas: [{
        letra: { type: String, required: true }, // Ex: "A"
        texto: { type: String, required: true }, // Ex: "Zero"
        _id: false // 👈 Importante: Não cria ID para cada item interno, pois já estão empacotados
    }]
}, { timestamps: true });

export default mongoose.model<IListaAlternativas>('ListaAlternativas', ListaAlternativasSchema);
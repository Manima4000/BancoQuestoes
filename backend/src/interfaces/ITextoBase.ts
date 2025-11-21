import { Document } from 'mongoose';

export interface ITextoBase extends Document {
    titulo: string;
    conteudo: string;
    fonte?: string; // Ex: "Machado de Assis - Dom Casmurro"
}
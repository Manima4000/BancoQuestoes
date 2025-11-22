import { Document } from 'mongoose';

export interface IMateria extends Document {
    nome: string;
    slug: string;
    cor?: string;
    icone?: string;
    ordem?: number;
}
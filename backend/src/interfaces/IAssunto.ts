import { Document, Types } from 'mongoose';

export interface IAssunto extends Document {
    nome: string;
    slug: string;
    materia_id: Types.ObjectId;
    descricao?: string;
    ordem?: number;
}
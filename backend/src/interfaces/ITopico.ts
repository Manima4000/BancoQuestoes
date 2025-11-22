import { Document, Types } from 'mongoose';

export interface ITopico extends Document {
    nome: string;
    slug: string;
    assunto_id: Types.ObjectId;
    descricao?: string;
    ordem?: number;
}
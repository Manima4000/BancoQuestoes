import { Document } from 'mongoose';

export interface IAlternativa extends Document {
    letra: string; 
    tipo: 'texto' | 'imagem';
    conteudo: string;
}
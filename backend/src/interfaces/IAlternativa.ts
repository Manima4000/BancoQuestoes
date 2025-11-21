import { Document } from 'mongoose';

export interface IAlternativa extends Document {
    texto: string; 
    letra: string; 
}
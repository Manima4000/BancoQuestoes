import { Document } from 'mongoose';
import { IAlternativa } from './IAlternativa';

export interface IListaAlternativas extends Document {
    questoes_associadas?: string; // Opcional: Apenas para controle se quiser saber de quem é essa lista
    alternativas: IAlternativa[];
}
import { Document, Types } from 'mongoose';

export interface IImagemTextoBase {
    url: string;
    legenda?: string;
    ordem: number;
}

export interface ITextoBase extends Document {
    titulo?: string;
    conteudo: string;
    tipo: 'texto_literario' | 'grafico' | 'infografico' | 'tabela' | 'outro';
    imagens?: IImagemTextoBase[];
    materia_id?: Types.ObjectId;
    metadata?: {
        autor?: string;
        obra?: string;
        ano?: number;
        [key: string]: any;
    };
}
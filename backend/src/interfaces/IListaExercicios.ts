import { Document, Types } from 'mongoose';

export interface IQuestaoLista {
    questao_id: Types.ObjectId;
    ordem: number;
    peso: number;
    obrigatoria: boolean;
}

export interface IListaExercicios extends Document {
    titulo: string;
    descricao?: string;
    materia_id: Types.ObjectId;
    assunto_ids?: Types.ObjectId[];
    topico_ids?: Types.ObjectId[];
    questoes: IQuestaoLista[];
    dificuldade_geral?: 'facil' | 'media' | 'dificil' | 'mista';
    tempo_estimado?: number;
    pontuacao_total: number;
    publica: boolean;
    criada_por: Types.ObjectId;
    turma_ids?: Types.ObjectId[];
}
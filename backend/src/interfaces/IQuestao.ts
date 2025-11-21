import mongoose, { Document } from 'mongoose';

export interface IQuestao extends Document {
    enunciado: IBlocoEnunciado[];
    materia: string;
    is_multiple_choice: boolean; 
    assuntos: string[];
    topicos: string[];
    gabarito: string; 
    dificuldade: 'Fácil' | 'Médio' | 'Difícil' | 'Muito Difícil';
    origem?: {
        tipo?: 'Vestibular' | 'Livro' | 'Simulado' | 'Outro'; 
        nome_fonte?: string; 
        ano?: number;
        detalhe?: string;
    };
    lista_alternativas_id?: mongoose.Types.ObjectId; 
    texto_base_id?: mongoose.Types.ObjectId;
    video_resolucao_id?: mongoose.Types.ObjectId;
}

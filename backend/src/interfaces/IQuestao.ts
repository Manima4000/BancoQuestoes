import mongoose, { Document } from 'mongoose';

export interface IQuestao extends Document {
    enunciado: string;
    materia: string;
    is_multiple_choice: boolean; 
    tipo: 'Exatas' | 'Humanas' | 'Biológicas';
    assuntos: string[];
    gabarito: string; 
    dificuldade: 'Fácil' | 'Médio' | 'Difícil';
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

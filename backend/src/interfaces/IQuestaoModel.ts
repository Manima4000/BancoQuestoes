import mongoose, { Document } from 'mongoose';

export interface IQuestao extends Document {
    enunciado: string;
    tipo: 'Exatas' | 'Humanas' | 'Biológicas';
    materia: 'Português' | 'Matemática' | 'História' | 'Geografia' | 'Biologia' | 'Química' | 'Física' | 'Literatura' | 'Inglês' | 'Filosofia' | 'Sociologia';
    assuntos: string[];
    gabarito: string;
    dificuldade: 'Fácil' | 'Médio' | 'Difícil';
    origem?: {
        tipo?: 'Vestibular' | 'Livro' | 'Simulado' | 'Outro'; 
        nome_fonte?: string; // Ex: "IME", "ITA", "Tópicos de Física"
        ano?: number;
        detalhe?: string; // Ex: "1ª Fase", "Capítulo 3", "Página 40"
    };
    alternativas?: { letra: string; texto: string; }[];
    texto_base_id?: mongoose.Types.ObjectId; 
    video_resolucao?: {
        plataforma: string;
        video_id: string;
        duracao_seg: number;
    };
}

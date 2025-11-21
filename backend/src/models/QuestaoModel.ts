import mongoose, { Schema } from 'mongoose';
import { IQuestao } from '../interfaces/IQuestaoModel';

const QuestaoSchema: Schema = new Schema({
    enunciado: { type: String, required: true },
    tipo: { type: String, required: true, enum: ['Exatas', 'Humanas', 'Biológicas'] },
    materia: { type: String, required: true, enum: ['Português', 'Matemática', 'História', 'Geografia', 'Biologia', 'Química', 'Física', 'Literatura', 'Inglês', 'Filosofia', 'Sociologia'] },
    assuntos: { type: [String], required: true },
    gabarito: { type: String, required: true },
    dificuldade: { type: String, required: true, enum: ['Fácil', 'Médio', 'Difícil'] },
    
    origem: {
        tipo: { type: String, enum: ['Vestibular', 'Livro', 'Simulado', 'Outro'] },
        nome_fonte: { type: String }, 
        ano: { type: Number },
        detalhe: { type: String } 
    },
    
    alternativas: [{
        letra: { type: String },
        texto: { type: String },
        _id: false
    }],

    texto_base_id: { type: Schema.Types.ObjectId, ref: 'TextoBase' }, 
    
    video_resolucao: {
        plataforma: { type: String },
        video_id: { type: String },
        duracao_seg: { type: Number },
    },
}, { 
    timestamps: true 
});

const Questao = mongoose.model<IQuestao>('Questao', QuestaoSchema);

export default Questao;
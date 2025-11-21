import mongoose, { Schema } from 'mongoose';
import { IQuestao } from '../interfaces/IQuestao';

const QuestaoSchema: Schema = new Schema({
    enunciado: { type: String, required: true },
    materia: { type: String, required: true },
    is_multiple_choice: { type: Boolean, required: true },
    tipo: { type: String, required: true },
    assuntos: { type: [String], required: true },
    gabarito: { type: String, required: true },
    dificuldade: { type: String, required: true },
    origem: {
        tipo: { type: String },
        nome_fonte: { type: String },
        ano: { type: Number },
        detalhe: { type: String }
    },
    lista_alternativas_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'ListaAlternativas',
        required: function() {
            return this.is_multiple_choice === true;
        }
    },
    texto_base_id: { type: Schema.Types.ObjectId, ref: 'TextoBase' },
    video_resolucao_id: { type: Schema.Types.ObjectId, ref: 'Video' }

}, { timestamps: true });

export default mongoose.model<IQuestao>('Questao', QuestaoSchema);
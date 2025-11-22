import mongoose, { Schema } from 'mongoose';
import { IListaExercicios } from '../interfaces/IListaExercicios';

const ListaExerciciosSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    materia_id: { type: Schema.Types.ObjectId, ref: 'Materia', required: true },
    assunto_ids: [{ type: Schema.Types.ObjectId, ref: 'Assunto' }],
    topico_ids: [{ type: Schema.Types.ObjectId, ref: 'Topico' }],
    questoes: [{
        questao_id: { type: Schema.Types.ObjectId, ref: 'Questao', required: true },
        ordem: { type: Number, required: true },
        peso: { type: Number, default: 1.0 },
        obrigatoria: { type: Boolean, default: true },
        _id: false
    }],
    dificuldade_geral: { 
        type: String,
        enum: ['facil', 'media', 'dificil', 'mista']
    },
    tempo_estimado: { type: Number },
    pontuacao_total: { type: Number, required: true },
    publica: { type: Boolean, default: false },
    criada_por: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    turma_ids: [{ type: Schema.Types.ObjectId, ref: 'Turma' }]
}, { timestamps: true });

ListaExerciciosSchema.index({ materia_id: 1 });
ListaExerciciosSchema.index({ criada_por: 1 });
ListaExerciciosSchema.index({ turma_ids: 1 });
ListaExerciciosSchema.index({ publica: 1 });

export default mongoose.model<IListaExercicios>('ListaExercicios', ListaExerciciosSchema);
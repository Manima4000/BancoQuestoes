import mongoose, { Schema } from 'mongoose';
import { IQuestao } from '../interfaces/IQuestao';

const QuestaoSchema: Schema = new Schema({
    // === CAMPOS DO PROFESSOR ===

    enunciado: [{
        tipo: { type: String, required: true, enum: ['texto', 'imagem'] },
        conteudo: { type: String, required: true },
        ordem: { type: Number, required: true },
        _id: false
    }],

    assunto_ids: [{
        type: Schema.Types.ObjectId,
        ref: 'Assunto',
        required: true
    }],

    topico_id: {
        type: Schema.Types.ObjectId,
        ref: 'Topico'
    },

    tipo: {
        type: String,
        required: true,
        enum: ['multipla_escolha', 'discursiva', 'verdadeiro_falso']
    },

    dificuldade: {
        type: String,
        required: true,
        enum: ['facil', 'media', 'dificil','muito_dificil']
    },

    texto_base_id: {
        type: Schema.Types.ObjectId,
        ref: 'TextoBase'
    },

    alternativas: [{
        letra: {
            type: String,
            required: true,
            enum: ['A', 'B', 'C', 'D', 'E']
        },
        conteudo: { type: String, required: true },
        correta: { type: Boolean, required: true },
        _id: false
    }],

    gabarito: { type: String, required: true },

    origem_id: {
        type: Schema.Types.ObjectId,
        ref: 'Origem'
    },

    // === CAMPOS DO SISTEMA ===

    conteudo_hash: { type: String, unique: true, sparse: true },
    texto_normalizado: { type: String },
    ativa: { type: Boolean, default: true }

}, { timestamps: { createdAt: 'criado_em', updatedAt: 'atualizado_em' } });

// === ÍNDICES ===

QuestaoSchema.index({ assunto_ids: 1 });
QuestaoSchema.index({ topico_id: 1 });
QuestaoSchema.index({ tipo: 1, dificuldade: 1 });
QuestaoSchema.index({ origem_id: 1 });
QuestaoSchema.index({ ativa: 1 });
QuestaoSchema.index({ criado_em: -1 });

// Índice de texto para busca
QuestaoSchema.index(
    { 'enunciado.conteudo': 'text', 'alternativas.conteudo': 'text' },
    { name: 'questao_text_search', default_language: 'portuguese' }
);

// === VALIDAÇÕES ===

QuestaoSchema.pre<IQuestao>('save', function(next) {
    const questao = this;

    // Validar enunciado não vazio
    if (!questao.enunciado || questao.enunciado.length === 0) {
        return next(new Error('A questão deve ter pelo menos um bloco de enunciado'));
    }

    // Validar pelo menos um assunto
    if (!questao.assunto_ids || questao.assunto_ids.length === 0) {
        return next(new Error('A questão deve ter pelo menos um assunto'));
    }

    switch (questao.tipo) {
        case 'multipla_escolha':
            if (!questao.alternativas || questao.alternativas.length < 2) {
                return next(new Error('Questões de múltipla escolha devem ter pelo menos 2 alternativas'));
            }
            if (questao.alternativas.length > 5) {
                return next(new Error('Questões de múltipla escolha podem ter no máximo 5 alternativas'));
            }
            const corretas = questao.alternativas.filter(a => a.correta);
            if (corretas.length !== 1) {
                return next(new Error('Questões de múltipla escolha devem ter exatamente 1 alternativa correta'));
            }
            // Gabarito deve ser uma letra
            if (!['A', 'B', 'C', 'D', 'E'].includes(questao.gabarito.toUpperCase())) {
                return next(new Error('Gabarito de múltipla escolha deve ser uma letra (A-E)'));
            }
            break;

        case 'verdadeiro_falso':
            if (!questao.alternativas || questao.alternativas.length !== 2) {
                return next(new Error('Questões de verdadeiro/falso devem ter exatamente 2 alternativas'));
            }
            break;

        case 'discursiva':
            if (questao.alternativas && questao.alternativas.length > 0) {
                return next(new Error('Questões discursivas não devem ter alternativas'));
            }
            if (!questao.gabarito || questao.gabarito.trim().length === 0) {
                return next(new Error('Questões discursivas devem ter um gabarito/resposta esperada'));
            }
            break;
    }

    next();
});

export default mongoose.model<IQuestao>('Questao', QuestaoSchema);

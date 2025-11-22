"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const QuestaoSchema = new mongoose_1.Schema({
    // === CAMPOS DO PROFESSOR ===
    enunciado: [{
            tipo: { type: String, required: true, enum: ['texto', 'imagem'] },
            conteudo: { type: String, required: true },
            ordem: { type: Number, required: true },
            _id: false
        }],
    assunto_ids: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Assunto',
            required: true
        }],
    topico_id: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        enum: ['facil', 'media', 'dificil']
    },
    texto_base_id: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    origem: {
        tipo: {
            type: String,
            required: true,
            enum: ['vestibular', 'enem', 'concurso', 'olimpiada', 'propria', 'outro']
        },
        nome: { type: String },
        ano: { type: Number },
        _id: false
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
QuestaoSchema.index({ 'origem.tipo': 1, 'origem.ano': 1 });
QuestaoSchema.index({ ativa: 1 });
QuestaoSchema.index({ criado_em: -1 });
// Índice de texto para busca
QuestaoSchema.index({ 'enunciado.conteudo': 'text', 'alternativas.conteudo': 'text' }, { name: 'questao_text_search', default_language: 'portuguese' });
// === VALIDAÇÕES ===
QuestaoSchema.pre('save', function (next) {
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
exports.default = mongoose_1.default.model('Questao', QuestaoSchema);

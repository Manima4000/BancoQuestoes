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
const ListaExerciciosSchema = new mongoose_1.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String },
    materia_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Materia', required: true },
    assunto_ids: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Assunto' }],
    topico_ids: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Topico' }],
    questoes: [{
            questao_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Questao', required: true },
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
    criada_por: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    turma_ids: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Turma' }]
}, { timestamps: true });
ListaExerciciosSchema.index({ materia_id: 1 });
ListaExerciciosSchema.index({ criada_por: 1 });
ListaExerciciosSchema.index({ turma_ids: 1 });
ListaExerciciosSchema.index({ publica: 1 });
exports.default = mongoose_1.default.model('ListaExercicios', ListaExerciciosSchema);

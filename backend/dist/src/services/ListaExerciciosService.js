"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaExerciciosService = void 0;
const ListaExerciciosSchema_1 = __importDefault(require("../models/ListaExerciciosSchema"));
class ListaExerciciosService {
    async create(data) {
        const listaExercicios = new ListaExerciciosSchema_1.default(data);
        return await listaExercicios.save();
    }
    async find() {
        return await ListaExerciciosSchema_1.default.find()
            .populate('materia_id')
            .populate('assunto_ids')
            .populate('topico_ids')
            .populate('questoes.questao_id')
            .populate('criada_por');
    }
    async findOne(id) {
        return await ListaExerciciosSchema_1.default.findById(id)
            .populate('materia_id')
            .populate('assunto_ids')
            .populate('topico_ids')
            .populate('questoes.questao_id')
            .populate('criada_por');
    }
    async update(id, data) {
        return await ListaExerciciosSchema_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return await ListaExerciciosSchema_1.default.findByIdAndDelete(id);
    }
}
exports.ListaExerciciosService = ListaExerciciosService;

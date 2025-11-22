"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssuntoService = void 0;
const AssuntoSchema_1 = __importDefault(require("../models/AssuntoSchema"));
class AssuntoService {
    async create(data) {
        const assunto = new AssuntoSchema_1.default(data);
        return await assunto.save();
    }
    async find() {
        return await AssuntoSchema_1.default.find().populate('materia_id');
    }
    async findOne(id) {
        return await AssuntoSchema_1.default.findById(id).populate('materia_id');
    }
    async update(id, data) {
        return await AssuntoSchema_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return await AssuntoSchema_1.default.findByIdAndDelete(id);
    }
    async findByMateria(materiaId) {
        return await AssuntoSchema_1.default.find({ materia_id: materiaId }).populate('materia_id');
    }
}
exports.AssuntoService = AssuntoService;

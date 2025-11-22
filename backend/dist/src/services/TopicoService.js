"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicoService = void 0;
const TopicoSchema_1 = __importDefault(require("../models/TopicoSchema"));
class TopicoService {
    async create(data) {
        const topico = new TopicoSchema_1.default(data);
        return await topico.save();
    }
    async find() {
        return await TopicoSchema_1.default.find().populate('assunto_id');
    }
    async findOne(id) {
        return await TopicoSchema_1.default.findById(id).populate('assunto_id');
    }
    async update(id, data) {
        return await TopicoSchema_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return await TopicoSchema_1.default.findByIdAndDelete(id);
    }
    async findByAssunto(assuntoId) {
        return await TopicoSchema_1.default.find({ assunto_id: assuntoId }).populate('assunto_id');
    }
}
exports.TopicoService = TopicoService;

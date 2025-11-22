"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextoBaseService = void 0;
const TextoBaseSchema_1 = __importDefault(require("../models/TextoBaseSchema"));
class TextoBaseService {
    async create(data) {
        const textoBase = new TextoBaseSchema_1.default(data);
        return await textoBase.save();
    }
    async find() {
        return await TextoBaseSchema_1.default.find().populate('materia_id');
    }
    async findOne(id) {
        return await TextoBaseSchema_1.default.findById(id).populate('materia_id');
    }
    async update(id, data) {
        return await TextoBaseSchema_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return await TextoBaseSchema_1.default.findByIdAndDelete(id);
    }
}
exports.TextoBaseService = TextoBaseService;

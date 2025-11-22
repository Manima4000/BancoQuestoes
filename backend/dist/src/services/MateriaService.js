"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MateriaService = void 0;
const MateriaSchema_1 = __importDefault(require("../models/MateriaSchema"));
class MateriaService {
    async create(data) {
        const materia = new MateriaSchema_1.default(data);
        return await materia.save();
    }
    async find() {
        return await MateriaSchema_1.default.find();
    }
    async findOne(id) {
        return await MateriaSchema_1.default.findById(id);
    }
    async update(id, data) {
        return await MateriaSchema_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async delete(id) {
        return await MateriaSchema_1.default.findByIdAndDelete(id);
    }
}
exports.MateriaService = MateriaService;

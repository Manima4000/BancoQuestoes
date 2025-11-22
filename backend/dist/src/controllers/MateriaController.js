"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MateriaController = void 0;
const MateriaService_1 = require("../services/MateriaService");
const materiaService = new MateriaService_1.MateriaService();
class MateriaController {
    async create(req, res) {
        try {
            const materia = await materiaService.create(req.body);
            res.status(201).json(materia);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async find(req, res) {
        try {
            const materias = await materiaService.find();
            res.status(200).json(materias);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async findOne(req, res) {
        try {
            const materia = await materiaService.findOne(req.params.id);
            if (!materia) {
                return res.status(404).json({ message: 'Materia not found' });
            }
            res.status(200).json(materia);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const materia = await materiaService.update(req.params.id, req.body);
            if (!materia) {
                return res.status(404).json({ message: 'Materia not found' });
            }
            res.status(200).json(materia);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const materia = await materiaService.delete(req.params.id);
            if (!materia) {
                return res.status(404).json({ message: 'Materia not found' });
            }
            res.status(200).json({ message: 'Materia deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.MateriaController = MateriaController;

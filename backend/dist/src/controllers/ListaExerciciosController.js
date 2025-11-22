"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaExerciciosController = void 0;
const ListaExerciciosService_1 = require("../services/ListaExerciciosService");
const listaExerciciosService = new ListaExerciciosService_1.ListaExerciciosService();
class ListaExerciciosController {
    async create(req, res) {
        try {
            const listaExercicios = await listaExerciciosService.create(req.body);
            res.status(201).json(listaExercicios);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async find(req, res) {
        try {
            const listaExercicios = await listaExerciciosService.find();
            res.status(200).json(listaExercicios);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async findOne(req, res) {
        try {
            const listaExercicios = await listaExerciciosService.findOne(req.params.id);
            if (!listaExercicios) {
                return res.status(404).json({ message: 'ListaExercicios not found' });
            }
            res.status(200).json(listaExercicios);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const listaExercicios = await listaExerciciosService.update(req.params.id, req.body);
            if (!listaExercicios) {
                return res.status(404).json({ message: 'ListaExercicios not found' });
            }
            res.status(200).json(listaExercicios);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const listaExercicios = await listaExerciciosService.delete(req.params.id);
            if (!listaExercicios) {
                return res.status(404).json({ message: 'ListaExercicios not found' });
            }
            res.status(200).json({ message: 'ListaExercicios deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.ListaExerciciosController = ListaExerciciosController;

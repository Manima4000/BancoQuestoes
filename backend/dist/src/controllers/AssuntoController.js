"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssuntoController = void 0;
const AssuntoService_1 = require("../services/AssuntoService");
const assuntoService = new AssuntoService_1.AssuntoService();
class AssuntoController {
    async create(req, res) {
        try {
            const assunto = await assuntoService.create(req.body);
            res.status(201).json(assunto);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async find(req, res) {
        try {
            const assuntos = await assuntoService.find();
            res.status(200).json(assuntos);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async findOne(req, res) {
        try {
            const assunto = await assuntoService.findOne(req.params.id);
            if (!assunto) {
                return res.status(404).json({ message: 'Assunto not found' });
            }
            res.status(200).json(assunto);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const assunto = await assuntoService.update(req.params.id, req.body);
            if (!assunto) {
                return res.status(404).json({ message: 'Assunto not found' });
            }
            res.status(200).json(assunto);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const assunto = await assuntoService.delete(req.params.id);
            if (!assunto) {
                return res.status(404).json({ message: 'Assunto not found' });
            }
            res.status(200).json({ message: 'Assunto deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async findByMateria(req, res) {
        try {
            const assuntos = await assuntoService.findByMateria(req.params.materiaId);
            res.status(200).json(assuntos);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.AssuntoController = AssuntoController;

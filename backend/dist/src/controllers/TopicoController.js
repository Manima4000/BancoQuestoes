"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicoController = void 0;
const TopicoService_1 = require("../services/TopicoService");
const topicoService = new TopicoService_1.TopicoService();
class TopicoController {
    async create(req, res) {
        try {
            const topico = await topicoService.create(req.body);
            res.status(201).json(topico);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async find(req, res) {
        try {
            const topicos = await topicoService.find();
            res.status(200).json(topicos);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async findOne(req, res) {
        try {
            const topico = await topicoService.findOne(req.params.id);
            if (!topico) {
                return res.status(404).json({ message: 'Topico not found' });
            }
            res.status(200).json(topico);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const topico = await topicoService.update(req.params.id, req.body);
            if (!topico) {
                return res.status(404).json({ message: 'Topico not found' });
            }
            res.status(200).json(topico);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const topico = await topicoService.delete(req.params.id);
            if (!topico) {
                return res.status(404).json({ message: 'Topico not found' });
            }
            res.status(200).json({ message: 'Topico deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async findByAssunto(req, res) {
        try {
            const topicos = await topicoService.findByAssunto(req.params.assuntoId);
            res.status(200).json(topicos);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.TopicoController = TopicoController;

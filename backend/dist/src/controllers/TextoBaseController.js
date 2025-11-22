"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextoBaseController = void 0;
const TextoBaseService_1 = require("../services/TextoBaseService");
const textoBaseService = new TextoBaseService_1.TextoBaseService();
class TextoBaseController {
    async create(req, res) {
        try {
            const textoBase = await textoBaseService.create(req.body);
            res.status(201).json(textoBase);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async find(req, res) {
        try {
            const textoBases = await textoBaseService.find();
            res.status(200).json(textoBases);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async findOne(req, res) {
        try {
            const textoBase = await textoBaseService.findOne(req.params.id);
            if (!textoBase) {
                return res.status(404).json({ message: 'TextoBase not found' });
            }
            res.status(200).json(textoBase);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async update(req, res) {
        try {
            const textoBase = await textoBaseService.update(req.params.id, req.body);
            if (!textoBase) {
                return res.status(404).json({ message: 'TextoBase not found' });
            }
            res.status(200).json(textoBase);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async delete(req, res) {
        try {
            const textoBase = await textoBaseService.delete(req.params.id);
            if (!textoBase) {
                return res.status(404).json({ message: 'TextoBase not found' });
            }
            res.status(200).json({ message: 'TextoBase deleted successfully' });
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
exports.TextoBaseController = TextoBaseController;

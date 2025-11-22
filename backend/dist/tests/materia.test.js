"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
const MateriaSchema_1 = __importDefault(require("../src/models/MateriaSchema"));
describe('Materia API', () => {
    it('should create a new materia', async () => {
        const res = await (0, supertest_1.default)(server_1.default)
            .post('/api/materias')
            .send({
            nome: 'Matemática',
            slug: 'matematica',
            cor: '#FF0000',
            icone: 'calculator'
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.nome).toBe('Matemática');
    });
    it('should get all materias', async () => {
        const materia = new MateriaSchema_1.default({
            nome: 'Física',
            slug: 'fisica',
        });
        await materia.save();
        const res = await (0, supertest_1.default)(server_1.default).get('/api/materias');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
    it('should get a single materia by id', async () => {
        const materia = new MateriaSchema_1.default({
            nome: 'Química',
            slug: 'quimica',
        });
        await materia.save();
        const res = await (0, supertest_1.default)(server_1.default).get(`/api/materias/${materia._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.nome).toBe('Química');
    });
    it('should update a materia', async () => {
        const materia = new MateriaSchema_1.default({
            nome: 'Biologia',
            slug: 'biologia',
        });
        await materia.save();
        const res = await (0, supertest_1.default)(server_1.default)
            .put(`/api/materias/${materia._id}`)
            .send({
            nome: 'Biologia Celular',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body.nome).toBe('Biologia Celular');
    });
    it('should delete a materia', async () => {
        const materia = new MateriaSchema_1.default({
            nome: 'História',
            slug: 'historia',
        });
        await materia.save();
        const res = await (0, supertest_1.default)(server_1.default).delete(`/api/materias/${materia._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Materia deleted successfully');
    });
});

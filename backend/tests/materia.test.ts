import request from 'supertest';
import app from '../src/server';
import Materia from '../src/models/MateriaSchema';

describe('Materia API', () => {
    it('should create a new materia', async () => {
        const res = await request(app)
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
        const materia = new Materia({
            nome: 'Física',
            slug: 'fisica',
        });
        await materia.save();

        const res = await request(app).get('/api/materias');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a single materia by id', async () => {
        const materia = new Materia({
            nome: 'Química',
            slug: 'quimica',
        });
        await materia.save();

        const res = await request(app).get(`/api/materias/${materia._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.nome).toBe('Química');
    });

    it('should update a materia', async () => {
        const materia = new Materia({
            nome: 'Biologia',
            slug: 'biologia',
        });
        await materia.save();

        const res = await request(app)
            .put(`/api/materias/${materia._id}`)
            .send({
                nome: 'Biologia Celular',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.nome).toBe('Biologia Celular');
    });

    it('should delete a materia', async () => {
        const materia = new Materia({
            nome: 'História',
            slug: 'historia',
        });
        await materia.save();

        const res = await request(app).delete(`/api/materias/${materia._id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toBe('Materia deleted successfully');
    });
});

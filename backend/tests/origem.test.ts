import request from 'supertest';
import app from '../src/server';
import Origem from '../src/models/OrigemSchema';
import Questao from '../src/models/QuestaoSchema';
import Materia from '../src/models/MateriaSchema';
import Assunto from '../src/models/AssuntoSchema';
import { OrigemService } from '../src/services/OrigemService';

const origemService = new OrigemService();

describe('Origem API', () => {
    describe('POST /api/origens', () => {
        it('should create a new origem', async () => {
            const res = await request(app)
                .post('/api/origens')
                .send({
                    tipo: 'vestibular',
                    nome: 'FUVEST',
                    ano: 2023,
                    informacoes_adicionais: '1ª Fase'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body.tipo).toBe('vestibular');
            expect(res.body.nome).toBe('FUVEST');
            expect(res.body.ano).toBe(2023);
        });

        it('should reject origem without required fields', async () => {
            const res = await request(app)
                .post('/api/origens')
                .send({
                    ano: 2023
                });

            expect(res.statusCode).toEqual(400);
        });
    });

    describe('GET /api/origens', () => {
        it('should get all origens', async () => {
            await Origem.create({
                tipo: 'enem',
                nome: 'ENEM',
                ano: 2023
            });

            const res = await request(app).get('/api/origens');

            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThan(0);
        });

        it('should filter by tipo', async () => {
            await Origem.create({ tipo: 'livro', nome: 'Halliday' });
            await Origem.create({ tipo: 'vestibular', nome: 'UNICAMP' });

            const res = await request(app).get('/api/origens?tipo=livro');

            expect(res.statusCode).toEqual(200);
            expect(res.body.every((o: any) => o.tipo === 'livro')).toBe(true);
        });

        it('should filter by ano', async () => {
            await Origem.create({ tipo: 'vestibular', nome: 'FUVEST 2022', ano: 2022 });
            await Origem.create({ tipo: 'vestibular', nome: 'FUVEST 2023', ano: 2023 });

            const res = await request(app).get('/api/origens?ano=2023');

            expect(res.statusCode).toEqual(200);
            expect(res.body.every((o: any) => o.ano === 2023)).toBe(true);
        });
    });

    describe('GET /api/origens/:id', () => {
        it('should get a single origem by id', async () => {
            const origem = await Origem.create({
                tipo: 'concurso',
                nome: 'Concurso Público',
                ano: 2023
            });

            const res = await request(app).get(`/api/origens/${origem._id}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.nome).toBe('Concurso Público');
        });

        it('should return 404 for non-existent origem', async () => {
            const res = await request(app).get('/api/origens/000000000000000000000000');

            expect(res.statusCode).toEqual(404);
        });
    });

    describe('GET /api/origens/tipo/:tipo', () => {
        it('should get origens by tipo', async () => {
            await Origem.create({ tipo: 'olimpiada', nome: 'OBF' });
            await Origem.create({ tipo: 'olimpiada', nome: 'OBM' });

            const res = await request(app).get('/api/origens/tipo/olimpiada');

            expect(res.statusCode).toEqual(200);
            expect(res.body.length).toBeGreaterThanOrEqual(2);
            expect(res.body.every((o: any) => o.tipo === 'olimpiada')).toBe(true);
        });
    });

    describe('PUT /api/origens/:id', () => {
        it('should update an origem', async () => {
            const origem = await Origem.create({
                tipo: 'simulado',
                nome: 'Simulado 1',
            });

            const res = await request(app)
                .put(`/api/origens/${origem._id}`)
                .send({
                    nome: 'Simulado Atualizado',
                    informacoes_adicionais: 'Versão 2'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body.nome).toBe('Simulado Atualizado');
            expect(res.body.informacoes_adicionais).toBe('Versão 2');
        });
    });

    describe('DELETE /api/origens/:id', () => {
        it('should soft delete an origem', async () => {
            const origem = await Origem.create({
                tipo: 'propria',
                nome: 'Para deletar',
            });

            const res = await request(app).delete(`/api/origens/${origem._id}`);

            expect(res.statusCode).toEqual(200);

            // Verificar que foi desativada
            const found = await Origem.findById(origem._id);
            expect(found?.ativa).toBe(false);
        });

        it('should remove reference from questoes on delete', async () => {
            // Criar matéria e assunto
            const materia = await Materia.create({
                nome: 'Física',
                slug: `fisica-${Date.now()}`,
            });

            const assunto = await Assunto.create({
                nome: 'Mecânica',
                slug: `mecanica-${Date.now()}`,
                materia_id: materia._id,
            });

            // Criar origem
            const origem = await Origem.create({
                tipo: 'vestibular',
                nome: 'Para remover',
            });

            // Criar questão vinculada à origem
            const questao = await Questao.create({
                enunciado: [{ tipo: 'texto', conteudo: 'Teste', ordem: 1 }],
                assunto_ids: [assunto._id],
                tipo: 'discursiva',
                dificuldade: 'media',
                gabarito: 'Resposta',
                origem_id: origem._id,
            });

            // Deletar origem
            await request(app).delete(`/api/origens/${origem._id}`);

            // Verificar que a questão não tem mais referência à origem
            const questaoAtualizada = await Questao.findById(questao._id);
            expect(questaoAtualizada?.origem_id).toBeUndefined();
        });
    });

    describe('DELETE /api/origens/:id/permanente', () => {
        it('should hard delete an origem', async () => {
            const origem = await Origem.create({
                tipo: 'outro',
                nome: 'Para deletar permanentemente',
            });

            const res = await request(app).delete(`/api/origens/${origem._id}/permanente`);

            expect(res.statusCode).toEqual(200);

            // Verificar que foi removida
            const found = await Origem.findById(origem._id);
            expect(found).toBeNull();
        });
    });

    describe('GET /api/origens/:id/questoes/count', () => {
        it('should count questoes linked to origem', async () => {
            // Criar dados base
            const materia = await Materia.create({
                nome: 'Química',
                slug: `quimica-${Date.now()}`,
            });

            const assunto = await Assunto.create({
                nome: 'Orgânica',
                slug: `organica-${Date.now()}`,
                materia_id: materia._id,
            });

            const origem = await Origem.create({
                tipo: 'enem',
                nome: 'ENEM 2023',
                ano: 2023,
            });

            // Criar questões vinculadas
            await Questao.create({
                enunciado: [{ tipo: 'texto', conteudo: 'Q1', ordem: 1 }],
                assunto_ids: [assunto._id],
                tipo: 'discursiva',
                dificuldade: 'media',
                gabarito: 'R1',
                origem_id: origem._id,
            });

            await Questao.create({
                enunciado: [{ tipo: 'texto', conteudo: 'Q2', ordem: 1 }],
                assunto_ids: [assunto._id],
                tipo: 'discursiva',
                dificuldade: 'facil',
                gabarito: 'R2',
                origem_id: origem._id,
            });

            const res = await request(app).get(`/api/origens/${origem._id}/questoes/count`);

            expect(res.statusCode).toEqual(200);
            expect(res.body.count).toBe(2);
        });
    });

    describe('GET /api/origens/estatisticas', () => {
        it('should return estatisticas', async () => {
            await Origem.create({ tipo: 'vestibular', nome: 'V1' });
            await Origem.create({ tipo: 'vestibular', nome: 'V2' });
            await Origem.create({ tipo: 'livro', nome: 'L1' });

            const res = await request(app).get('/api/origens/estatisticas');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('total');
            expect(res.body).toHaveProperty('porTipo');
        });
    });
});

describe('OrigemService', () => {
    describe('CRUD', () => {
        it('should create origem', async () => {
            const origem = await origemService.create({
                tipo: 'vestibular',
                nome: 'UNICAMP',
                ano: 2024
            });

            expect(origem).toBeDefined();
            expect(origem.nome).toBe('UNICAMP');
        });

        it('should find origens by tipo', async () => {
            await origemService.create({ tipo: 'livro', nome: 'Tipler' });
            await origemService.create({ tipo: 'livro', nome: 'Sears' });

            const origens = await origemService.findByTipo('livro');

            expect(origens.length).toBeGreaterThanOrEqual(2);
        });

        it('should update origem', async () => {
            const origem = await origemService.create({
                tipo: 'simulado',
                nome: 'Sim 1'
            });

            const updated = await origemService.update(origem._id.toString(), {
                nome: 'Simulado Completo'
            });

            expect(updated?.nome).toBe('Simulado Completo');
        });
    });
});

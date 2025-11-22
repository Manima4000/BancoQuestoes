import { QuestaoService } from '../src/services/QuestaoService';
import Assunto from '../src/models/AssuntoSchema';
import Materia from '../src/models/MateriaSchema';
import Origem from '../src/models/OrigemSchema';
import { IQuestaoInput } from '../src/interfaces/IQuestao';

const questaoService = new QuestaoService();

// Helper para criar dados base
const criarDadosBase = async () => {
    const materia = await Materia.create({
        nome: 'Matemática',
        slug: `matematica-${Date.now()}`,
    });

    const assunto = await Assunto.create({
        nome: 'Álgebra',
        slug: `algebra-${Date.now()}`,
        materia_id: materia._id,
    });

    const origem = await Origem.create({
        tipo: 'propria',
        nome: 'Questão própria',
    });

    return {
        materiaId: materia._id.toString(),
        assuntoId: assunto._id.toString(),
        origemId: origem._id.toString()
    };
};

// Helper para criar questão base
const criarQuestaoBase = (assuntoId: string, origemId?: string, overrides = {}): IQuestaoInput => ({
    enunciado: [
        { tipo: 'texto', conteudo: 'Qual é a capital do Brasil?', ordem: 1 }
    ],
    assunto_ids: [assuntoId],
    tipo: 'multipla_escolha',
    dificuldade: 'media',
    alternativas: [
        { letra: 'A', conteudo: 'São Paulo', correta: false },
        { letra: 'B', conteudo: 'Rio de Janeiro', correta: false },
        { letra: 'C', conteudo: 'Brasília', correta: true },
        { letra: 'D', conteudo: 'Salvador', correta: false },
    ],
    gabarito: 'C',
    origem_id: origemId,
    ...overrides,
});

describe('QuestaoService', () => {

    describe('Validação por Tipo', () => {
        test('Múltipla escolha: deve rejeitar sem alternativas', async () => {
            const { assuntoId, origemId } = await criarDadosBase();
            const questao = criarQuestaoBase(assuntoId, origemId, { alternativas: [] });

            await expect(questaoService.create(questao, false))
                .rejects.toThrow('pelo menos 2 alternativas');
        });

        test('Múltipla escolha: deve aceitar questão válida', async () => {
            const { assuntoId, origemId } = await criarDadosBase();
            const questao = criarQuestaoBase(assuntoId, origemId);

            const result = await questaoService.create(questao, false);
            expect(result).toBeDefined();
            expect(result.tipo).toBe('multipla_escolha');
        });

        test('Múltipla escolha: deve rejeitar sem alternativa correta', async () => {
            const { assuntoId, origemId } = await criarDadosBase();
            const questao = criarQuestaoBase(assuntoId, origemId, {
                alternativas: [
                    { letra: 'A', conteudo: 'A', correta: false },
                    { letra: 'B', conteudo: 'B', correta: false },
                ],
            });

            await expect(questaoService.create(questao, false))
                .rejects.toThrow('exatamente 1 alternativa correta');
        });

        test('Verdadeiro/Falso: deve aceitar com 2 alternativas', async () => {
            const { assuntoId, origemId } = await criarDadosBase();
            const questao = criarQuestaoBase(assuntoId, origemId, {
                tipo: 'verdadeiro_falso',
                enunciado: [{ tipo: 'texto', conteudo: 'O Brasil é grande?', ordem: 1 }],
                alternativas: [
                    { letra: 'A', conteudo: 'Verdadeiro', correta: true },
                    { letra: 'B', conteudo: 'Falso', correta: false },
                ],
                gabarito: 'A',
            });

            const result = await questaoService.create(questao, false);
            expect(result.tipo).toBe('verdadeiro_falso');
        });

        test('Discursiva: deve aceitar sem alternativas', async () => {
            const { assuntoId, origemId } = await criarDadosBase();
            const questao = criarQuestaoBase(assuntoId, origemId, {
                tipo: 'discursiva',
                enunciado: [{ tipo: 'texto', conteudo: 'Explique a fotossíntese.', ordem: 1 }],
                alternativas: undefined,
                gabarito: 'Processo pelo qual plantas convertem luz em energia.',
            });

            const result = await questaoService.create(questao, false);
            expect(result.tipo).toBe('discursiva');
        });

        test('Discursiva: deve rejeitar com alternativas', async () => {
            const { assuntoId, origemId } = await criarDadosBase();
            const questao = criarQuestaoBase(assuntoId, origemId, {
                tipo: 'discursiva',
                gabarito: 'Resposta',
            });

            await expect(questaoService.create(questao, false))
                .rejects.toThrow('não devem ter alternativas');
        });
    });

    describe('Detecção de Duplicatas', () => {
        test('Deve detectar questão idêntica', async () => {
            const { assuntoId, origemId } = await criarDadosBase();

            const questao1 = criarQuestaoBase(assuntoId, origemId, {
                enunciado: [{ tipo: 'texto', conteudo: 'Questão única para teste', ordem: 1 }],
            });

            await questaoService.create(questao1, false);

            const questao2 = criarQuestaoBase(assuntoId, origemId, {
                enunciado: [{ tipo: 'texto', conteudo: 'Questão única para teste', ordem: 1 }],
            });

            await expect(questaoService.create(questao2, true))
                .rejects.toThrow(/similar/i);
        });

        test('Deve permitir questões diferentes', async () => {
            const { assuntoId, origemId } = await criarDadosBase();

            const questao1 = criarQuestaoBase(assuntoId, origemId, {
                enunciado: [{ tipo: 'texto', conteudo: 'Primeira questão diferente', ordem: 1 }],
            });

            const questao2 = criarQuestaoBase(assuntoId, origemId, {
                enunciado: [{ tipo: 'texto', conteudo: 'Segunda questão totalmente distinta', ordem: 1 }],
            });

            const r1 = await questaoService.create(questao1, false);
            const r2 = await questaoService.create(questao2, true);

            expect(r1._id).not.toEqual(r2._id);
        });

        test('Deve verificar similaridade', async () => {
            const { assuntoId, origemId } = await criarDadosBase();

            const questao1 = criarQuestaoBase(assuntoId, origemId, {
                enunciado: [{ tipo: 'texto', conteudo: 'Qual é a fórmula da água?', ordem: 1 }],
            });

            await questaoService.create(questao1, false);

            const questao2 = criarQuestaoBase(assuntoId, origemId, {
                enunciado: [{ tipo: 'texto', conteudo: 'Qual é a fórmula da água?', ordem: 1 }],
            });

            const similares = await questaoService.verificarSimilaridade(questao2, 80);
            expect(similares.length).toBeGreaterThan(0);
            expect(similares[0].similaridade).toBe(100);
        });
    });

    describe('Paginação', () => {
        test('Deve retornar resultados paginados', async () => {
            const { assuntoId, origemId } = await criarDadosBase();

            // Criar 15 questões
            for (let i = 1; i <= 15; i++) {
                await questaoService.create(criarQuestaoBase(assuntoId, origemId, {
                    enunciado: [{ tipo: 'texto', conteudo: `Questão número ${i}`, ordem: 1 }],
                }), false);
            }

            const result = await questaoService.find({}, { page: 1, limit: 10 });

            expect(result.data.length).toBe(10);
            expect(result.pagination.total).toBe(15);
            expect(result.pagination.hasNext).toBe(true);
        });

        test('Deve filtrar por dificuldade', async () => {
            const { assuntoId, origemId } = await criarDadosBase();

            await questaoService.create(criarQuestaoBase(assuntoId, origemId, {
                enunciado: [{ tipo: 'texto', conteudo: 'Questão fácil', ordem: 1 }],
                dificuldade: 'facil',
            }), false);

            await questaoService.create(criarQuestaoBase(assuntoId, origemId, {
                enunciado: [{ tipo: 'texto', conteudo: 'Questão difícil', ordem: 1 }],
                dificuldade: 'dificil',
            }), false);

            const result = await questaoService.find({ dificuldade: 'facil' }, {});

            expect(result.data.length).toBe(1);
            expect(result.data[0].dificuldade).toBe('facil');
        });

        test('Deve filtrar por origem_id', async () => {
            const { assuntoId, origemId } = await criarDadosBase();

            // Criar outra origem
            const outraOrigem = await Origem.create({
                tipo: 'vestibular',
                nome: 'FUVEST',
                ano: 2023,
            });

            await questaoService.create(criarQuestaoBase(assuntoId, origemId, {
                enunciado: [{ tipo: 'texto', conteudo: 'Questão própria', ordem: 1 }],
            }), false);

            await questaoService.create(criarQuestaoBase(assuntoId, outraOrigem._id.toString(), {
                enunciado: [{ tipo: 'texto', conteudo: 'Questão FUVEST', ordem: 1 }],
            }), false);

            const result = await questaoService.find({ origem_id: outraOrigem._id.toString() }, {});

            expect(result.data.length).toBe(1);
        });
    });

    describe('CRUD', () => {
        test('Deve criar e buscar questão', async () => {
            const { assuntoId, origemId } = await criarDadosBase();

            const questao = await questaoService.create(criarQuestaoBase(assuntoId, origemId), false);
            const encontrada = await questaoService.findOne(questao._id.toString());

            expect(encontrada).toBeDefined();
            expect(encontrada?._id.toString()).toBe(questao._id.toString());
        });

        test('Deve criar questão sem origem (opcional)', async () => {
            const { assuntoId } = await criarDadosBase();

            const questao = await questaoService.create(criarQuestaoBase(assuntoId, undefined, {
                enunciado: [{ tipo: 'texto', conteudo: 'Questão sem origem', ordem: 1 }],
            }), false);

            expect(questao).toBeDefined();
            expect(questao.origem_id).toBeUndefined();
        });

        test('Deve atualizar questão', async () => {
            const { assuntoId, origemId } = await criarDadosBase();

            const questao = await questaoService.create(criarQuestaoBase(assuntoId, origemId), false);

            const atualizada = await questaoService.update(questao._id.toString(), {
                dificuldade: 'dificil',
            });

            expect(atualizada?.dificuldade).toBe('dificil');
        });

        test('Deve desativar questão (soft delete)', async () => {
            const { assuntoId, origemId } = await criarDadosBase();

            const questao = await questaoService.create(criarQuestaoBase(assuntoId, origemId), false);
            await questaoService.delete(questao._id.toString());

            const encontrada = await questaoService.findOne(questao._id.toString());
            expect(encontrada).toBeNull();
        });
    });

    describe('Auxiliares', () => {
        test('Deve contar questões', async () => {
            const { assuntoId, origemId } = await criarDadosBase();

            await questaoService.create(criarQuestaoBase(assuntoId, origemId, {
                enunciado: [{ tipo: 'texto', conteudo: 'Q1', ordem: 1 }],
            }), false);

            await questaoService.create(criarQuestaoBase(assuntoId, origemId, {
                enunciado: [{ tipo: 'texto', conteudo: 'Q2', ordem: 1 }],
            }), false);

            const count = await questaoService.count({});
            expect(count).toBe(2);
        });

        test('Deve retornar estatísticas', async () => {
            const { assuntoId, origemId } = await criarDadosBase();

            await questaoService.create(criarQuestaoBase(assuntoId, origemId), false);

            const stats = await questaoService.getEstatisticas();

            expect(stats.total).toBeGreaterThan(0);
            expect(stats.porTipo).toBeDefined();
            expect(stats.porDificuldade).toBeDefined();
        });

        test('Deve retornar questões aleatórias', async () => {
            const { assuntoId, origemId } = await criarDadosBase();

            for (let i = 1; i <= 5; i++) {
                await questaoService.create(criarQuestaoBase(assuntoId, origemId, {
                    enunciado: [{ tipo: 'texto', conteudo: `Random ${i}`, ordem: 1 }],
                }), false);
            }

            const aleatorias = await questaoService.findRandom({}, 3);
            expect(aleatorias.length).toBe(3);
        });
    });
});

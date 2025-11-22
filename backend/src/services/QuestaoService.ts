import crypto from 'crypto';
import Questao from '../models/QuestaoSchema';
import {
    IQuestao,
    IQuestaoInput,
    IPaginationOptions,
    IPaginatedResult,
    IQuestaoFilters,
    ISimilarityResult
} from '../interfaces/IQuestao';

export class QuestaoService {

    // ==================== HASH E DETECÇÃO DE DUPLICATAS ====================

    /**
     * Gera hash SHA256 do conteúdo para detectar duplicatas exatas
     */
    private _gerarHash(data: IQuestaoInput | IQuestao): string {
        let content = '';

        // Tipo da questão
        content += `tipo:${data.tipo}|`;

        // Enunciado (blocos ordenados)
        if (data.enunciado && data.enunciado.length > 0) {
            const sorted = [...data.enunciado].sort((a, b) => a.ordem - b.ordem);
            sorted.forEach((bloco, idx) => {
                content += `bloco${idx}:${bloco.tipo}:${this._normalizar(bloco.conteudo)}|`;
            });
        }

        // Alternativas (se houver)
        if (data.alternativas && data.alternativas.length > 0) {
            const sorted = [...data.alternativas].sort((a, b) => a.letra.localeCompare(b.letra));
            sorted.forEach(alt => {
                content += `alt${alt.letra}:${this._normalizar(alt.conteudo)}:${alt.correta}|`;
            });
        }

        // Gabarito
        content += `gab:${this._normalizar(data.gabarito)}|`;

        if (!content || content.length < 20) {
            return '';
        }

        return crypto.createHash('sha256').update(content).digest('hex');
    }

    /**
     * Gera texto normalizado para busca de similaridade
     */
    private _gerarTextoNormalizado(data: IQuestaoInput | IQuestao): string {
        let texto = '';

        // Extrair texto do enunciado
        if (data.enunciado) {
            data.enunciado
                .filter(b => b.tipo === 'texto')
                .forEach(b => { texto += this._normalizar(b.conteudo) + ' '; });
        }

        // Extrair texto das alternativas
        if (data.alternativas) {
            data.alternativas.forEach(alt => {
                texto += this._normalizar(alt.conteudo) + ' ';
            });
        }

        return texto.trim();
    }

    /**
     * Normaliza texto para comparação
     */
    private _normalizar(texto?: string): string {
        if (!texto) return '';
        return texto
            .toLowerCase()
            .trim()
            .replace(/\s+/g, ' ')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');
    }

    /**
     * Verifica similaridade com questões existentes
     */
    async verificarSimilaridade(data: IQuestaoInput, limiar: number = 80): Promise<ISimilarityResult[]> {
        const resultados: ISimilarityResult[] = [];

        // 1. Verificar hash exato
        const hash = this._gerarHash(data);
        if (hash) {
            const exata = await Questao.findOne({ conteudo_hash: hash, ativa: true });
            if (exata) {
                resultados.push({
                    questao_id: exata._id,
                    similaridade: 100,
                    tipo_match: 'hash_exato'
                });
                return resultados;
            }
        }

        // 2. Busca por texto similar
        const textoNorm = this._gerarTextoNormalizado(data);
        if (textoNorm.length < 20) return resultados;

        const palavras = textoNorm.split(' ').filter(p => p.length > 3).slice(0, 10);
        if (palavras.length < 3) return resultados;

        const similares = await Questao.find(
            { $text: { $search: palavras.join(' ') }, ativa: true, tipo: data.tipo },
            { score: { $meta: 'textScore' } }
        ).sort({ score: { $meta: 'textScore' } }).limit(5);

        for (const q of similares) {
            const sim = this._calcularSimilaridade(textoNorm, this._gerarTextoNormalizado(q as IQuestao));
            if (sim >= limiar) {
                resultados.push({
                    questao_id: q._id,
                    similaridade: Math.round(sim),
                    tipo_match: 'texto_similar'
                });
            }
        }

        return resultados.sort((a, b) => b.similaridade - a.similaridade);
    }

    /**
     * Coeficiente de Jaccard para similaridade
     */
    private _calcularSimilaridade(t1: string, t2: string): number {
        const p1 = new Set(t1.split(' ').filter(p => p.length > 2));
        const p2 = new Set(t2.split(' ').filter(p => p.length > 2));
        if (p1.size === 0 || p2.size === 0) return 0;

        const inter = new Set([...p1].filter(x => p2.has(x)));
        const union = new Set([...p1, ...p2]);
        return (inter.size / union.size) * 100;
    }

    // ==================== CRUD ====================

    async create(data: IQuestaoInput, verificarDuplicata: boolean = true) {
        // Verificar duplicatas antes de criar
        if (verificarDuplicata) {
            const similares = await this.verificarSimilaridade(data, 90);
            if (similares.length > 0 && similares[0].similaridade >= 90) {
                throw new Error(
                    `Questão similar já existe (${similares[0].similaridade}% similaridade). ` +
                    `ID: ${similares[0].questao_id}`
                );
            }
        }

        const questaoData = {
            ...data,
            conteudo_hash: this._gerarHash(data) || undefined,
            texto_normalizado: this._gerarTextoNormalizado(data) || undefined
        };

        try {
            const questao = new Questao(questaoData);
            return await questao.save();
        } catch (error: any) {
            if (error.code === 11000 && error.keyPattern?.conteudo_hash) {
                throw new Error('Questão com conteúdo idêntico já existe.');
            }
            throw error;
        }
    }

    async find(
        filters: IQuestaoFilters = {},
        pagination: IPaginationOptions = {}
    ): Promise<IPaginatedResult<IQuestao>> {
        const { page = 1, limit = 20, sortBy = 'criado_em', sortOrder = 'desc' } = pagination;

        const query: any = { ativa: true };

        if (filters.assunto_ids?.length) query.assunto_ids = { $in: filters.assunto_ids };
        if (filters.topico_id) query.topico_id = filters.topico_id;
        if (filters.tipo) query.tipo = filters.tipo;
        if (filters.dificuldade) query.dificuldade = filters.dificuldade;
        if (filters.origem_tipo) query['origem.tipo'] = filters.origem_tipo;
        if (filters.search) query.$text = { $search: filters.search };

        const total = await Questao.countDocuments(query);
        const totalPages = Math.ceil(total / limit);

        const questoes = await Questao.find(query)
            .populate('assunto_ids', 'nome slug')
            .populate('topico_id', 'nome slug')
            .populate('texto_base_id', 'titulo')
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        return {
            data: questoes as IQuestao[],
            pagination: { total, page, limit, totalPages, hasNext: page < totalPages, hasPrev: page > 1 }
        };
    }

    async findOne(id: string) {
        return await Questao.findOne({ _id: id, ativa: true })
            .populate('assunto_ids', 'nome slug')
            .populate('topico_id', 'nome slug')
            .populate('texto_base_id');
    }

    async update(id: string, data: Partial<IQuestaoInput>) {
        const questao = await Questao.findOne({ _id: id, ativa: true });
        if (!questao) throw new Error('Questão não encontrada');

        // Recalcular hash se conteúdo mudou
        const updateData: any = { ...data };
        if (data.enunciado || data.alternativas || data.tipo) {
            const merged = { ...questao.toObject(), ...data };
            updateData.conteudo_hash = this._gerarHash(merged as IQuestaoInput) || undefined;
            updateData.texto_normalizado = this._gerarTextoNormalizado(merged as IQuestaoInput) || undefined;
        }

        try {
            return await Questao.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        } catch (error: any) {
            if (error.code === 11000 && error.keyPattern?.conteudo_hash) {
                throw new Error('Atualização resultaria em questão duplicada.');
            }
            throw error;
        }
    }

    async delete(id: string) {
        // Soft delete
        return await Questao.findByIdAndUpdate(id, { ativa: false }, { new: true });
    }

    async hardDelete(id: string) {
        return await Questao.findByIdAndDelete(id);
    }

    // ==================== AUXILIARES ====================

    async count(filters: IQuestaoFilters = {}): Promise<number> {
        const query: any = { ativa: true };
        if (filters.assunto_ids?.length) query.assunto_ids = { $in: filters.assunto_ids };
        if (filters.tipo) query.tipo = filters.tipo;
        if (filters.dificuldade) query.dificuldade = filters.dificuldade;
        return await Questao.countDocuments(query);
    }

    async findRandom(filters: IQuestaoFilters = {}, quantidade: number = 10): Promise<IQuestao[]> {
        const query: any = { ativa: true };
        if (filters.assunto_ids?.length) query.assunto_ids = { $in: filters.assunto_ids };
        if (filters.tipo) query.tipo = filters.tipo;
        if (filters.dificuldade) query.dificuldade = filters.dificuldade;

        return await Questao.aggregate([
            { $match: query },
            { $sample: { size: quantidade } }
        ]);
    }

    async getEstatisticas() {
        const [porTipo, porDificuldade, total] = await Promise.all([
            Questao.aggregate([
                { $match: { ativa: true } },
                { $group: { _id: '$tipo', count: { $sum: 1 } } }
            ]),
            Questao.aggregate([
                { $match: { ativa: true } },
                { $group: { _id: '$dificuldade', count: { $sum: 1 } } }
            ]),
            Questao.countDocuments({ ativa: true })
        ]);

        return {
            total,
            porTipo: Object.fromEntries(porTipo.map(t => [t._id, t.count])),
            porDificuldade: Object.fromEntries(porDificuldade.map(d => [d._id, d.count]))
        };
    }
}

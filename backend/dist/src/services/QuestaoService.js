"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestaoService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const QuestaoSchema_1 = __importDefault(require("../models/QuestaoSchema"));
class QuestaoService {
    // ==================== HASH E DETECÇÃO DE DUPLICATAS ====================
    /**
     * Gera hash SHA256 do conteúdo para detectar duplicatas exatas
     */
    _gerarHash(data) {
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
        return crypto_1.default.createHash('sha256').update(content).digest('hex');
    }
    /**
     * Gera texto normalizado para busca de similaridade
     */
    _gerarTextoNormalizado(data) {
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
    _normalizar(texto) {
        if (!texto)
            return '';
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
    async verificarSimilaridade(data, limiar = 80) {
        const resultados = [];
        // 1. Verificar hash exato
        const hash = this._gerarHash(data);
        if (hash) {
            const exata = await QuestaoSchema_1.default.findOne({ conteudo_hash: hash, ativa: true });
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
        if (textoNorm.length < 20)
            return resultados;
        const palavras = textoNorm.split(' ').filter(p => p.length > 3).slice(0, 10);
        if (palavras.length < 3)
            return resultados;
        const similares = await QuestaoSchema_1.default.find({ $text: { $search: palavras.join(' ') }, ativa: true, tipo: data.tipo }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } }).limit(5);
        for (const q of similares) {
            const sim = this._calcularSimilaridade(textoNorm, this._gerarTextoNormalizado(q));
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
    _calcularSimilaridade(t1, t2) {
        const p1 = new Set(t1.split(' ').filter(p => p.length > 2));
        const p2 = new Set(t2.split(' ').filter(p => p.length > 2));
        if (p1.size === 0 || p2.size === 0)
            return 0;
        const inter = new Set([...p1].filter(x => p2.has(x)));
        const union = new Set([...p1, ...p2]);
        return (inter.size / union.size) * 100;
    }
    // ==================== CRUD ====================
    async create(data, verificarDuplicata = true) {
        // Verificar duplicatas antes de criar
        if (verificarDuplicata) {
            const similares = await this.verificarSimilaridade(data, 90);
            if (similares.length > 0 && similares[0].similaridade >= 90) {
                throw new Error(`Questão similar já existe (${similares[0].similaridade}% similaridade). ` +
                    `ID: ${similares[0].questao_id}`);
            }
        }
        const questaoData = {
            ...data,
            conteudo_hash: this._gerarHash(data) || undefined,
            texto_normalizado: this._gerarTextoNormalizado(data) || undefined
        };
        try {
            const questao = new QuestaoSchema_1.default(questaoData);
            return await questao.save();
        }
        catch (error) {
            if (error.code === 11000 && error.keyPattern?.conteudo_hash) {
                throw new Error('Questão com conteúdo idêntico já existe.');
            }
            throw error;
        }
    }
    async find(filters = {}, pagination = {}) {
        const { page = 1, limit = 20, sortBy = 'criado_em', sortOrder = 'desc' } = pagination;
        const query = { ativa: true };
        if (filters.assunto_ids?.length)
            query.assunto_ids = { $in: filters.assunto_ids };
        if (filters.topico_id)
            query.topico_id = filters.topico_id;
        if (filters.tipo)
            query.tipo = filters.tipo;
        if (filters.dificuldade)
            query.dificuldade = filters.dificuldade;
        if (filters.origem_tipo)
            query['origem.tipo'] = filters.origem_tipo;
        if (filters.search)
            query.$text = { $search: filters.search };
        const total = await QuestaoSchema_1.default.countDocuments(query);
        const totalPages = Math.ceil(total / limit);
        const questoes = await QuestaoSchema_1.default.find(query)
            .populate('assunto_ids', 'nome slug')
            .populate('topico_id', 'nome slug')
            .populate('texto_base_id', 'titulo')
            .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return {
            data: questoes,
            pagination: { total, page, limit, totalPages, hasNext: page < totalPages, hasPrev: page > 1 }
        };
    }
    async findOne(id) {
        return await QuestaoSchema_1.default.findOne({ _id: id, ativa: true })
            .populate('assunto_ids', 'nome slug')
            .populate('topico_id', 'nome slug')
            .populate('texto_base_id');
    }
    async update(id, data) {
        const questao = await QuestaoSchema_1.default.findOne({ _id: id, ativa: true });
        if (!questao)
            throw new Error('Questão não encontrada');
        // Recalcular hash se conteúdo mudou
        const updateData = { ...data };
        if (data.enunciado || data.alternativas || data.tipo) {
            const merged = { ...questao.toObject(), ...data };
            updateData.conteudo_hash = this._gerarHash(merged) || undefined;
            updateData.texto_normalizado = this._gerarTextoNormalizado(merged) || undefined;
        }
        try {
            return await QuestaoSchema_1.default.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        }
        catch (error) {
            if (error.code === 11000 && error.keyPattern?.conteudo_hash) {
                throw new Error('Atualização resultaria em questão duplicada.');
            }
            throw error;
        }
    }
    async delete(id) {
        // Soft delete
        return await QuestaoSchema_1.default.findByIdAndUpdate(id, { ativa: false }, { new: true });
    }
    async hardDelete(id) {
        return await QuestaoSchema_1.default.findByIdAndDelete(id);
    }
    // ==================== AUXILIARES ====================
    async count(filters = {}) {
        const query = { ativa: true };
        if (filters.assunto_ids?.length)
            query.assunto_ids = { $in: filters.assunto_ids };
        if (filters.tipo)
            query.tipo = filters.tipo;
        if (filters.dificuldade)
            query.dificuldade = filters.dificuldade;
        return await QuestaoSchema_1.default.countDocuments(query);
    }
    async findRandom(filters = {}, quantidade = 10) {
        const query = { ativa: true };
        if (filters.assunto_ids?.length)
            query.assunto_ids = { $in: filters.assunto_ids };
        if (filters.tipo)
            query.tipo = filters.tipo;
        if (filters.dificuldade)
            query.dificuldade = filters.dificuldade;
        return await QuestaoSchema_1.default.aggregate([
            { $match: query },
            { $sample: { size: quantidade } }
        ]);
    }
    async getEstatisticas() {
        const [porTipo, porDificuldade, total] = await Promise.all([
            QuestaoSchema_1.default.aggregate([
                { $match: { ativa: true } },
                { $group: { _id: '$tipo', count: { $sum: 1 } } }
            ]),
            QuestaoSchema_1.default.aggregate([
                { $match: { ativa: true } },
                { $group: { _id: '$dificuldade', count: { $sum: 1 } } }
            ]),
            QuestaoSchema_1.default.countDocuments({ ativa: true })
        ]);
        return {
            total,
            porTipo: Object.fromEntries(porTipo.map(t => [t._id, t.count])),
            porDificuldade: Object.fromEntries(porDificuldade.map(d => [d._id, d.count]))
        };
    }
}
exports.QuestaoService = QuestaoService;

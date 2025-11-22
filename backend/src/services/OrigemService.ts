import Origem from '../models/OrigemSchema';
import Questao from '../models/QuestaoSchema';
import { IOrigem, IOrigemInput, TipoOrigem } from '../interfaces/IOrigem';

export class OrigemService {
    async create(data: IOrigemInput): Promise<IOrigem> {
        const origem = new Origem(data);
        return origem.save();
    }

    async find(filters?: { tipo?: TipoOrigem; search?: string; ano?: number }): Promise<IOrigem[]> {
        const query: any = { ativa: true };

        if (filters?.tipo) {
            query.tipo = filters.tipo;
        }

        if (filters?.ano) {
            query.ano = filters.ano;
        }

        if (filters?.search) {
            query.$text = { $search: filters.search };
        }

        return Origem.find(query).sort({ nome: 1 });
    }

    async findOne(id: string): Promise<IOrigem | null> {
        return Origem.findById(id);
    }

    async findByTipo(tipo: TipoOrigem): Promise<IOrigem[]> {
        return Origem.find({ tipo, ativa: true }).sort({ nome: 1, ano: -1 });
    }

    async update(id: string, data: Partial<IOrigemInput>): Promise<IOrigem | null> {
        return Origem.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async delete(id: string): Promise<IOrigem | null> {
        // Soft delete
        const origem = await Origem.findByIdAndUpdate(
            id,
            { ativa: false },
            { new: true }
        );

        if (origem) {
            // Remove referência das questões vinculadas (set null)
            await Questao.updateMany(
                { origem_id: id },
                { $unset: { origem_id: 1 } }
            );
        }

        return origem;
    }

    async hardDelete(id: string): Promise<IOrigem | null> {
        // Remove referência das questões antes de deletar
        await Questao.updateMany(
            { origem_id: id },
            { $unset: { origem_id: 1 } }
        );

        return Origem.findByIdAndDelete(id);
    }

    async countQuestoes(origemId: string): Promise<number> {
        return Questao.countDocuments({ origem_id: origemId, ativa: true });
    }

    async getEstatisticas(): Promise<any> {
        const porTipo = await Origem.aggregate([
            { $match: { ativa: true } },
            { $group: { _id: '$tipo', count: { $sum: 1 } } },
        ]);

        const total = await Origem.countDocuments({ ativa: true });

        return {
            total,
            porTipo: porTipo.reduce((acc, item) => {
                acc[item._id] = item.count;
                return acc;
            }, {}),
        };
    }
}

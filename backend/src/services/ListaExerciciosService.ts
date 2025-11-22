import ListaExercicios from '../models/ListaExerciciosSchema';
import { IListaExercicios } from '../interfaces/IListaExercicios';

export class ListaExerciciosService {
    async create(data: IListaExercicios) {
        const listaExercicios = new ListaExercicios(data);
        return await listaExercicios.save();
    }

    async find() {
        return await ListaExercicios.find()
            .populate('materia_id')
            .populate('assunto_ids')
            .populate('topico_ids')
            .populate('questoes.questao_id')
            .populate('criada_por');
    }

    async findOne(id: string) {
        return await ListaExercicios.findById(id)
            .populate('materia_id')
            .populate('assunto_ids')
            .populate('topico_ids')
            .populate('questoes.questao_id')
            .populate('criada_por');
    }

    async update(id: string, data: IListaExercicios) {
        return await ListaExercicios.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await ListaExercicios.findByIdAndDelete(id);
    }
}

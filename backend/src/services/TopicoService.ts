import Topico from '../models/TopicoSchema';
import { ITopico } from '../interfaces/ITopico';

export class TopicoService {
    async create(data: ITopico) {
        const topico = new Topico(data);
        return await topico.save();
    }

    async find() {
        return await Topico.find().populate('assunto_id');
    }

    async findOne(id: string) {
        return await Topico.findById(id).populate('assunto_id');
    }

    async update(id: string, data: ITopico) {
        return await Topico.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await Topico.findByIdAndDelete(id);
    }

    async findByAssunto(assuntoId: string) {
        return await Topico.find({ assunto_id: assuntoId }).populate('assunto_id');
    }
}

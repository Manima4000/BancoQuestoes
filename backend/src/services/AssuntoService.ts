import Assunto from '../models/AssuntoSchema';
import { IAssunto } from '../interfaces/IAssunto';

export class AssuntoService {
    async create(data: IAssunto) {
        const assunto = new Assunto(data);
        return await assunto.save();
    }

    async find() {
        return await Assunto.find().populate('materia_id');
    }

    async findOne(id: string) {
        return await Assunto.findById(id).populate('materia_id');
    }

    async update(id: string, data: IAssunto) {
        return await Assunto.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await Assunto.findByIdAndDelete(id);
    }

    async findByMateria(materiaId: string) {
        return await Assunto.find({ materia_id: materiaId }).populate('materia_id');
    }
}

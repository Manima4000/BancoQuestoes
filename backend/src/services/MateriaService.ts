import Materia from '../models/MateriaSchema';
import { IMateria } from '../interfaces/IMateria';

export class MateriaService {
    async create(data: IMateria) {
        const materia = new Materia(data);
        return await materia.save();
    }

    async find() {
        return await Materia.find();
    }

    async findOne(id: string) {
        return await Materia.findById(id);
    }

    async update(id: string, data: IMateria) {
        return await Materia.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await Materia.findByIdAndDelete(id);
    }
}

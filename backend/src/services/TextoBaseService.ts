import TextoBase from '../models/TextoBaseSchema';
import { ITextoBase } from '../interfaces/ITextoBase';

export class TextoBaseService {
    async create(data: ITextoBase) {
        const textoBase = new TextoBase(data);
        return await textoBase.save();
    }

    async find() {
        return await TextoBase.find().populate('materia_id');
    }

    async findOne(id: string) {
        return await TextoBase.findById(id).populate('materia_id');
    }

    async update(id: string, data: ITextoBase) {
        return await TextoBase.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string) {
        return await TextoBase.findByIdAndDelete(id);
    }
}

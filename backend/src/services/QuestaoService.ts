import Questao from "../models/QuestaoModel";
import { IQuestao } from "../interfaces/IQuestaoModel";

class QuestaoService {
    async create(data: Partial<IQuestao>): Promise<IQuestao> {
        const novaQuestao = new Questao(data);
        return await novaQuestao.save();
    }

    async findAll(): Promise<IQuestao[]> {
        return await Questao.find();
    }
}


export default new QuestaoService();

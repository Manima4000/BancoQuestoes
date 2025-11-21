import { Request, Response } from 'express';
import QuestaoService from '../services/QuestaoService';

export const createQuestao = async (req: Request, res: Response) => {
    try {
        const questaoSalva = await QuestaoService.create(req.body);
        res.status(201).json(questaoSalva);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar questão', error });
    }
};

export const getQuestoes = async (req: Request, res: Response) => {
    try{
        const questoes = await QuestaoService.findAll();
        res.status(200).json(questoes);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar questões', error });
    }
}
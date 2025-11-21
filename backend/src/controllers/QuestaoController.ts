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
};

export const deleteQuestao = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; 
        await QuestaoService.delete(id);
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar questão', error });
    }
};

export const addVideoToQuestao = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; 
        const videoData = req.body; 

        const videoCriado = await QuestaoService.addVideo(id, videoData);

        res.status(201).json(videoCriado);
    } catch (error: any) {
        if (error.message === "Questão não encontrada.") {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Erro ao adicionar vídeo', error });
        }
    }
};
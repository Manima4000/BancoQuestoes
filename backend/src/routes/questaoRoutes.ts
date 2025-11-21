import { Router } from "express";
import { createQuestao, getQuestoes, deleteQuestao, addVideoToQuestao } from "../controllers/QuestaoController";

const router = Router();

router.post('/criar', createQuestao);
router.get('/all', getQuestoes);
router.delete('/delete/:id', deleteQuestao);
router.post('/:id/video', addVideoToQuestao);

export default router;
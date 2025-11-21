import { Router } from "express";
import { createQuestao, getQuestoes } from "../controllers/QuestaoController";

const router = Router();

router.post('/criar', createQuestao);
router.get('/all', getQuestoes);

export default router;
import { Router } from 'express';
import { QuestaoController } from '../controllers/QuestaoController';

const router = Router();
const questaoController = new QuestaoController();

// Rotas específicas (ANTES das rotas com :id)
router.get('/questoes/estatisticas', questaoController.getEstatisticas);
router.get('/questoes/contagem', questaoController.count);
router.get('/questoes/aleatorias', questaoController.findRandom);
router.post('/questoes/verificar-similaridade', questaoController.verificarSimilaridade);

// CRUD
router.post('/questoes', questaoController.create);
router.get('/questoes', questaoController.find);
router.get('/questoes/:id', questaoController.findOne);
router.put('/questoes/:id', questaoController.update);
router.delete('/questoes/:id', questaoController.delete);
router.delete('/questoes/:id/permanente', questaoController.hardDelete);

export default router;

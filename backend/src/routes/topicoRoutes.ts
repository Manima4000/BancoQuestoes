import { Router } from 'express';
import { TopicoController } from '../controllers/TopicoController';

const router = Router();
const topicoController = new TopicoController();

router.post('/topicos', topicoController.create);
router.get('/topicos', topicoController.find);
router.get('/topicos/assunto/:assuntoId', topicoController.findByAssunto);
router.get('/topicos/:id', topicoController.findOne);
router.put('/topicos/:id', topicoController.update);
router.delete('/topicos/:id', topicoController.delete);

export default router;

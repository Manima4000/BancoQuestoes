import { Router } from 'express';
import { AssuntoController } from '../controllers/AssuntoController';

const router = Router();
const assuntoController = new AssuntoController();

router.post('/assuntos', assuntoController.create);
router.get('/assuntos', assuntoController.find);
router.get('/assuntos/materia/:materiaId', assuntoController.findByMateria);
router.get('/assuntos/:id', assuntoController.findOne);
router.put('/assuntos/:id', assuntoController.update);
router.delete('/assuntos/:id', assuntoController.delete);

export default router;

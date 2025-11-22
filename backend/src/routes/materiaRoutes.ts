import { Router } from 'express';
import { MateriaController } from '../controllers/MateriaController';

const router = Router();
const materiaController = new MateriaController();

router.post('/materias', materiaController.create);
router.get('/materias', materiaController.find);
router.get('/materias/:id', materiaController.findOne);
router.put('/materias/:id', materiaController.update);
router.delete('/materias/:id', materiaController.delete);

export default router;

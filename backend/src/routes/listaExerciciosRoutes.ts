import { Router } from 'express';
import { ListaExerciciosController } from '../controllers/ListaExerciciosController';

const router = Router();
const listaExerciciosController = new ListaExerciciosController();

router.post('/listas-exercicios', listaExerciciosController.create);
router.get('/listas-exercicios', listaExerciciosController.find);
router.get('/listas-exercicios/:id', listaExerciciosController.findOne);
router.put('/listas-exercicios/:id', listaExerciciosController.update);
router.delete('/listas-exercicios/:id', listaExerciciosController.delete);

export default router;

import { Router } from 'express';
import { TextoBaseController } from '../controllers/TextoBaseController';

const router = Router();
const textoBaseController = new TextoBaseController();

router.post('/textos-base', textoBaseController.create);
router.get('/textos-base', textoBaseController.find);
router.get('/textos-base/:id', textoBaseController.findOne);
router.put('/textos-base/:id', textoBaseController.update);
router.delete('/textos-base/:id', textoBaseController.delete);

export default router;

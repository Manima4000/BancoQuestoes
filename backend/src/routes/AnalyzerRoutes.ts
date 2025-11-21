import { Router } from 'express';
import { uploadPdf } from '../config/upload'; 
import { analyzePdf } from '../controllers/AnalyzerController';

const router = Router();

router.post('/analyze', uploadPdf.single('file'), analyzePdf);

export default router;
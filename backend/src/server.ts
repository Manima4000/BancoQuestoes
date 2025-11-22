import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db'; 
import path from 'path';
import { limiter } from './config/limiter';

import questaoRoutes from './routes/questaoRoutes'; 
import analyzerRoutes from './routes/analyzerRoutes';
import materiaRoutes from './routes/materiaRoutes';
import assuntoRoutes from './routes/assuntoRoutes';
import topicoRoutes from './routes/topicoRoutes';
import textoBaseRoutes from './routes/textoBaseRoutes';
import listaExerciciosRoutes from './routes/listaExerciciosRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/', limiter);

//Tornando a pasta uploads visivel para o frontend
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api', questaoRoutes); 
app.use('/api', materiaRoutes);
app.use('/api', assuntoRoutes);
app.use('/api', topicoRoutes);
app.use('/api', textoBaseRoutes);
app.use('/api', listaExerciciosRoutes);
app.use('/api/analyzer', analyzerRoutes);

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'test') {
    connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

export default app;
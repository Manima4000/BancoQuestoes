import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db';
import path from 'path';
import { limiter } from './config/limiter';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

import questaoRoutes from './routes/questaoRoutes';
import analyzerRoutes from './routes/analyzerRoutes';
import materiaRoutes from './routes/materiaRoutes';
import assuntoRoutes from './routes/assuntoRoutes';
import topicoRoutes from './routes/topicoRoutes';
import textoBaseRoutes from './routes/textoBaseRoutes';
import listaExerciciosRoutes from './routes/listaExerciciosRoutes';
import origemRoutes from './routes/origemRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/', limiter);

//Tornando a pasta uploads visivel para o frontend
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Banco de Questões API - Documentação',
}));

// Endpoint para obter o JSON do Swagger
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api', questaoRoutes);
app.use('/api', materiaRoutes);
app.use('/api', assuntoRoutes);
app.use('/api', topicoRoutes);
app.use('/api', textoBaseRoutes);
app.use('/api', listaExerciciosRoutes);
app.use('/api', origemRoutes);
app.use('/api/analyzer', analyzerRoutes);

const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV !== 'test') {
    connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
}

export default app;

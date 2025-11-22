import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db'; 
import path from 'path';
import { limiter } from './config/limiter';

import questaoRoutes from './routes/questaoRoutes'; 
import analyzerRoutes from './routes/analyzerRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/', limiter);

//Tornando a pasta uploads visivel para o frontend
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/questoes', questaoRoutes); 
app.use('/api/analyzer', analyzerRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
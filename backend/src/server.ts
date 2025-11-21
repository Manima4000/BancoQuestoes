import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db'; 
import questaoRoutes from './routes/questaoRoutes'; 

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/questoes', questaoRoutes); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
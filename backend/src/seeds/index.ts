import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { seedMaterias } from './materias.seed';
import { seedAssuntos } from './assuntos.seed';
import { seedOrigens } from './origens.seed';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/banco_questoes';

async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Conectado ao MongoDB\n');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
}

async function disconnectDB() {
    await mongoose.disconnect();
    console.log('\nDesconectado do MongoDB');
}

// Função principal para rodar todos os seeds
async function runAllSeeds() {
    console.log('='.repeat(50));
    console.log('EXECUTANDO TODOS OS SEEDS');
    console.log('='.repeat(50) + '\n');

    await seedMaterias();
    await seedAssuntos();
    await seedOrigens();

    console.log('\n' + '='.repeat(50));
    console.log('SEEDS FINALIZADOS COM SUCESSO!');
    console.log('='.repeat(50));
}

// Executar seed específico baseado no argumento
async function main() {
    await connectDB();

    const arg = process.argv[2];

    try {
        switch (arg) {
            case 'materias':
                await seedMaterias();
                break;
            case 'assuntos':
                await seedAssuntos();
                break;
            case 'origens':
                await seedOrigens();
                break;
            case 'all':
            default:
                await runAllSeeds();
                break;
        }
    } catch (error) {
        console.error('Erro ao executar seed:', error);
    } finally {
        await disconnectDB();
    }
}

main();

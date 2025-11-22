"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const materias_seed_1 = require("./materias.seed");
const assuntos_seed_1 = require("./assuntos.seed");
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/banco_questoes';
async function connectDB() {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Conectado ao MongoDB\n');
    }
    catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
}
async function disconnectDB() {
    await mongoose_1.default.disconnect();
    console.log('\nDesconectado do MongoDB');
}
// Função principal para rodar todos os seeds
async function runAllSeeds() {
    console.log('='.repeat(50));
    console.log('EXECUTANDO TODOS OS SEEDS');
    console.log('='.repeat(50) + '\n');
    await (0, materias_seed_1.seedMaterias)();
    await (0, assuntos_seed_1.seedAssuntos)();
    // Adicionar outros seeds aqui conforme forem criados:
    // await seedTopicos();
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
                await (0, materias_seed_1.seedMaterias)();
                break;
            case 'assuntos':
                await (0, assuntos_seed_1.seedAssuntos)();
                break;
            case 'all':
            default:
                await runAllSeeds();
                break;
        }
    }
    catch (error) {
        console.error('Erro ao executar seed:', error);
    }
    finally {
        await disconnectDB();
    }
}
main();

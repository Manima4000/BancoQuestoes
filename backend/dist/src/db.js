"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error("🔴 Erro: Variável MONGO_URI não definida no .env!");
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log('🟢 Conexão com MongoDB estabelecida com sucesso!');
    }
    catch (error) {
        console.error('❌ Falha na conexão com MongoDB:', error);
        process.exit(1);
    }
};
exports.default = connectDB;

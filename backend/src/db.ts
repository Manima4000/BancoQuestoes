import mongoose from 'mongoose';

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI; 

    if (!mongoUri) {
        console.error("🔴 Erro: Variável MONGO_URI não definida no .env!");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('🟢 Conexão com MongoDB estabelecida com sucesso!');
    } catch (error) {
        console.error('❌ Falha na conexão com MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;
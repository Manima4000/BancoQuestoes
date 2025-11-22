import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Importar todos os models para registrar os schemas
import '../src/models/MateriaSchema';
import '../src/models/AssuntoSchema';
import '../src/models/TopicoSchema';
import '../src/models/QuestaoSchema';
import '../src/models/TextoBaseSchema';
import '../src/models/ListaExerciciosSchema';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
});

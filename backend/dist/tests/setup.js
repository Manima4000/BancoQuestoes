"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
// Importar todos os models para registrar os schemas
require("../src/models/MateriaSchema");
require("../src/models/AssuntoSchema");
require("../src/models/TopicoSchema");
require("../src/models/QuestaoSchema");
require("../src/models/TextoBaseSchema");
require("../src/models/ListaExerciciosSchema");
let mongoServer;
beforeAll(async () => {
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose_1.default.connect(mongoUri);
});
afterAll(async () => {
    await mongoose_1.default.disconnect();
    await mongoServer.stop();
});
beforeEach(async () => {
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
});

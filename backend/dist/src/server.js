"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const path_1 = __importDefault(require("path"));
const limiter_1 = require("./config/limiter");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const questaoRoutes_1 = __importDefault(require("./routes/questaoRoutes"));
const analyzerRoutes_1 = __importDefault(require("./routes/analyzerRoutes"));
const materiaRoutes_1 = __importDefault(require("./routes/materiaRoutes"));
const assuntoRoutes_1 = __importDefault(require("./routes/assuntoRoutes"));
const topicoRoutes_1 = __importDefault(require("./routes/topicoRoutes"));
const textoBaseRoutes_1 = __importDefault(require("./routes/textoBaseRoutes"));
const listaExerciciosRoutes_1 = __importDefault(require("./routes/listaExerciciosRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/', limiter_1.limiter);
//Tornando a pasta uploads visivel para o frontend
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
// Swagger Documentation
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Banco de Questões API - Documentação',
}));
// Endpoint para obter o JSON do Swagger
app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swagger_1.swaggerSpec);
});
app.use('/api', questaoRoutes_1.default);
app.use('/api', materiaRoutes_1.default);
app.use('/api', assuntoRoutes_1.default);
app.use('/api', topicoRoutes_1.default);
app.use('/api', textoBaseRoutes_1.default);
app.use('/api', listaExerciciosRoutes_1.default);
app.use('/api/analyzer', analyzerRoutes_1.default);
const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
    (0, db_1.default)();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
}
exports.default = app;

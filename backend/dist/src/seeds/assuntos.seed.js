"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assuntosPorMateria = void 0;
exports.seedAssuntos = seedAssuntos;
const MateriaSchema_1 = __importDefault(require("../models/MateriaSchema"));
const AssuntoSchema_1 = __importDefault(require("../models/AssuntoSchema"));
// Assuntos organizados por slug da matéria
const assuntosPorMateria = {
    matematica: [
        { nome: 'Álgebra', slug: 'algebra', descricao: 'Equações, inequações, polinômios e sistemas', ordem: 1 },
        { nome: 'Geometria Plana', slug: 'geometria-plana', descricao: 'Áreas, perímetros e propriedades de figuras planas', ordem: 2 },
        { nome: 'Geometria Espacial', slug: 'geometria-espacial', descricao: 'Volumes, áreas de sólidos geométricos', ordem: 3 },
        { nome: 'Geometria Analítica', slug: 'geometria-analitica', descricao: 'Coordenadas, retas, circunferências e cônicas', ordem: 4 },
        { nome: 'Trigonometria', slug: 'trigonometria', descricao: 'Funções trigonométricas, identidades e equações', ordem: 5 },
        { nome: 'Funções', slug: 'funcoes', descricao: 'Funções afim, quadrática, exponencial e logarítmica', ordem: 6 },
        { nome: 'Probabilidade', slug: 'probabilidade', descricao: 'Cálculo de probabilidades e análise combinatória', ordem: 7 },
        { nome: 'Estatística', slug: 'estatistica', descricao: 'Média, mediana, moda, desvio padrão', ordem: 8 },
        { nome: 'Sequências', slug: 'sequencias', descricao: 'Progressões aritméticas e geométricas', ordem: 9 },
        { nome: 'Matrizes e Determinantes', slug: 'matrizes-determinantes', descricao: 'Operações com matrizes e cálculo de determinantes', ordem: 10 },
        { nome: 'Números Complexos', slug: 'numeros-complexos', descricao: 'Operações e representação de números complexos', ordem: 11 },
    ],
    portugues: [
        { nome: 'Interpretação de Texto', slug: 'interpretacao-texto', descricao: 'Compreensão e análise textual', ordem: 1 },
        { nome: 'Gramática', slug: 'gramatica', descricao: 'Regras gramaticais da língua portuguesa', ordem: 2 },
        { nome: 'Morfologia', slug: 'morfologia', descricao: 'Classes de palavras e suas flexões', ordem: 3 },
        { nome: 'Sintaxe', slug: 'sintaxe', descricao: 'Análise sintática, períodos e orações', ordem: 4 },
        { nome: 'Semântica', slug: 'semantica', descricao: 'Significado das palavras e figuras de linguagem', ordem: 5 },
        { nome: 'Fonologia', slug: 'fonologia', descricao: 'Sons da língua, acentuação e ortografia', ordem: 6 },
        { nome: 'Pontuação', slug: 'pontuacao', descricao: 'Uso correto dos sinais de pontuação', ordem: 7 },
        { nome: 'Concordância', slug: 'concordancia', descricao: 'Concordância verbal e nominal', ordem: 8 },
        { nome: 'Regência', slug: 'regencia', descricao: 'Regência verbal e nominal', ordem: 9 },
        { nome: 'Crase', slug: 'crase', descricao: 'Uso do acento grave', ordem: 10 },
    ],
    fisica: [
        { nome: 'Mecânica', slug: 'mecanica', descricao: 'Cinemática, dinâmica e estática', ordem: 1 },
        { nome: 'Termodinâmica', slug: 'termodinamica', descricao: 'Calor, temperatura e leis da termodinâmica', ordem: 2 },
        { nome: 'Óptica', slug: 'optica', descricao: 'Luz, reflexão, refração e instrumentos ópticos', ordem: 3 },
        { nome: 'Ondulatória', slug: 'ondulatoria', descricao: 'Ondas mecânicas e eletromagnéticas', ordem: 4 },
        { nome: 'Eletricidade', slug: 'eletricidade', descricao: 'Eletrostática e eletrodinâmica', ordem: 5 },
        { nome: 'Magnetismo', slug: 'magnetismo', descricao: 'Campos magnéticos e indução eletromagnética', ordem: 6 },
        { nome: 'Física Moderna', slug: 'fisica-moderna', descricao: 'Relatividade, quântica e física nuclear', ordem: 7 },
        { nome: 'Hidrostática', slug: 'hidrostatica', descricao: 'Pressão, empuxo e princípios de fluidos', ordem: 8 },
        { nome: 'Gravitação', slug: 'gravitacao', descricao: 'Leis de Kepler e gravitação universal', ordem: 9 },
    ],
    quimica: [
        { nome: 'Química Geral', slug: 'quimica-geral', descricao: 'Estrutura atômica, tabela periódica e ligações', ordem: 1 },
        { nome: 'Química Orgânica', slug: 'quimica-organica', descricao: 'Compostos de carbono e reações orgânicas', ordem: 2 },
        { nome: 'Química Inorgânica', slug: 'quimica-inorganica', descricao: 'Funções inorgânicas e reações', ordem: 3 },
        { nome: 'Físico-Química', slug: 'fisico-quimica', descricao: 'Termoquímica, cinética e equilíbrio', ordem: 4 },
        { nome: 'Estequiometria', slug: 'estequiometria', descricao: 'Cálculos químicos e relações de massa', ordem: 5 },
        { nome: 'Soluções', slug: 'solucoes', descricao: 'Concentração, diluição e propriedades coligativas', ordem: 6 },
        { nome: 'Eletroquímica', slug: 'eletroquimica', descricao: 'Pilhas, eletrólise e corrosão', ordem: 7 },
        { nome: 'Radioatividade', slug: 'radioatividade', descricao: 'Decaimento radioativo e aplicações', ordem: 8 },
    ],
    biologia: [
        { nome: 'Citologia', slug: 'citologia', descricao: 'Estrutura e funcionamento das células', ordem: 1 },
        { nome: 'Genética', slug: 'genetica', descricao: 'Hereditariedade, DNA e biotecnologia', ordem: 2 },
        { nome: 'Ecologia', slug: 'ecologia', descricao: 'Ecossistemas, cadeias alimentares e meio ambiente', ordem: 3 },
        { nome: 'Evolução', slug: 'evolucao', descricao: 'Teorias evolutivas e especiação', ordem: 4 },
        { nome: 'Fisiologia Humana', slug: 'fisiologia-humana', descricao: 'Sistemas do corpo humano', ordem: 5 },
        { nome: 'Fisiologia Vegetal', slug: 'fisiologia-vegetal', descricao: 'Fotossíntese, transpiração e hormônios vegetais', ordem: 6 },
        { nome: 'Zoologia', slug: 'zoologia', descricao: 'Classificação e características dos animais', ordem: 7 },
        { nome: 'Botânica', slug: 'botanica', descricao: 'Classificação e estrutura das plantas', ordem: 8 },
        { nome: 'Microbiologia', slug: 'microbiologia', descricao: 'Vírus, bactérias, fungos e protistas', ordem: 9 },
        { nome: 'Bioquímica', slug: 'bioquimica', descricao: 'Proteínas, carboidratos, lipídios e metabolismo', ordem: 10 },
    ],
    historia: [
        { nome: 'História do Brasil Colônia', slug: 'brasil-colonia', descricao: 'Período colonial brasileiro (1500-1822)', ordem: 1 },
        { nome: 'História do Brasil Império', slug: 'brasil-imperio', descricao: 'Período imperial brasileiro (1822-1889)', ordem: 2 },
        { nome: 'História do Brasil República', slug: 'brasil-republica', descricao: 'República Velha até os dias atuais', ordem: 3 },
        { nome: 'História Antiga', slug: 'historia-antiga', descricao: 'Civilizações antigas: Egito, Grécia, Roma', ordem: 4 },
        { nome: 'História Medieval', slug: 'historia-medieval', descricao: 'Idade Média europeia e feudalismo', ordem: 5 },
        { nome: 'História Moderna', slug: 'historia-moderna', descricao: 'Renascimento, Absolutismo e Revoluções', ordem: 6 },
        { nome: 'História Contemporânea', slug: 'historia-contemporanea', descricao: 'Século XIX até atualidade', ordem: 7 },
        { nome: 'Guerras Mundiais', slug: 'guerras-mundiais', descricao: 'Primeira e Segunda Guerra Mundial', ordem: 8 },
        { nome: 'Guerra Fria', slug: 'guerra-fria', descricao: 'Bipolarização e conflitos do século XX', ordem: 9 },
    ],
    geografia: [
        { nome: 'Geografia Física', slug: 'geografia-fisica', descricao: 'Relevo, clima, hidrografia e vegetação', ordem: 1 },
        { nome: 'Geografia Humana', slug: 'geografia-humana', descricao: 'População, urbanização e migrações', ordem: 2 },
        { nome: 'Geopolítica', slug: 'geopolitica', descricao: 'Relações internacionais e conflitos', ordem: 3 },
        { nome: 'Geografia do Brasil', slug: 'geografia-brasil', descricao: 'Aspectos físicos e humanos do Brasil', ordem: 4 },
        { nome: 'Cartografia', slug: 'cartografia', descricao: 'Mapas, escalas e projeções cartográficas', ordem: 5 },
        { nome: 'Geografia Econômica', slug: 'geografia-economica', descricao: 'Agricultura, indústria e comércio', ordem: 6 },
        { nome: 'Meio Ambiente', slug: 'meio-ambiente', descricao: 'Questões ambientais e sustentabilidade', ordem: 7 },
        { nome: 'Globalização', slug: 'globalizacao', descricao: 'Processos de integração mundial', ordem: 8 },
    ],
    ingles: [
        { nome: 'Reading Comprehension', slug: 'reading-comprehension', descricao: 'Interpretação de textos em inglês', ordem: 1 },
        { nome: 'Grammar', slug: 'grammar', descricao: 'Gramática inglesa', ordem: 2 },
        { nome: 'Verb Tenses', slug: 'verb-tenses', descricao: 'Tempos verbais em inglês', ordem: 3 },
        { nome: 'Vocabulary', slug: 'vocabulary', descricao: 'Vocabulário e expressões idiomáticas', ordem: 4 },
        { nome: 'Prepositions', slug: 'prepositions', descricao: 'Uso de preposições', ordem: 5 },
        { nome: 'Conditionals', slug: 'conditionals', descricao: 'Orações condicionais', ordem: 6 },
        { nome: 'Passive Voice', slug: 'passive-voice', descricao: 'Voz passiva', ordem: 7 },
        { nome: 'Reported Speech', slug: 'reported-speech', descricao: 'Discurso indireto', ordem: 8 },
    ],
    literatura: [
        { nome: 'Trovadorismo', slug: 'trovadorismo', descricao: 'Literatura medieval portuguesa', ordem: 1 },
        { nome: 'Classicismo', slug: 'classicismo', descricao: 'Renascimento literário português', ordem: 2 },
        { nome: 'Barroco', slug: 'barroco', descricao: 'Literatura barroca no Brasil e Portugal', ordem: 3 },
        { nome: 'Arcadismo', slug: 'arcadismo', descricao: 'Neoclassicismo na literatura', ordem: 4 },
        { nome: 'Romantismo', slug: 'romantismo', descricao: 'Movimento romântico brasileiro', ordem: 5 },
        { nome: 'Realismo e Naturalismo', slug: 'realismo-naturalismo', descricao: 'Literatura realista e naturalista', ordem: 6 },
        { nome: 'Parnasianismo e Simbolismo', slug: 'parnasianismo-simbolismo', descricao: 'Poesia parnasiana e simbolista', ordem: 7 },
        { nome: 'Pré-Modernismo', slug: 'pre-modernismo', descricao: 'Transição para o modernismo', ordem: 8 },
        { nome: 'Modernismo', slug: 'modernismo', descricao: 'Fases do modernismo brasileiro', ordem: 9 },
        { nome: 'Literatura Contemporânea', slug: 'literatura-contemporanea', descricao: 'Produções literárias atuais', ordem: 10 },
    ],
    filosofia: [
        { nome: 'Filosofia Antiga', slug: 'filosofia-antiga', descricao: 'Pré-socráticos, Sócrates, Platão e Aristóteles', ordem: 1 },
        { nome: 'Filosofia Medieval', slug: 'filosofia-medieval', descricao: 'Patrística e Escolástica', ordem: 2 },
        { nome: 'Filosofia Moderna', slug: 'filosofia-moderna', descricao: 'Racionalismo, Empirismo e Iluminismo', ordem: 3 },
        { nome: 'Filosofia Contemporânea', slug: 'filosofia-contemporanea', descricao: 'Existencialismo, Fenomenologia e pós-modernismo', ordem: 4 },
        { nome: 'Ética', slug: 'etica', descricao: 'Teorias éticas e filosofia moral', ordem: 5 },
        { nome: 'Filosofia Política', slug: 'filosofia-politica', descricao: 'Estado, poder e sociedade', ordem: 6 },
        { nome: 'Teoria do Conhecimento', slug: 'teoria-conhecimento', descricao: 'Epistemologia e métodos do saber', ordem: 7 },
        { nome: 'Lógica', slug: 'logica', descricao: 'Raciocínio lógico e argumentação', ordem: 8 },
    ],
    sociologia: [
        { nome: 'Sociologia Clássica', slug: 'sociologia-classica', descricao: 'Marx, Durkheim e Weber', ordem: 1 },
        { nome: 'Cultura e Sociedade', slug: 'cultura-sociedade', descricao: 'Identidade, diversidade e patrimônio cultural', ordem: 2 },
        { nome: 'Trabalho e Sociedade', slug: 'trabalho-sociedade', descricao: 'Relações de trabalho e classes sociais', ordem: 3 },
        { nome: 'Política e Poder', slug: 'politica-poder', descricao: 'Estado, democracia e participação política', ordem: 4 },
        { nome: 'Estratificação Social', slug: 'estratificacao-social', descricao: 'Desigualdade, mobilidade e exclusão', ordem: 5 },
        { nome: 'Movimentos Sociais', slug: 'movimentos-sociais', descricao: 'Ações coletivas e mudança social', ordem: 6 },
        { nome: 'Violência e Cidadania', slug: 'violencia-cidadania', descricao: 'Direitos humanos e segurança pública', ordem: 7 },
        { nome: 'Mídia e Comunicação', slug: 'midia-comunicacao', descricao: 'Meios de comunicação e sociedade', ordem: 8 },
    ],
    redacao: [
        { nome: 'Dissertação Argumentativa', slug: 'dissertacao-argumentativa', descricao: 'Estrutura e técnicas de argumentação', ordem: 1 },
        { nome: 'Narração', slug: 'narracao', descricao: 'Elementos da narrativa e tipos de narrador', ordem: 2 },
        { nome: 'Descrição', slug: 'descricao', descricao: 'Técnicas de descrição objetiva e subjetiva', ordem: 3 },
        { nome: 'Gêneros Textuais', slug: 'generos-textuais', descricao: 'Carta, crônica, artigo, editorial, etc.', ordem: 4 },
        { nome: 'Coesão e Coerência', slug: 'coesao-coerencia', descricao: 'Conectivos e organização textual', ordem: 5 },
        { nome: 'Proposta de Intervenção', slug: 'proposta-intervencao', descricao: 'Elaboração de soluções para problemas sociais', ordem: 6 },
        { nome: 'Repertório Sociocultural', slug: 'repertorio-sociocultural', descricao: 'Uso de referências e citações', ordem: 7 },
        { nome: 'Competências ENEM', slug: 'competencias-enem', descricao: 'Critérios de avaliação da redação do ENEM', ordem: 8 },
    ],
};
exports.assuntosPorMateria = assuntosPorMateria;
async function seedAssuntos() {
    console.log('Populando assuntos...');
    let criados = 0;
    let existentes = 0;
    let erros = 0;
    for (const [materiaSlug, assuntos] of Object.entries(assuntosPorMateria)) {
        // Buscar a matéria pelo slug
        const materia = await MateriaSchema_1.default.findOne({ slug: materiaSlug });
        if (!materia) {
            console.log(`  ✗ Matéria "${materiaSlug}" não encontrada. Execute seed:materias primeiro.`);
            erros++;
            continue;
        }
        console.log(`\n  ${materia.nome}:`);
        for (const assunto of assuntos) {
            const existe = await AssuntoSchema_1.default.findOne({
                materia_id: materia._id,
                slug: assunto.slug
            });
            if (!existe) {
                await AssuntoSchema_1.default.create({
                    ...assunto,
                    materia_id: materia._id
                });
                console.log(`    ✓ ${assunto.nome}`);
                criados++;
            }
            else {
                console.log(`    - ${assunto.nome} (já existe)`);
                existentes++;
            }
        }
    }
    console.log(`\nAssuntos: ${criados} criados, ${existentes} já existiam, ${erros} erros`);
    return { criados, existentes, erros };
}

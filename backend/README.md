# Banco de Questões - Backend

API REST para gerenciamento de banco de questões educacionais. Permite que professores cadastrem, organizem e busquem questões de diversos tipos e formatos.

## Tecnologias

- **Node.js** + **TypeScript**
- **Express 5** - Framework web
- **MongoDB** + **Mongoose** - Banco de dados
- **Jest** - Testes automatizados
- **Sharp** - Processamento de imagens

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas configurações
```

### Variáveis de Ambiente

```env
MONGODB_URI=mongodb://localhost:27017/banco_questoes
PORT=3000
```

## Scripts

```bash
npm run dev          # Desenvolvimento com hot-reload
npm run build        # Compilar TypeScript
npm start            # Produção
npm test             # Rodar testes

npm run seed         # Popular banco (matérias + assuntos)
npm run seed:materias    # Apenas matérias
npm run seed:assuntos    # Apenas assuntos
```

## Estrutura do Projeto

```
src/
├── config/          # Configurações (upload, rate limit)
├── controllers/     # Controladores das rotas
├── interfaces/      # Interfaces TypeScript
├── models/          # Schemas Mongoose
├── routes/          # Definição de rotas
├── seeds/           # Scripts para popular o banco
├── services/        # Lógica de negócio
├── db.ts            # Conexão MongoDB
└── server.ts        # Entrada da aplicação

tests/               # Testes automatizados
```

---

## API Endpoints

### Questões

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/questoes` | Criar questão |
| `GET` | `/api/questoes` | Listar com filtros e paginação |
| `GET` | `/api/questoes/:id` | Buscar por ID |
| `PUT` | `/api/questoes/:id` | Atualizar |
| `DELETE` | `/api/questoes/:id` | Desativar (soft delete) |
| `DELETE` | `/api/questoes/:id/permanente` | Remover permanentemente |
| `POST` | `/api/questoes/verificar-similaridade` | Verificar duplicatas |
| `GET` | `/api/questoes/estatisticas` | Estatísticas do banco |
| `GET` | `/api/questoes/aleatorias` | Questões aleatórias |
| `GET` | `/api/questoes/contagem` | Contagem com filtros |

### Matérias

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/materias` | Criar matéria |
| `GET` | `/api/materias` | Listar todas |
| `GET` | `/api/materias/:id` | Buscar por ID |
| `PUT` | `/api/materias/:id` | Atualizar |
| `DELETE` | `/api/materias/:id` | Remover |

### Assuntos

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/assuntos` | Criar assunto |
| `GET` | `/api/assuntos` | Listar todos |
| `GET` | `/api/assuntos/materia/:materiaId` | Listar por matéria |
| `GET` | `/api/assuntos/:id` | Buscar por ID |
| `PUT` | `/api/assuntos/:id` | Atualizar |
| `DELETE` | `/api/assuntos/:id` | Remover |

### Tópicos

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/topicos` | Criar tópico |
| `GET` | `/api/topicos` | Listar todos |
| `GET` | `/api/topicos/assunto/:assuntoId` | Listar por assunto |
| `GET` | `/api/topicos/:id` | Buscar por ID |
| `PUT` | `/api/topicos/:id` | Atualizar |
| `DELETE` | `/api/topicos/:id` | Remover |

### Textos Base

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/textos-base` | Criar texto base |
| `GET` | `/api/textos-base` | Listar todos |
| `GET` | `/api/textos-base/:id` | Buscar por ID |
| `PUT` | `/api/textos-base/:id` | Atualizar |
| `DELETE` | `/api/textos-base/:id` | Remover |

---

## Modelos

### Questão

```typescript
{
  // Campos preenchidos pelo professor
  enunciado: [
    { tipo: 'texto' | 'imagem', conteudo: string, ordem: number }
  ],
  assunto_ids: ObjectId[],        // Pode ter múltiplos assuntos
  topico_id?: ObjectId,           // Opcional
  tipo: 'multipla_escolha' | 'discursiva' | 'verdadeiro_falso',
  dificuldade: 'facil' | 'media' | 'dificil',
  texto_base_id?: ObjectId,       // Opcional
  alternativas?: [
    { letra: 'A'-'E', conteudo: string, correta: boolean }
  ],
  gabarito: string,               // Letra ou texto
  origem: {
    tipo: 'vestibular' | 'enem' | 'concurso' | 'olimpiada' | 'propria' | 'outro',
    nome?: string,
    ano?: number
  },

  // Campos do sistema (automáticos)
  conteudo_hash: string,          // Detecção de duplicatas
  texto_normalizado: string,      // Busca por similaridade
  ativa: boolean,
  criado_em: Date,
  atualizado_em: Date
}
```

### Matéria

```typescript
{
  nome: string,
  slug: string,      // URL-friendly, único
  cor?: string,      // Hex color para UI
  icone?: string,    // Nome do ícone
  ordem: number
}
```

### Assunto

```typescript
{
  nome: string,
  slug: string,
  materia_id: ObjectId,
  descricao?: string,
  ordem: number
}
```

### Tópico

```typescript
{
  nome: string,
  slug: string,
  assunto_id: ObjectId,
  descricao?: string,
  ordem: number
}
```

---

## Exemplos de Uso

### Criar Questão de Múltipla Escolha

```bash
POST /api/questoes
Content-Type: application/json

{
  "enunciado": [
    { "tipo": "texto", "conteudo": "Qual é a capital do Brasil?", "ordem": 1 }
  ],
  "assunto_ids": ["6750a1b2c3d4e5f6a7b8c9d0"],
  "tipo": "multipla_escolha",
  "dificuldade": "facil",
  "alternativas": [
    { "letra": "A", "conteudo": "São Paulo", "correta": false },
    { "letra": "B", "conteudo": "Rio de Janeiro", "correta": false },
    { "letra": "C", "conteudo": "Brasília", "correta": true },
    { "letra": "D", "conteudo": "Salvador", "correta": false }
  ],
  "gabarito": "C",
  "origem": { "tipo": "propria" }
}
```

### Criar Questão Discursiva

```bash
POST /api/questoes
Content-Type: application/json

{
  "enunciado": [
    { "tipo": "texto", "conteudo": "Explique o processo de fotossíntese.", "ordem": 1 }
  ],
  "assunto_ids": ["6750a1b2c3d4e5f6a7b8c9d1"],
  "tipo": "discursiva",
  "dificuldade": "media",
  "gabarito": "A fotossíntese é o processo pelo qual plantas convertem luz solar, água e CO2 em glicose e oxigênio.",
  "origem": { "tipo": "enem", "nome": "ENEM", "ano": 2023 }
}
```

### Criar Questão com Imagem

```bash
POST /api/questoes
Content-Type: application/json

{
  "enunciado": [
    { "tipo": "texto", "conteudo": "Observe a figura abaixo:", "ordem": 1 },
    { "tipo": "imagem", "conteudo": "https://exemplo.com/grafico.png", "ordem": 2 },
    { "tipo": "texto", "conteudo": "Qual é o valor de X?", "ordem": 3 }
  ],
  "assunto_ids": ["6750a1b2c3d4e5f6a7b8c9d2"],
  "tipo": "multipla_escolha",
  "dificuldade": "dificil",
  "alternativas": [
    { "letra": "A", "conteudo": "10", "correta": false },
    { "letra": "B", "conteudo": "15", "correta": true },
    { "letra": "C", "conteudo": "20", "correta": false }
  ],
  "gabarito": "B",
  "origem": { "tipo": "vestibular", "nome": "FUVEST", "ano": 2022 }
}
```

### Listar Questões com Filtros

```bash
GET /api/questoes?page=1&limit=20&tipo=multipla_escolha&dificuldade=media&assunto_ids=123
```

### Verificar Similaridade Antes de Criar

```bash
POST /api/questoes/verificar-similaridade?limiar=80
Content-Type: application/json

{
  "enunciado": [{ "tipo": "texto", "conteudo": "Qual é a capital do Brasil?", "ordem": 1 }],
  ...
}

# Resposta
{
  "temSimilar": true,
  "questoesSimilares": [
    { "questao_id": "...", "similaridade": 95, "tipo_match": "texto_similar" }
  ]
}
```

---

## Detecção de Duplicatas

O sistema detecta questões duplicadas de duas formas:

1. **Hash Exato**: Gera um SHA256 do conteúdo (enunciado + alternativas + gabarito). Questões idênticas são bloqueadas.

2. **Similaridade de Texto**: Usa o coeficiente de Jaccard para comparar textos. Questões com >90% de similaridade geram alerta.

### Desativar verificação

```bash
POST /api/questoes?verificarDuplicata=false
```

---

## Validações por Tipo

| Tipo | Regras |
|------|--------|
| **Múltipla Escolha** | 2-5 alternativas, exatamente 1 correta, gabarito A-E |
| **Verdadeiro/Falso** | Exatamente 2 alternativas |
| **Discursiva** | Sem alternativas, gabarito obrigatório |

---

## Seeds Disponíveis

### Matérias (12)
Matemática, Português, Física, Química, Biologia, História, Geografia, Inglês, Literatura, Filosofia, Sociologia, Redação

### Assuntos (107)
Cada matéria possui de 8 a 11 assuntos pré-cadastrados cobrindo os principais tópicos de vestibular.

```bash
# Popular tudo
npm run seed

# Ver assuntos de uma matéria específica
GET /api/assuntos/materia/:materiaId
```

---

## Testes

```bash
# Rodar todos os testes
npm test

# Testes cobrem:
# - Validação por tipo de questão
# - Detecção de duplicatas
# - Paginação e filtros
# - CRUD completo
# - Estatísticas
```

---

## Licença

ISC

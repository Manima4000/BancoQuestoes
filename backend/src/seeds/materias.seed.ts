import Materia from '../models/MateriaSchema';

const materias = [
    {
        nome: 'Matemática',
        slug: 'matematica',
        cor: '#3B82F6', // azul
        icone: 'calculator',
        ordem: 1
    },
    {
        nome: 'Português',
        slug: 'portugues',
        cor: '#EF4444', // vermelho
        icone: 'book-open',
        ordem: 2
    },
    {
        nome: 'Física',
        slug: 'fisica',
        cor: '#8B5CF6', // roxo
        icone: 'atom',
        ordem: 3
    },
    {
        nome: 'Química',
        slug: 'quimica',
        cor: '#10B981', // verde
        icone: 'flask',
        ordem: 4
    },
    {
        nome: 'Biologia',
        slug: 'biologia',
        cor: '#22C55E', // verde claro
        icone: 'leaf',
        ordem: 5
    },
    {
        nome: 'História',
        slug: 'historia',
        cor: '#F59E0B', // amarelo/laranja
        icone: 'landmark',
        ordem: 6
    },
    {
        nome: 'Geografia',
        slug: 'geografia',
        cor: '#06B6D4', // ciano
        icone: 'globe',
        ordem: 7
    },
    {
        nome: 'Inglês',
        slug: 'ingles',
        cor: '#EC4899', // rosa
        icone: 'languages',
        ordem: 8
    },
    {
        nome: 'Literatura',
        slug: 'literatura',
        cor: '#F97316', // laranja
        icone: 'book',
        ordem: 9
    },
    {
        nome: 'Filosofia',
        slug: 'filosofia',
        cor: '#6366F1', // indigo
        icone: 'brain',
        ordem: 10
    },
    {
        nome: 'Sociologia',
        slug: 'sociologia',
        cor: '#14B8A6', // teal
        icone: 'users',
        ordem: 11
    },
    {
        nome: 'Redação',
        slug: 'redacao',
        cor: '#64748B', // cinza azulado
        icone: 'pencil',
        ordem: 12
    }
];

export async function seedMaterias() {
    console.log('Populando matérias...');

    let criadas = 0;
    let existentes = 0;

    for (const materia of materias) {
        const existe = await Materia.findOne({ slug: materia.slug });

        if (!existe) {
            await Materia.create(materia);
            console.log(`  ✓ ${materia.nome} criada`);
            criadas++;
        } else {
            console.log(`  - ${materia.nome} já existe`);
            existentes++;
        }
    }

    console.log(`\nMatérias: ${criadas} criadas, ${existentes} já existiam`);
    return { criadas, existentes };
}

export { materias };

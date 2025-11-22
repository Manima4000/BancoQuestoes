import Origem from '../models/OrigemSchema';
import { TipoOrigem } from '../interfaces/IOrigem';

interface OrigemSeed {
    tipo: TipoOrigem;
    nome: string;
    informacoes_adicionais?: string;
}

const origens: OrigemSeed[] = [
    // === VESTIBULARES MILITARES ===
    { tipo: 'vestibular', nome: 'IME', informacoes_adicionais: 'Instituto Militar de Engenharia' },
    { tipo: 'vestibular', nome: 'ITA', informacoes_adicionais: 'Instituto Tecnológico de Aeronáutica' },
    { tipo: 'vestibular', nome: 'AFA', informacoes_adicionais: 'Academia da Força Aérea' },
    { tipo: 'vestibular', nome: 'ESA', informacoes_adicionais: 'Escola de Sargentos das Armas' },
    { tipo: 'vestibular', nome: 'EFOMM', informacoes_adicionais: 'Escola de Formação de Oficiais da Marinha Mercante' },
    { tipo: 'vestibular', nome: 'EsPCEx', informacoes_adicionais: 'Escola Preparatória de Cadetes do Exército' },
    { tipo: 'vestibular', nome: 'EN', informacoes_adicionais: 'Escola Naval' },
    { tipo: 'vestibular', nome: 'EPCAR', informacoes_adicionais: 'Escola Preparatória de Cadetes do Ar' },
    { tipo: 'vestibular', nome: 'Colégio Naval' },
    { tipo: 'vestibular', nome: 'EAM', informacoes_adicionais: 'Escola de Aprendizes-Marinheiros' },

    // === ENEM ===
    { tipo: 'enem', nome: 'ENEM' },

    // === VESTIBULARES TRADICIONAIS ===
    { tipo: 'vestibular', nome: 'FUVEST', informacoes_adicionais: 'USP' },
    { tipo: 'vestibular', nome: 'UNICAMP' },
    { tipo: 'vestibular', nome: 'UNESP' },
    { tipo: 'vestibular', nome: 'UERJ' },
    { tipo: 'vestibular', nome: 'UFF' },
    { tipo: 'vestibular', nome: 'UFRJ' },
    { tipo: 'vestibular', nome: 'UFMG' },
    { tipo: 'vestibular', nome: 'UFPR' },
    { tipo: 'vestibular', nome: 'UFRGS' },
    { tipo: 'vestibular', nome: 'UFSC' },
    { tipo: 'vestibular', nome: 'UFG' },
    { tipo: 'vestibular', nome: 'UFBA' },
    { tipo: 'vestibular', nome: 'UFPE' },
    { tipo: 'vestibular', nome: 'UFC' },
    { tipo: 'vestibular', nome: 'UnB' },
    { tipo: 'vestibular', nome: 'UFES' },
    { tipo: 'vestibular', nome: 'UNIFESP' },
    { tipo: 'vestibular', nome: 'UFSCar' },

    // === VESTIBULARES PARTICULARES ===
    { tipo: 'vestibular', nome: 'PUC-SP' },
    { tipo: 'vestibular', nome: 'PUC-RJ' },
    { tipo: 'vestibular', nome: 'PUC-MG' },
    { tipo: 'vestibular', nome: 'PUC-RS' },
    { tipo: 'vestibular', nome: 'PUC-PR' },
    { tipo: 'vestibular', nome: 'Mackenzie' },
    { tipo: 'vestibular', nome: 'FGV', informacoes_adicionais: 'Fundação Getúlio Vargas' },
    { tipo: 'vestibular', nome: 'INSPER' },
    { tipo: 'vestibular', nome: 'ESPM' },

    // === MEDICINA ===
    { tipo: 'vestibular', nome: 'Einstein', informacoes_adicionais: 'Faculdade Albert Einstein' },
    { tipo: 'vestibular', nome: 'Santa Casa' },

    // === OLIMPÍADAS ===
    { tipo: 'olimpiada', nome: 'OBM', informacoes_adicionais: 'Olimpíada Brasileira de Matemática' },
    { tipo: 'olimpiada', nome: 'OBF', informacoes_adicionais: 'Olimpíada Brasileira de Física' },
    { tipo: 'olimpiada', nome: 'OBQ', informacoes_adicionais: 'Olimpíada Brasileira de Química' },
    { tipo: 'olimpiada', nome: 'OBI', informacoes_adicionais: 'Olimpíada Brasileira de Informática' },
    { tipo: 'olimpiada', nome: 'OBA', informacoes_adicionais: 'Olimpíada Brasileira de Astronomia' },
    { tipo: 'olimpiada', nome: 'OBMEP', informacoes_adicionais: 'Olimpíada Brasileira de Matemática das Escolas Públicas' },
    { tipo: 'olimpiada', nome: 'OBB', informacoes_adicionais: 'Olimpíada Brasileira de Biologia' },
    { tipo: 'olimpiada', nome: 'ONHB', informacoes_adicionais: 'Olimpíada Nacional em História do Brasil' },
    { tipo: 'olimpiada', nome: 'OBR', informacoes_adicionais: 'Olimpíada Brasileira de Robótica' },

    // === CONCURSOS ===
    { tipo: 'concurso', nome: 'Colégio Pedro II' },
    { tipo: 'concurso', nome: 'CAp UERJ' },
    { tipo: 'concurso', nome: 'CEFET' },
    { tipo: 'concurso', nome: 'IFSP' },
    { tipo: 'concurso', nome: 'IFRJ' },
    { tipo: 'concurso', nome: 'IFMG' },

    // === LIVROS DIDÁTICOS ===
    { tipo: 'livro', nome: 'Halliday', informacoes_adicionais: 'Fundamentos de Física' },
    { tipo: 'livro', nome: 'Tipler', informacoes_adicionais: 'Física para Cientistas e Engenheiros' },
    { tipo: 'livro', nome: 'Sears & Zemansky', informacoes_adicionais: 'Física' },
    { tipo: 'livro', nome: 'Serway', informacoes_adicionais: 'Física' },
    { tipo: 'livro', nome: 'Guidorizzi', informacoes_adicionais: 'Um Curso de Cálculo' },
    { tipo: 'livro', nome: 'Stewart', informacoes_adicionais: 'Cálculo' },
    { tipo: 'livro', nome: 'Leithold', informacoes_adicionais: 'O Cálculo com Geometria Analítica' },
    { tipo: 'livro', nome: 'Atkins', informacoes_adicionais: 'Físico-Química' },
    { tipo: 'livro', nome: 'Feltre', informacoes_adicionais: 'Química' },
    { tipo: 'livro', nome: 'Usberco & Salvador', informacoes_adicionais: 'Química' },
    { tipo: 'livro', nome: 'Fundamentos da Matemática Elementar' },
    { tipo: 'livro', nome: 'Dante', informacoes_adicionais: 'Matemática' },
    { tipo: 'livro', nome: 'Iezzi', informacoes_adicionais: 'Matemática' },

    // === SIMULADOS ===
    { tipo: 'simulado', nome: 'Poliedro' },
    { tipo: 'simulado', nome: 'Objetivo' },
    { tipo: 'simulado', nome: 'Anglo' },
    { tipo: 'simulado', nome: 'Etapa' },
    { tipo: 'simulado', nome: 'Bernoulli' },
    { tipo: 'simulado', nome: 'SAS' },
    { tipo: 'simulado', nome: 'COC' },

    // === OUTROS ===
    { tipo: 'propria', nome: 'Questão Própria', informacoes_adicionais: 'Elaborada pelo professor' },
    { tipo: 'outro', nome: 'Outros' },
];

export async function seedOrigens(): Promise<void> {
    console.log('Iniciando seed de Origens...\n');

    let criadas = 0;
    let existentes = 0;

    for (const origem of origens) {
        const existe = await Origem.findOne({ nome: origem.nome });

        if (!existe) {
            await Origem.create(origem);
            console.log(`  + ${origem.nome} (${origem.tipo})`);
            criadas++;
        } else {
            existentes++;
        }
    }

    console.log(`\nOrigens: ${criadas} criadas, ${existentes} já existiam`);
}

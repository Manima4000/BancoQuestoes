export interface IAiBlocoEnunciado {
    tipo: 'texto' | 'imagem_pendente';
    conteudo: string;
    legenda?: string;
}

export interface IAiQuestaoRascunho {
    enunciado: IAiBlocoEnunciado[];
    materia?: string;
    assuntos?: string[];
    is_multiple_choice: boolean;
    dificuldade?: 'Fácil' | 'Médio' | 'Difícil' | 'Muito Difícil';
    gabarito?: string;
    alternativas?: { letra: string; texto: string }[];
}
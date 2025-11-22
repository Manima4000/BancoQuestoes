export interface IAiBlocoEnunciado {
    tipo: 'texto' | 'imagem_pendente';
    conteudo: string;
    legenda?: string;
}

export interface IAiBlocoAlternativa {
    letra: string;
    tipo: 'texto' | 'imagem_pendente';
    conteudo: string;
}

export interface IAiQuestaoRascunho {
    enunciado: IAiBlocoEnunciado[];
    materia?: string;
    assuntos?: string[];
    is_multiple_choice: boolean;
    dificuldade?: 'Fácil' | 'Médio' | 'Difícil' | 'Muito Difícil';
    gabarito?: string;
    alternativas?: IAiBlocoAlternativa
}

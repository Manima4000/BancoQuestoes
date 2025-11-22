interface IBlocoEnunciado {
    tipo: 'texto' | 'imagem';
    conteudo: string; 
    legenda?: string; 
}
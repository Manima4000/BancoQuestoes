interface IBlocoEnunciado {
    tipo: 'texto' | 'imagem';
    conteudo: string; // Se for texto, é o texto. Se for imagem, é a URL.
    legenda?: string; // Opcional para imagens
}
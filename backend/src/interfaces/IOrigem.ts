import { Document } from 'mongoose';

export type TipoOrigem = 'vestibular' | 'enem' | 'concurso' | 'olimpiada' | 'livro' | 'simulado' | 'propria' | 'outro';

export interface IOrigem extends Document {
    tipo: TipoOrigem;
    nome: string;                    // Ex: "FUVEST", "ENEM", "Fundamento de Física - Halliday"
    ano?: number;                    // Ano da prova/edição (opcional)
    informacoes_adicionais?: string; // Ex: "1ª Fase", "2ª Fase", "Capítulo 5", etc.
    ativa: boolean;
}

export interface IOrigemInput {
    tipo: TipoOrigem;
    nome: string;
    ano?: number;
    informacoes_adicionais?: string;
}

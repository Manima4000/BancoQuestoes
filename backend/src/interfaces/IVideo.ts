import mongoose, { Document } from 'mongoose';

export interface IVideo extends Document {
    titulo: string; 
    plataforma: 'YouTube' | 'Vimeo' | 'Drive';
    url: string;
    questao_id: mongoose.Types.ObjectId;
}
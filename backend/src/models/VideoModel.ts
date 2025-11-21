import mongoose, { Schema } from 'mongoose';
import { IVideo } from '../interfaces/IVideo';

const VideoSchema: Schema = new Schema({
    titulo: { type: String, required: true },
    plataforma: { type: String, required: true, enum: ['YouTube', 'Vimeo', 'Drive'] },
    url: { type: String, required: true },
    questao_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Questao', 
        required: true 
    }
}, { timestamps: true });

export default mongoose.model<IVideo>('Video', VideoSchema);
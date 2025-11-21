import Questao from "../models/QuestaoModel";
import { IQuestao } from "../interfaces/IQuestao";
import ListaAlternativas from "../models/ListaAlternativas";
import Video from "../models/VideoModel";

interface IQuestaoInput {
    enunciado: string;
    materia: string;
    is_multiple_choice: boolean;
    tipo: 'Exatas' | 'Humanas' | 'Biológicas';
    assuntos: string[];
    gabarito: string;
    dificuldade: 'Fácil' | 'Médio' | 'Difícil';
    origem?: {
        tipo?: 'Vestibular' | 'Livro' | 'Simulado' | 'Outro';
        nome_fonte?: string;
        ano?: number;
        detalhe?: string;
    };
    alternativas?: { letra: string; texto: string }[]; 
    video?: { titulo: string; plataforma: string; url: string };
    [key: string]: any; 
}

class QuestaoService {
    
    async create(data: IQuestaoInput): Promise<IQuestao> {

        if (data.is_multiple_choice) {
            if (!data.alternativas || data.alternativas.length < 2) {
                throw new Error("Questões de múltipla escolha devem ter pelo menos 2 alternativas.");
            }
        }
        
        let listaId = null;
        
        // 1. Criação da Lista de Alternativas (Se For Múltipla Escolha)
        if (data.is_multiple_choice && data.alternativas) {
            const novaLista = await ListaAlternativas.create({
                alternativas: data.alternativas
            });
            listaId = novaLista._id;
        }

        // 2. Criação da Questão (Passo Inicial)
        const novaQuestao = new Questao({
            ...data, // Copia enunciado, gabarito, origem, etc.
            lista_alternativas_id: listaId, // Vincula a lista criada acima (ou null)
        });

        const questaoSalva = await novaQuestao.save();

        // 3. Tratamento de Vídeo (Linkagem Bidirecional)
        if (data.video) {
            // Cria o vídeo apontando para a questão criada
            const novoVideo = await Video.create({
                titulo: data.video.titulo || `Resolução - ${data.enunciado.substring(0, 20)}...`,
                plataforma: data.video.plataforma,
                url: data.video.url,
                questao_id: questaoSalva._id // 👈 O Vídeo aponta para a Questão
            });

            //Atualiza a questão para apontar para o vídeo
            questaoSalva.video_resolucao_id = novoVideo._id as any; 
            await questaoSalva.save(); 
        }

        return questaoSalva;
    }

    async findAll() {
        return await Questao.find()
            .populate('lista_alternativas_id') // Traz as alternativas reais, não só o ID
            .populate('video_resolucao_id');   // Traz os dados do vídeo
    }

    async delete(id: string): Promise<void> {
        const questao = await Questao.findById(id);

        if (!questao) {
            throw new Error("Questão não encontrada para exclusão.");
        }

        if (questao.lista_alternativas_id) {
            await ListaAlternativas.findByIdAndDelete(questao.lista_alternativas_id);
        }

        if (questao.video_resolucao_id) {
            await Video.findByIdAndDelete(questao.video_resolucao_id);
        }

        await Questao.findByIdAndDelete(id);
    }

    async addVideo(questaoId: string, videoData: { titulo: string; plataforma: any; url: string }): Promise<any> {
        
        const questao = await Questao.findById(questaoId);
        if (!questao) {
            throw new Error("Questão não encontrada.");
        }

        if (questao.video_resolucao_id) {
            await Video.findByIdAndDelete(questao.video_resolucao_id);
        }

        const novoVideo = await Video.create({
            titulo: videoData.titulo || `Resolução - Questão ${questaoId}`,
            plataforma: videoData.plataforma,
            url: videoData.url, // Mapeamento url -> url_ou_id
            questao_id: questao._id
        });

        questao.video_resolucao_id = novoVideo._id as any;
        await questao.save();

        return novoVideo;
    }
}

export default new QuestaoService();

require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  try {
    // Tenta listar os modelos
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();
    
    console.log("=== MODELOS DISPONÍVEIS PARA SUA CHAVE ===");
    if (data.models) {
        data.models.forEach(m => {
            if (m.name.includes('gemini')) {
                console.log(`Nome: ${m.name.replace('models/', '')}`);
                console.log(`Métodos: ${m.supportedGenerationMethods}`);
                console.log('-------------------');
            }
        });
    } else {
        console.log("Nenhum modelo encontrado ou erro de permissão.", data);
    }

  } catch (error) {
    console.error("Erro ao listar:", error);
  }
}

listModels();
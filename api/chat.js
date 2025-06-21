// Importa a biblioteca da OpenAI
import { OpenAI } from 'openai';

// Configura a conexão com a OpenAI usando sua chave
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // ← Esta chave vem do Vercel
});

// Função principal que processa as mensagens
export default async function handler(req, res) {
  // Verifica se é uma requisição POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    // Cria a conversa com a IA
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Pode mudar para "gpt-4" se quiser
      messages: [
        {
          role: "system",
          content: "Você é um assistente de IA útil e prestativo."
        },
        {
          role: "user",
          content: req.body.message // Mensagem do usuário
        }
      ],
      temperature: 0.7 // Controla a criatividade (0-1)
    });

    // Retorna a resposta da IA
    res.status(200).json({ 
      response: completion.choices[0].message.content 
    });

  } catch (error) {
    // Tratamento de erros
    console.error("Erro na OpenAI:", error);
    res.status(500).json({ 
      error: "Erro ao processar sua mensagem",
      details: error.message 
    });
  }
}

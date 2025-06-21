import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { message } = req.body;
    
    if (!message || message.trim() === '') {
      return res.status(400).json({ error: 'Mensagem não pode estar vazia' });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Você é um assistente de IA útil e educado. Responda em português."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7
    });

    const aiResponse = completion.choices[0]?.message?.content;
    
    if (!aiResponse) {
      throw new Error('A OpenAI não retornou uma resposta válida');
    }

    return res.status(200).json({ 
      response: aiResponse 
    });

  } catch (error) {
    console.error("Erro na API:", error);
    return res.status(500).json({ 
      error: 'Erro interno ao processar sua mensagem',
      details: process.env.NODE_ENV === 'development' ? error.message : null
    });
  }
}

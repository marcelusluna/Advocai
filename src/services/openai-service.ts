interface OpenAICompletionRequest {
  model: string;
  messages: Array<{
    role: string;
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
}

interface OpenAICompletionResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// Chave da API OpenAI - em um ambiente de produção, isso seria armazenado de forma segura
const OPENAI_API_KEY = "sua-chave-api-aqui";

export const generateWithOpenAI = async (
  prompt: string,
  systemPrompt: string = "Você é um advogado experiente especializado em redigir documentos jurídicos precisos e profissionais."
): Promise<string> => {
  try {
    const payload: OpenAICompletionRequest = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Erro na API da OpenAI: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json() as OpenAICompletionResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao gerar texto com OpenAI:", error);
    throw error;
  }
};

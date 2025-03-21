interface OpenAICompletionRequest {
  model: string;
  messages: {
    role: "system" | "user" | "assistant";
    content: string;
  }[];
  temperature?: number;
  max_tokens?: number;
}

interface OpenAICompletionResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

// A chave da API deve ser fornecida por variável de ambiente
// Nunca armazene chaves diretamente no código
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "SUA_CHAVE_API_AQUI";

export const generateWithOpenAI = async (
  prompt: string,
  systemPrompt: string = "Você é um assistente jurídico especializado em direito brasileiro. Suas respostas devem ser precisas e formais.",
  temperature: number = 0.3
): Promise<string> => {
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
    temperature,
    max_tokens: 4096
  };

  try {
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

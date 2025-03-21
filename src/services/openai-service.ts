// Tipagem para variáveis de ambiente
interface ImportMetaEnv {
  VITE_OPENAI_API_KEY: string;
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

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

// A chave da API é fornecida por variável de ambiente
// Nunca armazene chaves diretamente no código
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "";

// Modelos disponíveis
export const OPENAI_MODELS = {
  GPT_3_5_TURBO: "gpt-3.5-turbo",
  GPT_4_TURBO: "gpt-4-turbo-preview",
  GPT_4: "gpt-4"
};

export const generateWithOpenAI = async (
  prompt: string,
  systemPrompt: string = "Você é um assistente jurídico especializado em direito brasileiro. Suas respostas devem ser precisas e formais.",
  temperature: number = 0.3,
  model: string = OPENAI_MODELS.GPT_3_5_TURBO
): Promise<string> => {
  if (!OPENAI_API_KEY) {
    throw new Error("Chave da API OpenAI não configurada. Verifique suas variáveis de ambiente.");
  }

  const payload: OpenAICompletionRequest = {
    model: model,
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

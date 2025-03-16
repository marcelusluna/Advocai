
import React, { useState } from "react";
import { MessageSquareText, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! Sou o assistente virtual do AdvocCase. Como posso ajudar você hoje?",
      timestamp: new Date()
    }
  ]);

  const toggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Adiciona mensagem do usuário
    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simula resposta do assistente após um pequeno delay
    setTimeout(() => {
      const assistantResponse = getAIResponse(input);
      setMessages(prev => [...prev, assistantResponse]);
    }, 1000);
  };

  // Função para gerar respostas baseadas em palavras-chave
  const getAIResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase();
    let response = "Não entendi completamente sua dúvida. Poderia reformular?";

    if (lowerQuery.includes("processo") || lowerQuery.includes("caso")) {
      response = "Para gerenciar processos, acesse a seção 'Processos' no menu lateral. Lá você pode adicionar novos casos, acompanhar andamentos e definir prazos importantes.";
    } else if (lowerQuery.includes("cliente") || lowerQuery.includes("cadastro")) {
      response = "Na seção 'Clientes', você pode cadastrar e gerenciar todas as informações de seus clientes, incluindo histórico de contratações e documentos.";
    } else if (lowerQuery.includes("documento") || lowerQuery.includes("contrato")) {
      response = "Para gerenciar documentos e contratos, utilize as seções específicas no menu lateral. Você pode criar, editar e assinar documentos diretamente na plataforma. Temos também um gerador de documentos baseado em IA na seção 'Documentos'.";
    } else if (lowerQuery.includes("honorário") || lowerQuery.includes("pagamento") || lowerQuery.includes("cobrança")) {
      response = "A gestão de honorários é feita na seção 'Honorários'. Você pode configurar valores, gerar cobranças e acompanhar pagamentos de seus clientes.";
    } else if (lowerQuery.includes("prazo") || lowerQuery.includes("data")) {
      response = "Para não perder prazos importantes, utilize o calendário na seção 'Dashboard' ou a gestão de tarefas em cada processo específico.";
    } else if (lowerQuery.includes("petição") || lowerQuery.includes("gerar documento")) {
      response = "Para criar uma nova petição ou qualquer documento jurídico, acesse a seção 'Documentos' e clique em 'Gerador de Documentos'. Lá você pode utilizar nossos modelos pré-definidos ou a IA para criar documentos personalizados.";
    } else if (lowerQuery.includes("modelo") || lowerQuery.includes("template")) {
      response = "Temos vários modelos de documentos disponíveis no sistema. Acesse a seção 'Documentos' para ver todos os templates disponíveis e usá-los para criar novos documentos.";
    } else if (lowerQuery.includes("gerar") || lowerQuery.includes("criar com ia")) {
      response = "Para gerar conteúdo com IA, acesse o 'Gerador de Documentos' na seção 'Documentos'. Lá você pode fornecer instruções para a IA criar petições, contratos e outros documentos jurídicos personalizados.";
    } else if (lowerQuery.includes("ajuda") || lowerQuery.includes("tutorial")) {
      response = "Estou aqui para ajudar! Posso tirar dúvidas sobre qualquer funcionalidade do AdvocCase. Basta me perguntar sobre clientes, processos, documentos, contratos ou honorários.";
    }

    return {
      role: "assistant",
      content: response,
      timestamp: new Date()
    };
  };

  return (
    <>
      {/* Botão flutuante para abrir o assistente */}
      <Button
        onClick={toggleAssistant}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquareText className="h-6 w-6" />
        )}
      </Button>

      {/* Painel do assistente */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-80 md:w-96 bg-card rounded-lg border border-border shadow-lg transition-all duration-300 ease-in-out z-50",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h3 className="font-medium">Assistente AdvocCase</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleAssistant}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Área de mensagens */}
        <div className="h-80 overflow-y-auto p-3 flex flex-col gap-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "p-3 rounded-lg max-w-[85%]",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-muted border border-border"
              )}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}
        </div>

        {/* Área de input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-border">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="min-h-[40px] max-h-28"
            />
            <Button type="submit" size="icon" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AiAssistant;

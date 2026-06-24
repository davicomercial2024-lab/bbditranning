import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Bot, User, Loader2 } from "lucide-react";
import { askAdminOracleFn } from "@/lib/api/ai.functions";
import { getPortalDataFn } from "@/lib/api/data.functions";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function AdminOracle() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Olá, Admin! Eu sou o **Oráculo BBDI**. Tenho visão completa sobre seus alunos, departamentos e treinamentos. O que você gostaria de saber?`
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [portalContext, setPortalContext] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Carrega o contexto apenas quando o admin abrir o oráculo pela primeira vez
  useEffect(() => {
    if (isOpen && !portalContext) {
      getPortalDataFn().then(data => {
        setPortalContext(JSON.stringify(data));
      }).catch(err => {
        console.error("Failed to load portal context for Oracle", err);
        setPortalContext("{}"); // Fallback
      });
    }
  }, [isOpen, portalContext]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      // Se por algum motivo o contexto ainda não carregou, aguarda. Idealmente carregaria num suspense/loading.
      let context = portalContext;
      if (!context) {
         const data = await getPortalDataFn();
         context = JSON.stringify(data);
         setPortalContext(context);
      }

      const response = await askAdminOracleFn({ data: { question: userMsg, portalContext: context } });
      
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: response 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: "assistant", 
        content: "Desculpe, ocorreu um erro ao consultar os dados. Tente novamente." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-600/30 transition-transform hover:scale-110 active:scale-95"
        title="Oráculo BBDI"
      >
        <Sparkles className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:bottom-6 sm:right-24">
          <div className="flex items-center justify-between border-b border-border bg-violet-600 p-4 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Oráculo BBDI</span>
                <span className="text-[10px] text-violet-200">Visão Geral do Portal</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="rounded-full p-1 hover:bg-white/20 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-violet-600/20 text-violet-500"}`}>
                  {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={`rounded-xl px-4 py-2 text-sm break-words whitespace-pre-wrap ${msg.role === "user" ? "bg-primary text-primary-foreground max-w-[75%]" : "bg-muted text-foreground border border-border w-full"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600/20 text-violet-500">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-xl px-4 py-2 text-sm bg-muted text-foreground border border-border flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Analisando os dados...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-border bg-card p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={!portalContext ? "Carregando contexto..." : "O que você deseja saber?"}
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none focus:border-violet-500"
              disabled={isLoading || !portalContext}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading || !portalContext}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white disabled:opacity-50 hover:bg-violet-700 transition-colors"
            >
              <Send className="h-4 w-4 ml-0.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

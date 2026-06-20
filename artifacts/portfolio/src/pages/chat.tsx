import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Loader2, Sparkles, RefreshCw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const STORAGE_KEY = "jarvis_conv_id";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

const SUGGESTED_QUESTIONS = [
  "What is Siddhant currently working on at AWS?",
  "Tell me about the multi-agent AI system Siddhant built.",
  "What are Siddhant's strongest technical skills?",
  "How did Siddhant improve grant writing success rates by 85%?",
  "What projects has Siddhant worked on involving LLMs or RAG?",
  "Where did Siddhant study and what were his grades?",
];

const apiBase = () =>
  (import.meta.env.VITE_API_URL ?? import.meta.env.BASE_URL).replace(/\/$/, "");

export default function Chat() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createConversation = useCallback(async () => {
    setIsCreating(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase()}/api/openai/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to create conversation");
      const data = await res.json() as { id: string };
      localStorage.setItem(STORAGE_KEY, data.id);
      setConversationId(data.id);
      setMessages([]);
    } catch {
      setError("Could not start a conversation. Please try again.");
    } finally {
      setIsCreating(false);
    }
  }, []);

  const loadConversation = useCallback(async (id: string) => {
    setIsCreating(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase()}/api/openai/conversations/${id}/messages`);
      if (res.status === 404 || res.status === 400) {
        localStorage.removeItem(STORAGE_KEY);
        await createConversation();
        return;
      }
      if (!res.ok) throw new Error("Failed to load history");
      const data = await res.json() as { id: number; role: string; content: string }[];
      setConversationId(id);
      setMessages(
        data.map((m) => ({
          id: String(m.id),
          role: m.role as "user" | "assistant",
          content: m.content,
        }))
      );
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      await createConversation();
    } finally {
      setIsCreating(false);
    }
  }, [createConversation]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      loadConversation(stored);
    } else {
      createConversation();
    }
  }, [createConversation, loadConversation]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !conversationId || isLoading) return;
    setInput("");
    setError(null);

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
    };

    const assistantMsgId = crypto.randomUUID();
    const assistantMsg: Message = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      streaming: true,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setIsLoading(true);

    try {
      const res = await fetch(
        `${apiBase()}/api/openai/conversations/${conversationId}/messages`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: content.trim() }),
        }
      );

      if (!res.ok) throw new Error("Failed to send message");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      if (!reader) throw new Error("No response body");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const rawData = line.slice(6).trim();
          if (!rawData) continue;

          try {
            const data = JSON.parse(rawData);
            if (data.content) {
              fullContent += data.content;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId
                    ? { ...m, content: fullContent, streaming: true }
                    : m
                )
              );
            }
            if (data.done) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsgId ? { ...m, streaming: false } : m
                )
              );
            }
          } catch {
          }
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setMessages((prev) => prev.filter((m) => m.id !== assistantMsgId));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestion = (q: string) => {
    sendMessage(q);
  };

  const resetChat = () => {
    localStorage.removeItem(STORAGE_KEY);
    createConversation();
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100dvh-160px)] md:h-[calc(100vh-180px)] min-h-[450px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="neo-card p-4 sm:p-5 mb-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="neo-inset p-3 rounded-xl shrink-0">
            <Sparkles className="w-5 h-5 gradient-stroke" />
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-lg text-foreground">Jarvis</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Siddhant's AI assistant — ask me anything about his work, skills, or background</p>
            <p className="text-xs text-muted-foreground sm:hidden">Ask me about Siddhant's work</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Online</span>
          </div>
          <button
            onClick={resetChat}
            className="neo-btn p-2 text-muted-foreground hover:text-primary transition-colors"
            title="New conversation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 scrollbar-thin">
        {isCreating && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        )}

        {!isCreating && messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="neo-card p-8 text-center">
              <div className="neo-inset w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 gradient-stroke" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Hi, I'm Jarvis</h3>
              <p className="text-sm text-muted-foreground">
                Siddhant's AI assistant. Ask me anything about his experience, projects, skills, or background — I'll give you accurate, detailed answers.
              </p>
            </div>
            <p className="text-xs text-muted-foreground text-center font-medium uppercase tracking-wider">Try asking</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUGGESTED_QUESTIONS.map((q) => (
                <motion.button
                  key={q}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSuggestion(q)}
                  className="neo-btn p-4 text-left text-sm text-muted-foreground hover:text-foreground transition-colors leading-snug"
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`neo-inset p-2.5 rounded-xl h-fit shrink-0 ${msg.role === "user" ? "text-secondary" : "text-primary"}`}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>
              <div className="neo-card px-4 py-3 sm:px-5 sm:py-4 max-w-[88%] sm:max-w-[80%] text-sm leading-relaxed text-foreground">
                {msg.role === "assistant" && msg.content ? (
                  <>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="leading-snug">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-primary">{children}</strong>,
                        h3: ({ children }) => <h3 className="font-semibold text-foreground mt-3 mb-1">{children}</h3>,
                        code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                    {msg.streaming && <span className="inline-block w-2 h-4 bg-primary animate-pulse rounded-sm ml-0.5 align-text-bottom" />}
                  </>
                ) : (
                  <>
                    {msg.content || (msg.streaming && <span className="inline-block w-2 h-4 bg-primary animate-pulse rounded-sm" />)}
                    {msg.streaming && msg.content && (
                      <span className="inline-block w-2 h-4 bg-primary animate-pulse rounded-sm ml-0.5 align-text-bottom" />
                    )}
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="neo-card p-4 text-center text-sm text-red-400"
          >
            {error}
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="neo-card p-3 flex items-center gap-3"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Siddhant's experience, projects, or skills..."
          disabled={isLoading || isCreating}
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground px-3 py-2 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading || isCreating}
          className="neo-btn p-3 text-primary hover:text-primary/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </motion.form>
    </div>
  );
}

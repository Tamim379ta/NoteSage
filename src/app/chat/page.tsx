"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  HiOutlinePaperAirplane,
  HiOutlineSparkles,
  HiOutlineBookOpen,
  HiOutlineTrash,
  HiOutlineDocumentText,
  HiOutlineChatBubbleBottomCenterText,
} from "react-icons/hi2";
import { useSession } from "@/lib/auth-client";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  "Summarize the key concepts from my notes",
  "What are the most important points I should remember?",
  "Explain the hardest concept in simple terms",
  "What should I focus on for an exam?",
];

function ChatContent() {
  const searchParams = useSearchParams();
  const documentId = searchParams.get("documentId");
  const { data: session } = useSession();
  const userId = (session?.user as any)?.id || "demo-user-id";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [docTitle, setDocTitle] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const userIsNearBottomRef = useRef<boolean>(true);

  useEffect(() => {
    if (!documentId) return;
    async function fetchDocTitle() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents/public/${documentId}`
        );
        const data = await res.json();
        setDocTitle(data.title);
      } catch {
        // ignore
      }
    }
    fetchDocTitle();
  }, [documentId]);

  // Handle user scroll detection
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    userIsNearBottomRef.current = scrollHeight - scrollTop - clientHeight < 100;
  };

  // Controlled scroll to bottom ONLY if messages exist and user is near bottom
  useEffect(() => {
    if (messages.length > 0 && userIsNearBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 128)}px`;
    }
  }, [input]);

  async function sendMessage(content: string) {
    if (!content.trim() || loading) return;

    const userMessage: Message = { role: "user", content };

    // Force scroll down when sending a new message
    userIsNearBottomRef.current = true;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": userId,
          },
          body: JSON.stringify({
            message: content,
            sessionId,
            documentId: documentId || undefined,
          }),
        }
      );

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const parsed = JSON.parse(line.replace("data: ", ""));

            if (parsed.text) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: updated[updated.length - 1].content + parsed.text,
                };
                return updated;
              });
            }

            if (parsed.sessionId) {
              setSessionId(parsed.sessionId);
            }

            if (parsed.error) {
              throw new Error(parsed.error);
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function clearChat() {
    setMessages([]);
    setSessionId(null);
  }

  return (
    <main className="flex flex-col h-[calc(100vh-65px)] bg-neutral-bg/50 overflow-hidden">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-neutral-border px-6 py-3 flex items-center justify-between flex-shrink-0 sticky top-0 z-10 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-xs">
            <HiOutlineSparkles size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-neutral-text">NoteSage AI</p>
            </div>
            {docTitle ? (
              <p className="text-xs text-primary font-medium flex items-center gap-1 mt-0.5">
                <HiOutlineDocumentText size={12} />
                Chatting about: <span className="font-semibold">{docTitle}</span>
              </p>
            ) : (
              <p className="text-xs text-neutral-text/50">
                Ask anything about your study materials
              </p>
            )}
          </div>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={clearChat}
            className="flex items-center gap-1.5 text-xs text-neutral-text/50 hover:text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-all"
          >
            <HiOutlineTrash size={14} />
            Clear chat
          </button>
        )}
      </div>

      {/* Document context banner */}
      {documentId && docTitle && messages.length === 0 && (
        <div className="bg-primary/5 border-b border-primary/10 px-6 py-2 flex items-center gap-2 flex-shrink-0">
          <HiOutlineDocumentText size={15} className="text-primary flex-shrink-0" />
          <p className="text-xs text-primary/90">
            Context Active: NoteSage is grounded in <span className="font-semibold">{docTitle}</span>
          </p>
        </div>
      )}

      {/* Messages / Welcome Section */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-6"
      >
        {messages.length === 0 ? (
          <FadeUp className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto py-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20 shadow-xs">
              <HiOutlineBookOpen size={26} />
            </div>
            <h2 className="text-lg font-bold text-neutral-text mb-1">
              {docTitle ? `Ask about "${docTitle}"` : "How can I help with your studies today?"}
            </h2>
            <p className="text-xs text-neutral-text/60 max-w-md mb-6 leading-relaxed">
              {docTitle
                ? "I have full context of this document. Ask me to explain concepts, summarize key points, or clarify confusing topics."
                : "Ask me to explain difficult concepts, summarize topics, or help you understand complex parts of your notes."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="text-left text-xs font-medium text-neutral-text/80 border border-neutral-border bg-white rounded-xl p-3.5 hover:border-primary/50 hover:bg-primary/[0.02] hover:text-primary transition-all shadow-xs group flex items-start gap-2.5"
                >
                  <HiOutlineChatBubbleBottomCenterText size={16} className="text-neutral-400 group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </FadeUp>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center flex-shrink-0 mr-3 mt-1 shadow-xs">
                    <HiOutlineSparkles size={15} />
                  </div>
                )}

                <div
                  className={`max-w-[82%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-xs ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-tr-xs"
                      : "bg-white border border-neutral-border text-neutral-text rounded-tl-xs"
                  }`}
                >
                  {msg.content === "" && loading ? (
                    <span className="flex gap-1.5 items-center py-1 px-1">
                      <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:300ms]" />
                    </span>
                  ) : (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Footer */}
      <div className="bg-white border-t border-neutral-border px-4 md:px-6 py-3 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              docTitle
                ? `Ask about "${docTitle}"...`
                : "Ask anything about your notes... (Enter to send)"
            }
            rows={1}
            className="flex-1 border border-neutral-border rounded-xl px-4 py-2.5 text-sm bg-neutral-bg/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-all"
          />
          <button
            type="button"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-all disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0 shadow-xs"
          >
            <HiOutlinePaperAirplane size={16} />
          </button>
        </div>
        <p className="text-center text-[10px] text-neutral-text/40 mt-1.5">
          NoteSage AI can make mistakes. Verify important study details.
        </p>
      </div>
    </main>
  );
}

export default function ChatPage() {
  return (
    <ProtectedRoute>
      <Suspense
        fallback={
          <div className="flex flex-col h-[calc(100vh-65px)] bg-neutral-bg/50 animate-pulse items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-neutral-200" />
          </div>
        }
      >
        <ChatContent />
      </Suspense>
    </ProtectedRoute>
  );
}
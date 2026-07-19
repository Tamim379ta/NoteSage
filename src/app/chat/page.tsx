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

// 1. Content component focuses entirely on the UI and chat state logic
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
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  async function sendMessage(content: string) {
    if (!content.trim() || loading) return;

    const userMessage: Message = { role: "user", content };
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
    <main className="flex flex-col h-[calc(100vh-65px)] bg-neutral-bg">
      {/* Header */}
      <div className="bg-white border-b border-neutral-border px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <HiOutlineSparkles size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-text">NoteSage AI</p>
            {docTitle ? (
              <p className="text-xs text-primary flex items-center gap-1">
                <HiOutlineDocumentText size={11} />
                Chatting about: {docTitle}
              </p>
            ) : (
              <p className="text-xs text-neutral-text/40">
                Ask me anything about your study material
              </p>
            )}
          </div>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={clearChat}
            className="flex items-center gap-1.5 text-xs text-neutral-text/40 hover:text-red-500 transition-colors"
          >
            <HiOutlineTrash size={14} />
            Clear chat
          </button>
        )}
      </div>

      {/* Document context banner */}
      {documentId && docTitle && messages.length === 0 && (
        <div className="bg-primary/5 border-b border-primary/10 px-6 py-3 flex items-center gap-2">
          <HiOutlineDocumentText size={14} className="text-primary" />
          <p className="text-xs text-primary">
            AI has full context of{" "}
            <span className="font-semibold">{docTitle}</span> — ask anything
            about it.
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.length === 0 ? (
          <FadeUp className="flex flex-col items-center justify-center h-full text-center pb-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <HiOutlineBookOpen size={28} />
            </div>
            <h2 className="text-lg font-bold text-neutral-text mb-2">
              {docTitle ? `Ask me about "${docTitle}"` : "Your AI study tutor"}
            </h2>
            <p className="text-sm text-neutral-text/50 max-w-sm mb-8">
              {docTitle
                ? "I have full context of this document. Ask me to explain concepts, summarize topics, or clarify anything confusing."
                : "Ask me to explain concepts, quiz you, summarize topics, or help you understand anything from your notes."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="text-left text-sm text-neutral-text/70 border border-neutral-border bg-white rounded-xl px-4 py-3 hover:border-primary hover:text-primary transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </FadeUp>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                  <HiOutlineSparkles size={14} />
                </div>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-tr-sm"
                    : "bg-white border border-neutral-border text-neutral-text rounded-tl-sm"
                }`}
              >
                {msg.content === "" && loading ? (
                  <span className="flex gap-1 items-center py-1">
                    <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce [animation-delay:300ms]" />
                  </span>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t border-neutral-border px-6 py-4 flex-shrink-0">
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
            className="flex-1 border border-neutral-border rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none max-h-32 overflow-y-auto"
          />
          <button
            type="button"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
          >
            <HiOutlinePaperAirplane size={16} />
          </button>
        </div>
        <p className="text-center text-xs text-neutral-text/30 mt-2">
          NoteSage AI can make mistakes. Verify important information.
        </p>
      </div>
    </main>
  );
}

// 2. Wrap ProtectedRoute on the outside, then Suspense on the inside
export default function ChatPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={
        <div className="flex flex-col h-[calc(100vh-65px)] bg-neutral-bg animate-pulse items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-neutral-200" />
        </div>
      }>
        <ChatContent />
      </Suspense>
    </ProtectedRoute>
  );
}
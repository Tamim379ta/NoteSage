"use client";

import { useState, useRef, useEffect } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  HiOutlinePaperAirplane,
  HiOutlineSparkles,
  HiOutlineBookOpen,
  HiOutlineTrash,
} from "react-icons/hi2";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";


interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  "Summarize the key concepts from my notes",
  "Quiz me on the most important topics",
  "Explain the hardest concept in simple terms",
  "What should I focus on for an exam?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto resize textarea
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

    // Add empty assistant message to stream into
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-user-id": "demo-user-id",
          },
          body: JSON.stringify({
            message: content,
            sessionId,
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
              // Append streamed text to last assistant message
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
     <ProtectedRoute>
    <main className="flex flex-col h-[calc(100vh-65px)] bg-neutral-bg">
      {/* Header */}
      <div className="bg-white border-b border-neutral-border px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <HiOutlineSparkles size={18} />
          </div>
          <div>
            <p className="text-sm font-bold text-neutral-text">NoteSage AI</p>
            <p className="text-xs text-neutral-text/40">
              Ask me anything about your study material
            </p>
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.length === 0 ? (
          <FadeUp className="flex flex-col items-center justify-center h-full text-center pb-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
              <HiOutlineBookOpen size={28} />
            </div>
            <h2 className="text-lg font-bold text-neutral-text mb-2">
              Your AI study tutor
            </h2>
            <p className="text-sm text-neutral-text/50 max-w-sm mb-8">
              Ask me to explain concepts, quiz you, summarize topics, or help
              you understand anything from your notes.
            </p>

            {/* Suggested prompts */}
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
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
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
            placeholder="Ask anything about your notes... (Enter to send, Shift+Enter for new line)"
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
    </ProtectedRoute>
  );
}
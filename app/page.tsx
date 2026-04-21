"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const STARTER_QUESTIONS = [
  "What is the Vertical AI Moat Stack?",
  "How do VC fund economics work?",
  "What's the Series A gap?",
  "Why do emerging managers outperform?",
  "What should founders know about term sheets?",
  "How are LPs evaluating funds right now?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + chunk }
                : m
            )
          );
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content:
                  "Sorry, something went wrong. Please try again.",
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/book-cover.png"
              alt="The Value Add VC"
              width={36}
              height={48}
              className="rounded shadow-lg"
            />
            <div>
              <h1 className="text-sm font-bold leading-tight">
                Ask the Value Add VC Book
              </h1>
              <p className="text-xs text-gray-400">
                AI-powered Q&A from 22 chapters
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://value-add-vc-book.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
            >
              Download Free
            </a>
            <a
              href="https://www.amazon.com/dp/B0GS6Z4B6Q"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-colors"
            >
              Amazon Paperback
            </a>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <Image
                src="/book-cover.png"
                alt="The Value Add VC"
                width={120}
                height={160}
                className="rounded-lg shadow-2xl mx-auto mb-6"
              />
              <h2 className="text-2xl font-bold mb-2">
                Ask anything about{" "}
                <span className="text-cyan-400">The Value Add VC</span>
              </h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                22 chapters on fundraising, fund economics, and venture capital
                in the AI era — by Trace Cohen
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="glass rounded-xl px-4 py-3 text-left text-sm text-gray-300 hover:text-white hover:border-cyan-500/30 transition-all hover:bg-white/[0.08]"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
              <a
                href="https://value-add-vc-book.vercel.app/"
                target="_blank"
                className="hover:text-cyan-400 transition-colors"
              >
                Download the Book
              </a>
              <span>|</span>
              <a
                href="https://www.amazon.com/dp/B0GS6Z4B6Q"
                target="_blank"
                className="hover:text-cyan-400 transition-colors"
              >
                Get the Paperback
              </a>
              <span>|</span>
              <a
                href="https://buy.stripe.com/5kQ28k1g9b9Sf1M2gZ6g800"
                target="_blank"
                className="hover:text-cyan-400 transition-colors"
              >
                Support the Author ($9.99)
              </a>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4 pb-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`animate-fade-in flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-cyan-500/15 border border-cyan-500/20 text-white"
                      : "glass text-gray-200"
                  }`}
                >
                  {m.role === "assistant" ? (
                    <div className="prose-chat">
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}

            {isLoading &&
              messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start animate-fade-in">
                  <div className="glass rounded-2xl px-4 py-3 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 typing-dot" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 typing-dot" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 typing-dot" />
                  </div>
                </div>
              )}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="sticky bottom-0 pt-4 pb-2">
          <div className="relative flex items-center glass rounded-2xl chat-glow">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about fundraising, fund economics, AI investing..."
              className="flex-1 bg-transparent px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="mr-2 p-2 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {messages.length > 0 && (
            <p className="text-center text-[10px] text-gray-600 mt-2">
              Answers based on The Value Add VC by Trace Cohen. For the full
              book,{" "}
              <a
                href="https://value-add-vc-book.vercel.app/"
                target="_blank"
                className="text-cyan-600 hover:text-cyan-400"
              >
                download it free
              </a>
              .
            </p>
          )}
        </form>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-center gap-4 text-xs text-gray-500">
          <a
            href="https://x.com/Trace_Cohen"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            Twitter
          </a>
          <span>|</span>
          <a
            href="mailto:t@nyvp.com"
            className="hover:text-cyan-400 transition-colors"
          >
            t@nyvp.com
          </a>
          <span>|</span>
          <a
            href="https://valueaddvc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors"
          >
            valueaddvc.com
          </a>
        </div>
      </footer>
    </div>
  );
}

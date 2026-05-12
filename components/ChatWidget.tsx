"use client";
import { useState, useRef, useEffect, KeyboardEvent } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Message = {
  role: "assistant",
  content: "Hey! What are you looking to get done?",
};

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading || done) return;

    const updated: Message[] = [...messages, { role: "user", content: text }];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();

      if (data.text) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      }
      if (data.lead_captured) setDone(true);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong on my end — feel free to call or text us directly.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="flex flex-col border border-border-gray bg-warm-dark overflow-hidden" style={{ height: "480px" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border-gray">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-xs tracking-widest uppercase text-warm-gray font-sans font-bold">
          Tedwen Remakes
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-white text-black"
                  : "bg-charcoal border border-border-gray text-white"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-charcoal border border-border-gray px-4 py-3 flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-warm-gray animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-warm-gray animate-bounce"
                style={{ animationDelay: "160ms" }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-warm-gray animate-bounce"
                style={{ animationDelay: "320ms" }}
              />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {done ? (
        <div className="px-5 py-4 border-t border-border-gray text-center">
          <p className="text-xs tracking-widest uppercase text-warm-gray font-sans">
            We&apos;ll be in touch soon
          </p>
        </div>
      ) : (
        <div className="flex items-center border-t border-border-gray">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Message..."
            disabled={loading}
            className="flex-1 bg-transparent px-5 py-3.5 text-sm text-white placeholder:text-warm-gray focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label="Send"
            className="px-4 py-3.5 text-warm-gray hover:text-white disabled:opacity-30 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              width="17"
              height="17"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

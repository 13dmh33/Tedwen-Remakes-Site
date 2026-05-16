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

export default function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [open, messages, loading]);

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
        body: JSON.stringify({ messages: updated.map((m) => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      if (data.text) setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      if (data.lead_captured) setDone(true);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong — feel free to call us directly." }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col bg-warm-dark border border-border-gray shadow-2xl w-80 sm:w-96" style={{ height: "480px" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-border-gray">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs tracking-widest uppercase font-sans font-bold text-warm-gray">Tedwen Remakes</span>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="text-warm-gray hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[78%] px-3 py-2 text-sm leading-relaxed ${m.role === "user" ? "bg-white text-black" : "bg-charcoal border border-border-gray text-white"}`}>{m.content}</div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-charcoal border border-border-gray px-3 py-2.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-gray animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-gray animate-bounce" style={{ animationDelay: "160ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-warm-gray animate-bounce" style={{ animationDelay: "320ms" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          {done ? (
            <div className="px-4 py-3 border-t border-border-gray text-center">
              <p className="text-xs tracking-widest uppercase text-warm-gray font-sans">We'll be in touch soon</p>
            </div>
          ) : (
            <div className="flex items-center border-t border-border-gray">
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey} placeholder="Message..." disabled={loading} className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-warm-gray focus:outline-none disabled:opacity-50" />
              <button onClick={send} disabled={loading || !input.trim()} aria-label="Send" className="px-3 py-3 text-warm-gray hover:text-white disabled:opacity-30 transition-colors">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
              </button>
            </div>
          )}
        </div>
      )}
      <button onClick={() => setOpen((v) => !v)} aria-label={open ? "Close chat" : "Open chat"} className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:bg-off-white transition-colors">
        {open ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        )}
      </button>
    </div>
  );
}

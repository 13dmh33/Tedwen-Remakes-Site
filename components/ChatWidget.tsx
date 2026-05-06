"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING = "Hi! I'm Quincy, the Tedwen Remakes assistant. What can I help you with today? Whether you have questions about our services or want to get a project on Ted's radar, I'm here.";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isLoading]);
  useEffect(() => { if (isOpen) inputRef.current?.focus(); }, [isOpen]);

  async function send() {
    const text = input.trim();
    if (!text || isLoading) return;
    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      if (data.error) {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again or use the contact form." }]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
        if (data.leadSubmitted) setLeadSubmitted(true);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again or use the contact form." }]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex flex-col bg-warm-dark border border-border-gray shadow-2xl w-[360px] max-w-[calc(100vw-3rem)]" style={{ height: "520px" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b border-border-gray flex-shrink-0">
            <div>
              <p className="text-off-white font-medium text-sm">Quincy</p>
              <p className="text-warm-gray text-xs">Tedwen Remakes Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-warm-gray hover:text-off-white transition-colors text-2xl leading-none pb-0.5" aria-label="Close chat">×</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[82%] px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "bg-gold text-charcoal" : "bg-charcoal text-off-white border border-border-gray"}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-charcoal border border-border-gray px-4 py-3">
                  <div className="flex gap-1 items-center h-4">
                    <span className="w-1.5 h-1.5 bg-warm-gray rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-warm-gray rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-warm-gray rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            {leadSubmitted && <p className="text-xs text-warm-gray text-center pt-1">Your info has been sent to Ted.</p>}
            <div ref={bottomRef} />
          </div>
          <div className="border-t border-border-gray px-4 py-3 flex gap-2 flex-shrink-0">
            <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type a message..." disabled={isLoading} className="flex-1 bg-charcoal border border-border-gray text-off-white placeholder-warm-gray text-sm px-3 py-2 outline-none focus:border-warm-gray transition-colors disabled:opacity-50" />
            <button onClick={send} disabled={isLoading || !input.trim()} className="bg-gold text-charcoal px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40 flex-shrink-0">Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen((prev) => !prev)} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold text-charcoal flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity" aria-label={isOpen ? "Close chat" : "Chat with Quincy"}>
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 6L6 18M6 6l12 12" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
        )}
      </button>
    </>
  );
}

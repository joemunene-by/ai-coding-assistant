"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Trash2 } from "lucide-react";
import { getMockAIResponse } from "@/lib/mockAI";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I'm your AI coding assistant. Ask me to create components, debug code, explain concepts, or anything else. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getMockAIResponse(trimmed);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-" + Date.now(),
        role: "assistant",
        content:
          "Chat cleared. How can I help you?",
        timestamp: new Date(),
      },
    ]);
  };

  const formatContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).split("\n");
        const language = lines[0]?.trim() || "";
        const code = language ? lines.slice(1).join("\n") : lines.join("\n");
        return (
          <div key={index} className="my-3 rounded-lg overflow-hidden border border-editor-border">
            {language && (
              <div className="px-3 py-1.5 bg-editor-sidebar text-xs text-editor-muted flex items-center justify-between">
                <span>{language}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(code)}
                  className="text-editor-muted hover:text-editor-text transition-colors text-xs"
                >
                  Copy
                </button>
              </div>
            )}
            <pre className="p-3 bg-[#181825] overflow-x-auto text-sm">
              <code className="text-editor-text font-mono">{code}</code>
            </pre>
          </div>
        );
      }

      // Handle inline formatting
      return (
        <div key={index} className="whitespace-pre-wrap">
          {part.split("\n").map((line, lineIdx) => {
            // Bold text
            let formatted: React.ReactNode = line;
            if (line.includes("**")) {
              const boldParts = line.split(/\*\*(.*?)\*\*/g);
              formatted = boldParts.map((bp, bpIdx) =>
                bpIdx % 2 === 1 ? (
                  <strong key={bpIdx} className="font-semibold text-editor-text">
                    {bp}
                  </strong>
                ) : (
                  <span key={bpIdx}>{bp}</span>
                )
              );
            }

            // Inline code
            if (typeof formatted === "string" && formatted.includes("`")) {
              const codeParts = formatted.split(/`(.*?)`/g);
              formatted = codeParts.map((cp, cpIdx) =>
                cpIdx % 2 === 1 ? (
                  <code
                    key={cpIdx}
                    className="px-1.5 py-0.5 bg-editor-sidebar rounded text-editor-accent text-sm font-mono"
                  >
                    {cp}
                  </code>
                ) : (
                  <span key={cpIdx}>{cp}</span>
                )
              );
            }

            return (
              <React.Fragment key={lineIdx}>
                {lineIdx > 0 && <br />}
                {formatted}
              </React.Fragment>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="w-80 bg-editor-panel border-l border-editor-border flex flex-col h-full shrink-0">
      {/* Chat header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-editor-border">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-editor-purple" />
          <span className="text-sm font-semibold">AI Assistant</span>
        </div>
        <button
          onClick={clearChat}
          className="p-1.5 rounded hover:bg-white/10 transition-colors"
          title="Clear chat"
        >
          <Trash2 size={14} className="text-editor-muted" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-fade-in flex gap-2.5 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                msg.role === "user"
                  ? "bg-editor-accent/20"
                  : "bg-editor-purple/20"
              }`}
            >
              {msg.role === "user" ? (
                <User size={14} className="text-editor-accent" />
              ) : (
                <Bot size={14} className="text-editor-purple" />
              )}
            </div>
            <div
              className={`flex-1 min-w-0 rounded-xl px-3 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-editor-accent/15 text-editor-text"
                  : "bg-editor-sidebar text-editor-text/90"
              }`}
            >
              {formatContent(msg.content)}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="message-fade-in flex gap-2.5">
            <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-editor-purple/20">
              <Bot size={14} className="text-editor-purple" />
            </div>
            <div className="bg-editor-sidebar rounded-xl px-4 py-3 flex items-center gap-1.5">
              <div className="typing-dot w-2 h-2 rounded-full bg-editor-purple" />
              <div className="typing-dot w-2 h-2 rounded-full bg-editor-purple" />
              <div className="typing-dot w-2 h-2 rounded-full bg-editor-purple" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-3 border-t border-editor-border">
        <div className="flex items-end gap-2 bg-editor-sidebar rounded-xl p-2 border border-editor-border focus-within:border-editor-accent/50 transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-sm text-editor-text placeholder:text-editor-muted resize-none outline-none min-h-[20px] max-h-[120px] py-1 px-1"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="shrink-0 p-2 rounded-lg bg-editor-accent/20 text-editor-accent hover:bg-editor-accent/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="text-[10px] text-editor-muted mt-1.5 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}

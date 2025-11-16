"use client";

import { useState, useRef, useEffect } from "react";
import { AirQualityData, ChatMessage } from "@/app/types";

interface AIChatProps {
  airQualityData: AirQualityData;
}

export default function AIChat({ airQualityData }: AIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    // Build the new history synchronously
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages, // 👈 send full history
          context: airQualityData, // 👈 your AQ data
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border p-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          AI Compliance Assistant
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Ask about air quality, regulations, or compliance implications
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-8">
            <p className="mb-4">
              👋 Hi! I can help you understand Calgary&apos;s air quality and
              compliance requirements.
            </p>
            <div className="text-sm space-y-2">
              <p className="font-medium">Try asking:</p>
              <ul className="space-y-1">
                <li>"What does today&apos;s AQHI mean for operations?"</li>
                <li>"What regulations apply at this air quality level?"</li>
                <li>"Explain TIER compliance requirements."</li>
              </ul>
            </div>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t border-border p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about air quality or regulations..."
            className="flex-1 px-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

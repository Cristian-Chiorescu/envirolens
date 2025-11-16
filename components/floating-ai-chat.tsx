// components/FloatingAIChat.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { AirQualityData } from "@/types";
import { consultingProjects } from "@/data/consultingProjects";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface FloatingAIChatProps {
  airQualityData: AirQualityData;
}

export default function FloatingAIChat({
  airQualityData,
}: FloatingAIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Only scroll when messages change AND chat is open
  useEffect(() => {
    if (isOpen && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

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
      // Filter projects relevant to current AQI
      const [min, max] = [0, 300]; // Default range
      const relevantProjects = consultingProjects.filter((project) => {
        const [pMin, pMax] = project.relevantAQIRange.split("-").map(Number);
        return airQualityData.aqi >= pMin && airQualityData.aqi <= pMax;
      });

      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages, // 👈 send full history
          context: {
            airQuality: airQualityData,
            relevantProjects: relevantProjects, // 👈 your AQ data}
          },
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
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-50"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          // Close icon
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          // Chat icon with notification badge if there are messages
          <div className="relative">
            <svg
              className="w-6 h-6"
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
            {messages.length > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
            )}
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-130 md:h-150 bg-card border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col z-50 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <h3 className="font-semibold">AI Compliance Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20 rounded p-1 transition-colors"
            >
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8 px-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <p className="font-medium mb-2">Hi! I'm your AI assistant</p>
                <p className="text-sm mb-4">
                  Ask me about Calgary's air quality and compliance regulations.
                </p>
                <div className="text-xs space-y-2 text-left bg-card rounded-lg p-3">
                  <p className="font-medium text-foreground">Try asking:</p>
                  <ul className="space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>"What does today's AQI mean?"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>"Show me similar past projects"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>"Explain TIER compliance"</span>
                    </li>
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
                  className={`max-w-[85%] rounded-lg px-4 py-2 ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-card text-foreground rounded-bl-none shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card rounded-lg rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-border p-3 bg-card"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

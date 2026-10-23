"use client";

import { generateTextAction } from "@/app/actions/aiActions";
import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";

type ChatMessage = {
  question: string;
  answer?: string;
  error?: string;
};

function NovaraOrb({ small = false }: { small?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`novara-orb${small ? " novara-orb-small" : ""}`}
    >
      <span className="novara-orb-inner" />
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5 14.6 9.4 21.5 12l-6.9 2.6L12 21.5l-2.6-6.9L2.5 12l6.9-2.6L12 2.5Z" />
      <path d="m19 2 .8 2.2L22 5l-2.2.8L19 8l-.8-2.2L16 5l2.2-.8L19 2Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const conversationRef = useRef<HTMLElement>(null);
  const isChatActive = messages.length > 0;

  useEffect(() => {
    const conversation = conversationRef.current;
    conversation?.scrollTo({
      top: conversation.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSendPrompt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = prompt.trim();

    if (!question || isLoading) {
      return;
    }

    setMessages((current) => [...current, { question }]);
    setPrompt("");
    setIsLoading(true);

    try {
      const answer = await generateTextAction(question);
      setMessages((current) =>
        current.map((message, index) =>
          index === current.length - 1 ? { ...message, answer } : message,
        ),
      );
    } catch {
      setMessages((current) =>
        current.map((message, index) =>
          index === current.length - 1
            ? { ...message, error: "Sorry, something went wrong. Please try again." }
            : message,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="novara-shell">
      <header className="novara-navbar">
        <div className="novara-brand">
          <NovaraOrb small />
          <div>
            <p className="novara-brand-name">Novara</p>
            <p className="novara-brand-tagline">Your AI Companion</p>
          </div>
        </div>
      </header>

      <div className={`novara-content${isChatActive ? " is-chat-active" : ""}`}>
        {isChatActive ? (
          <section
            ref={conversationRef}
            aria-label="Conversation"
            className="novara-conversation"
          >
            <div className="novara-messages">
              {messages.map((message, index) => (
                <article key={index} className="novara-message">
                  <div className="novara-question">{message.question}</div>

                  {message.answer ? (
                    <div className="novara-answer">
                      <ReactMarkdown>{message.answer}</ReactMarkdown>
                    </div>
                  ) : message.error ? (
                    <p role="alert" className="novara-error">
                      {message.error}
                    </p>
                  ) : index === messages.length - 1 && isLoading ? (
                    <div
                      className="novara-thinking"
                      role="status"
                      aria-label="Novara is thinking"
                    >
                      <div className="novara-thinking-avatar">
                        <NovaraOrb small />
                      </div>
                      <div className="novara-thinking-lines">
                        <span />
                        <span />
                      </div>
                      <span className="novara-thinking-indicator" />
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ) : (
          <section className="novara-welcome" aria-label="Welcome">
            <NovaraOrb />
            <h1>
              Welcome to <span>Novara</span>
            </h1>
            <p>How can I help you today?</p>
          </section>
        )}

        <form
          onSubmit={handleSendPrompt}
          className={`novara-composer${isChatActive ? " is-docked" : " is-centered"}`}
        >
          <SparkleIcon />
          <input
            placeholder={isChatActive ? "Ask Novara anything..." : "Ask me anything..."}
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            aria-label="Your message"
          />
          {!isChatActive && (
            <>
              <span className="novara-composer-divider" aria-hidden="true" />
              <span className="novara-composer-hint">Get answers, ideas, help...</span>
            </>
          )}
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            aria-label="Send message"
          >
            <ArrowIcon />
          </button>
        </form>
      </div>
    </main>
  );
}

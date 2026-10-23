"use client";

import { generateTextAction } from "@/app/actions/aiActions";
import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";

type ChatMessage = {
  question: string;
  answer?: string;
  error?: string;
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const endOfConversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfConversationRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
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
    <main className="flex h-dvh flex-col">
      <section
        aria-label="Conversation"
        className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8"
      >
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          {messages.map((message, index) => (
            <article key={index} className="flex flex-col gap-6">
              <div className="self-end whitespace-pre-wrap rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
                {message.question}
              </div>

              {message.answer ? (
                <div className="min-w-0">
                  <ReactMarkdown>{message.answer}</ReactMarkdown>
                </div>
              ) : message.error ? (
                <p role="alert" className="text-red-600 dark:text-red-400">
                  {message.error}
                </p>
              ) : index === messages.length - 1 && isLoading ? (
                <div
                  className="relative flex w-64 animate-pulse gap-2 p-4"
                  role="status"
                  aria-label="Thinking"
                >
                  <div className="h-12 w-12 rounded-full bg-slate-400"></div>
                  <div className="flex-1">
                    <div className="mb-1 h-5 w-3/5 rounded-lg bg-slate-400"></div>
                    <div className="h-5 w-[90%] rounded-lg bg-slate-400"></div>
                  </div>
                  <div className="absolute bottom-5 right-0 h-4 w-4 rounded-full bg-slate-400"></div>
                </div>
              ) : null}
            </article>
          ))}
          <div ref={endOfConversationRef} />
        </div>
      </section>

      <form
        onSubmit={handleSendPrompt}
        className="w-full shrink-0 border-t border-slate-200 bg-background px-4 py-4 dark:border-slate-700 sm:px-8"
      >
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3">
          <input
            className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-transparent p-3 focus:outline-2 focus:outline-emerald-500 dark:border-slate-600"
            placeholder="Type your message here..."
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            aria-label="Your message"
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="h-11 rounded-xl border border-emerald-500 px-5 font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </main>
  );
}

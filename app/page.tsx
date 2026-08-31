"use client"
import { generateTextAction } from "@/app/actions/aiActions";
import { useState } from "react";
import ReactMarkdown from "react-markdown"

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const handleSendPrompt = async () => {
    const response = await generateTextAction(prompt)
    setOutput(response)
  };

  return (
    <main className="flex felx-col items-center overflow-auto pb-20 justify-between px-24 py-6 h-screen w-screen">
      {
        output && (
          <div >
            <h1 className="text-2xl font-bold mb-4">AI Response</h1>
            <ReactMarkdown >{output}</ReactMarkdown>
          </div>
        )
      }
      <div className="input-area fixed bottom-6 px-20 py-2 flex items-center justify-between w-full">
        <input
          className="border p-2 rounded-md w-[80%]"
          placeholder="Type your message here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></input>
        <button onClick={handleSendPrompt} className="mr-25 h-11 w-30 border border-emerald-500 rounded-xl cursor-pointer">
          Send
        </button>
      </div>
    </main>
  );
}

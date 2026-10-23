"use server";

import { GoogleGenAI } from "@google/genai";

export async function generateTextAction(prompt: string): Promise<string> {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GOOGLE_GEMINI_API_KEY is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const interaction = await ai.interactions.create({
    model: "gemini-3.6-flash",
    input: prompt,
  });

  return interaction.output_text || "No output generated";
}
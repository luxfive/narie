import { GoogleGenAI, Type } from "@google/genai";
import { AIRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getScentRecommendation = async (moodDescription: string, language: string = 'en'): Promise<AIRecommendation> => {
  try {
    const langInstruction = language === 'vi' ? "Provide the response in Vietnamese." : "Provide the response in English.";
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Recommend a unique, artisanal candle scent concept based on this user mood or scenario: "${moodDescription}". 
      Be poetic, luxurious, and evocative. ${langInstruction} The output must be strictly JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            candleName: {
              type: Type.STRING,
              description: "A creative, artisanal name for the candle.",
            },
            description: {
              type: Type.STRING,
              description: "A short, evocative description of the scent experience (max 2 sentences).",
            },
            scentProfile: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3-4 primary scent notes (e.g., Bergamot, Old Paper, Rain).",
            },
            moodMatch: {
              type: Type.STRING,
              description: "A brief phrase explaining why this matches the user's input.",
            },
            intensityLevel: {
              type: Type.INTEGER,
              description: "Scent intensity from 1 (Subtle) to 5 (Strong).",
            }
          },
          required: ["candleName", "description", "scentProfile", "moodMatch", "intensityLevel"],
        },
      },
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    const data = JSON.parse(response.text) as AIRecommendation;
    return data;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
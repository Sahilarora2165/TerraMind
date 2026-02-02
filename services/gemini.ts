import { GoogleGenAI, Type } from "@google/genai";
import { Diagnosis } from "../types";

// Always use process.env.API_KEY directly as a named parameter
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAgriAdvice = async (space: number, sunlight: string, weather: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `As an urban farming expert in Pune, provide advice for a user with ${space} sq ft terrace and ${sunlight} sunlight. 
    Current weather in Pune: ${weather.temp}°C, ${weather.condition}.
    Suggest specific crops, a daily alert, and a water budget in liters.
    Format the response as JSON with keys: cropSuggestion, alert, waterBudget, reasoning. IMPORTANT: Ensure all string values are in plain text, no markdown formatting.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cropSuggestion: { type: Type.STRING },
          alert: { type: Type.STRING },
          waterBudget: { type: Type.STRING },
          reasoning: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const diagnosePlant = async (base64Image: string, mode: 'Plant Issue' | 'Soil Health'): Promise<Diagnosis> => {
  const ai = getAI();
  const prompt = mode === 'Plant Issue' 
    ? "Analyze this plant image for pests or diseases. Identify the issue and provide an organic remedy suitable for Pune's climate. Provide response in plain text only, no markdown."
    : "Analyze the soil in this image. Is it dry, moist, or healthy? Suggest immediate action. Provide response in plain text only, no markdown.";

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          issue: { type: Type.STRING },
          remedy: { type: Type.STRING },
          confidence: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};

export const editFarmImage = async (base64Image: string, prompt: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image.split(',')[1] } },
        { text: `Edit this image based on the prompt: ${prompt}. Make it look like a thriving urban organic terrace garden in Pune.` }
      ]
    }
  });

  // Always iterate through parts to find the image data
  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("No image generated");
};

export const createChatSession = () => {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are an expert organic urban farming assistant specializing in the Pune region of India. You provide practical, eco-friendly advice for terrace and balcony gardening, considering local seasons (Kharif, Rabi, Summer), Pune weather (mild winters, hot summers, monsoon), water conservation, and organic Maharashtrian agricultural practices. Be warm, encouraging, and highly specific to Pune geography (mentioning areas like Kothrud, Baner, etc., where relevant). IMPORTANT: Do NOT use markdown forming. Provide your response in simple plain text only. Do not use bold (asterisks), italics, headers, or bullet points. Use standard paragraph spacing for readability.',

    },
  });
};

export const generateForumReply = async (question: string): Promise<string> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Acting as "Pune Agri-Expert", provide a helpful, concise, organic farming reply to this question from a Pune resident: "${question}". Focus on organic methods and local context. IMPORTANT: Provide your response in plain text only, no markdown formatting.`,
  });
  return response.text || "That's a great question! I'll look into local organic solutions for you.";
};
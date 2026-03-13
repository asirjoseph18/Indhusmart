import { GoogleGenAI } from "@google/genai";

// Use GoogleGenAI to generate professional IoT consultant insights
export async function getConsultantInsight(topic: string): Promise<string> {
  try {
    // Initializing with process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a senior IoT Consultant. Provide a 3-sentence expert professional insight regarding this topic in the context of InduSmart, an industrial IoT startup: "${topic}". Focus on scalability, ROI, or technical edge.`,
    });
    // response.text is a property, not a method
    return response.text || "No insight available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI insights.";
  }
}

// Analyze industrial machine data using Gemini for health monitoring
export async function analyzeMachineData(data: any): Promise<string> {
  try {
    // Initializing with process.env.API_KEY directly as per guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this machine data and provide a safety status: ${JSON.stringify(data)}. Mention if anything looks abnormal for an industrial motor. Keep it short.`,
    });
    // response.text is a property, not a method
    return response.text || "Normal operation detected.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Status check failed.";
  }
}
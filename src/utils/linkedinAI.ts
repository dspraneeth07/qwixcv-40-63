
import { apiKeys } from "./apiKeys";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

interface LinkedInResponse {
  content: string;
  suggestions?: string[];
}

export const generateLinkedInSuggestions = async (userMessage: string): Promise<LinkedInResponse> => {
  console.log("🤖 LinkedInAI: Processing user query:", userMessage);
  console.log("🔑 Using Gemini API with advanced LinkedIn optimization model");
  
  const prompt = `
    You are an expert LinkedIn optimization consultant with years of experience helping professionals enhance their profiles. 
    
    User query: "${userMessage}"
    
    Provide helpful, specific, and actionable advice. If the user is asking about:
    - Headlines: Suggest powerful, keyword-rich headlines
    - Summaries: Help write compelling professional summaries
    - Experience: Optimize job descriptions with achievements and metrics
    - Skills: Recommend relevant skills and keywords
    - Networking: Provide networking strategies
    - Content: Suggest post ideas and engagement tactics
    
    Respond in a conversational, helpful tone. Be specific and provide examples when possible.
    Keep your response under 300 words but make it comprehensive and actionable.
    
    Also, based on the user's query, suggest 2-4 follow-up questions or topics they might want to explore, formatted as a JSON array at the end of your response like this:
    
    SUGGESTIONS: ["suggestion 1", "suggestion 2", "suggestion 3"]
  `;

  try {
    console.log("📡 Making API call to LinkedIn optimization model...");
    
    const response = await fetch(`${API_URL}?key=${apiKeys.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const fullResponse = data.candidates[0].content.parts[0].text;
    
    console.log("✅ LinkedInAI: Generated response successfully");
    
    // Extract suggestions if present
    const suggestionsMatch = fullResponse.match(/SUGGESTIONS:\s*\[(.*?)\]/);
    let suggestions: string[] = [];
    let content = fullResponse;
    
    if (suggestionsMatch) {
      try {
        const suggestionsStr = suggestionsMatch[1];
        suggestions = suggestionsStr.split(',').map(s => s.trim().replace(/['"]/g, ''));
        content = fullResponse.replace(/SUGGESTIONS:\s*\[.*?\]/, '').trim();
      } catch (e) {
        console.log("Could not parse suggestions, continuing without them");
      }
    }
    
    return {
      content: content || "I'd be happy to help you optimize your LinkedIn profile! Could you tell me more about what specific area you'd like to improve?",
      suggestions: suggestions.length > 0 ? suggestions : [
        "Help with my headline",
        "Improve my summary",
        "Optimize experience section",
        "Keyword suggestions"
      ]
    };
  } catch (error) {
    console.error("❌ LinkedinAI: Error generating response:", error);
    throw error;
  }
};

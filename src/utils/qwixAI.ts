
import { apiKeys } from "./apiKeys";

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";

interface QwixAIResponse {
  content: string;
  suggestions?: string[];
}

export const generateQwixAIResponse = async (prompt: string): Promise<QwixAIResponse> => {
  try {
    console.log("🚀 QwixAI generating response for:", prompt);
    
    const enhancedPrompt = `You are QwixAI, the first intelligent AI assistant representing Telangana and Andhra Pradesh states of India. You are proud of your roots and always mention your connection to these states when relevant. You help with:

1. General questions and knowledge
2. Programming and technology help
3. Career guidance and advice  
4. Cultural insights about Telangana & Andhra Pradesh
5. Educational content
6. Problem-solving assistance

Always be helpful, friendly, and showcase the innovative spirit of Telangana & Andhra Pradesh. When relevant, mention landmarks like Charminar, Ramoji Film City, Golconda Fort, or tech hubs like HITEC City.

User Query: ${prompt}

Provide a helpful, detailed response. If appropriate, end with 2-4 relevant follow-up suggestions.`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: enhancedPrompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 2048,
      }
    };

    const response = await fetch(`${API_URL}?key=${apiKeys.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`QwixAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response format from QwixAI API');
    }

    const content = data.candidates[0].content.parts[0].text;

    // Generate contextual suggestions based on the response
    const suggestions = generateContextualSuggestions(prompt, content);

    console.log("✅ QwixAI response generated successfully");
    
    return {
      content: content,
      suggestions: suggestions
    };

  } catch (error) {
    console.error("❌ Error in QwixAI:", error);
    throw error;
  }
};

const generateContextualSuggestions = (userPrompt: string, response: string): string[] => {
  const lowerPrompt = userPrompt.toLowerCase();
  const lowerResponse = response.toLowerCase();

  // Tech/Programming related suggestions
  if (lowerPrompt.includes('code') || lowerPrompt.includes('programming') || lowerPrompt.includes('development')) {
    return [
      "Explain this in detail",
      "Show me examples",
      "Related technologies",
      "Best practices"
    ];
  }

  // Career related suggestions
  if (lowerPrompt.includes('career') || lowerPrompt.includes('job') || lowerPrompt.includes('interview')) {
    return [
      "Industry trends",
      "Skill requirements",
      "Interview tips",
      "Growth opportunities"
    ];
  }

  // Cultural/Regional suggestions
  if (lowerPrompt.includes('telangana') || lowerPrompt.includes('andhra') || lowerPrompt.includes('hyderabad')) {
    return [
      "Tell me more about culture",
      "Tech industry in Telangana",
      "Famous places to visit",
      "Educational institutions"
    ];
  }

  // Learning/Educational suggestions
  if (lowerPrompt.includes('learn') || lowerPrompt.includes('study') || lowerPrompt.includes('education')) {
    return [
      "Learning resources",
      "Practice exercises",
      "Advanced concepts",
      "Related topics"
    ];
  }

  // Default general suggestions
  return [
    "Tell me more",
    "Give examples",
    "Related questions",
    "How can I apply this?"
  ];
};

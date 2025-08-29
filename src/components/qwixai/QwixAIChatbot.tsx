
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Loader2,
  MessageSquare,
  Lightbulb,
  AlertCircle,
  Zap
} from "lucide-react";
import { generateQwixAIResponse } from "@/utils/qwixAI";

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  error?: boolean;
}

const QwixAIChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Namaste! 🙏 I'm QwixAI - Your intelligent assistant representing Telangana & Andhra Pradesh! I'm here to help you with anything - from coding and career advice to cultural insights and general knowledge. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: [
        "Tell me about Telangana",
        "Help with coding",
        "Career guidance",
        "General questions"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      console.log("🚀 Sending message to QwixAI:", messageToSend);
      
      const response = await generateQwixAIResponse(messageToSend);
      
      console.log("✅ Received response from QwixAI:", response);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      toast({
        title: "Response generated!",
        description: "QwixAI is ready to help you further.",
      });
    } catch (error) {
      console.error('❌ Error in QwixAI:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
      
      const errorChatMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I apologize, but I encountered an error: ${errorMessage}. Please try asking your question again. As QwixAI from Telangana & Andhra Pradesh, I'm here to help you with anything!`,
        timestamp: new Date(),
        error: true,
        suggestions: [
          "Try a different question",
          "Ask about technology", 
          "Get career advice",
          "Learn about our states"
        ]
      };
      setMessages(prev => [...prev, errorChatMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[700px] flex flex-col max-w-4xl mx-auto">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="pb-3 flex-shrink-0 bg-gradient-to-r from-orange-50 to-purple-50 border-b">
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full">
              <Zap className="h-4 w-4 text-white" />
            </div>
            QwixAI Assistant
            <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-orange-100 to-purple-100">
              <Sparkles className="h-3 w-3 mr-1" />
              Telangana & AP AI
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            First AI Assistant proudly representing Telangana & Andhra Pradesh 🏛️
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 px-6 py-2">
            <div className="space-y-4 min-h-0">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-3 animate-in slide-in-from-bottom-2">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className={
                      message.error ? 'bg-red-100' :
                      message.role === 'assistant' ? 'bg-gradient-to-r from-orange-100 to-purple-100' : 'bg-gray-100'
                    }>
                      {message.error ? (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      ) : message.role === 'assistant' ? (
                        <Bot className="h-4 w-4 text-orange-600" />
                      ) : (
                        <User className="h-4 w-4 text-gray-600" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className={`p-3 rounded-lg max-w-full break-words ${
                      message.error ? 'bg-red-50 border border-red-200' :
                      message.role === 'assistant' 
                        ? 'bg-gradient-to-r from-orange-50 to-purple-50 border border-orange-200' 
                        : 'bg-gray-50 border border-gray-100'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                    
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs h-7 px-2 border-orange-200 hover:bg-orange-50"
                          >
                            <Lightbulb className="h-3 w-3 mr-1" />
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 animate-in slide-in-from-bottom-2">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-gradient-to-r from-orange-100 to-purple-100">
                      <Bot className="h-4 w-4 text-orange-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-purple-50 border border-orange-200 max-w-full">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-orange-600" />
                        <p className="text-sm text-orange-600">QwixAI is thinking and preparing your response...</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-1" />
            </div>
          </ScrollArea>
          
          <div className="p-6 border-t flex-shrink-0 bg-background">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask QwixAI anything - I'm here to help from Telangana & Andhra Pradesh!"
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={() => handleSendMessage()} 
                disabled={!inputMessage.trim() || isLoading}
                size="icon"
                className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="flex items-center gap-2 mt-3">
              <MessageSquare className="h-4 w-4 text-gray-400" />
              <p className="text-xs text-gray-500">
                Powered by QwixAI - First AI Assistant from Telangana & Andhra Pradesh 🇮🇳
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QwixAIChatbot;

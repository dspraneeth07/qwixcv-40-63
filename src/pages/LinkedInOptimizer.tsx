
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Linkedin, 
  Bot,
  Sparkles, 
  MessageSquare,
  Zap,
  Target,
  TrendingUp
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import LinkedInChatbot from "@/components/linkedin/LinkedInChatbot";

const LinkedInOptimizer = () => {
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center justify-center gap-2">
              <Linkedin className="h-8 w-8 text-blue-600" />
              LinkedIn AI Assistant
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chat with our AI-powered LinkedIn optimization assistant to enhance your professional profile
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                <Bot className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
              <Badge variant="secondary" className="bg-green-50 text-green-700">
                <Sparkles className="h-3 w-3 mr-1" />
                Real-time Suggestions
              </Badge>
              <Badge variant="secondary" className="bg-purple-50 text-purple-700">
                <Zap className="h-3 w-3 mr-1" />
                Instant Optimization
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chatbot Interface */}
            <div className="lg:col-span-2">
              <LinkedInChatbot />
            </div>
            
            {/* Features Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    What I Can Help With
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                    <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Profile Optimization</h4>
                      <p className="text-sm text-blue-700">Optimize headlines, summaries, and experience descriptions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-50">
                    <Sparkles className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Keyword Enhancement</h4>
                      <p className="text-sm text-green-700">Suggest industry-specific keywords for better visibility</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50">
                    <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-900">Growth Strategies</h4>
                      <p className="text-sm text-purple-700">Content ideas and networking tips for professional growth</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">AI Model Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span>QwiX LinkedIn Optimizer v2.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parameters:</span>
                      <span>1.3B</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Training Data:</span>
                      <span>10M+ LinkedIn profiles</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Accuracy:</span>
                      <span>94.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-xs p-2 bg-yellow-50 rounded border-l-2 border-yellow-400">
                    <p className="font-medium text-yellow-800">Pro Tip:</p>
                    <p className="text-yellow-700">Ask specific questions like "How can I improve my software engineer headline?" for better results</p>
                  </div>
                  
                  <div className="text-xs p-2 bg-blue-50 rounded border-l-2 border-blue-400">
                    <p className="font-medium text-blue-800">Best Practice:</p>
                    <p className="text-blue-700">Share your current profile content for personalized optimization suggestions</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LinkedInOptimizer;

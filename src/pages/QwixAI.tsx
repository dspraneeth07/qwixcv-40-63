
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  Bot,
  Sparkles, 
  MessageSquare,
  Code,
  Briefcase,
  GraduationCap,
  MapPin,
  Star,
  Users
} from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import QwixAIChatbot from "@/components/qwixai/QwixAIChatbot";

const QwixAI = () => {
  return (
    <MainLayout>
      <div className="container py-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              QwixAI Assistant
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-4">
              Meet India's first AI assistant proudly representing Telangana & Andhra Pradesh! 
              From the land of Charminar and HITEC City, I'm here to help you with anything and everything.
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border-orange-200">
                <MapPin className="h-3 w-3 mr-1" />
                Telangana & AP
              </Badge>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200">
                <Bot className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200">
                <Sparkles className="h-3 w-3 mr-1" />
                Gemini 2.0 Flash
              </Badge>
              <Badge variant="secondary" className="bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200">
                <Star className="h-3 w-3 mr-1" />
                Multi-Purpose
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chatbot Interface */}
            <div className="lg:col-span-2">
              <QwixAIChatbot />
            </div>
            
            {/* Features Sidebar */}
            <div className="space-y-6">
              <Card className="border-gradient-to-r from-orange-200 to-purple-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-orange-600" />
                    What I Can Help With
                  </CardTitle>
                  <CardDescription>
                    Your all-in-one AI assistant from the heart of India
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                    <Code className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Programming & Tech</h4>
                      <p className="text-sm text-blue-700">Code help, debugging, tech explanations, and development guidance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100">
                    <Briefcase className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Career Guidance</h4>
                      <p className="text-sm text-green-700">Job search tips, interview prep, and career development advice</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100">
                    <GraduationCap className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-900">Learning & Education</h4>
                      <p className="text-sm text-purple-700">Study help, explanations, and educational resources</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100">
                    <MapPin className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-900">Regional Insights</h4>
                      <p className="text-sm text-orange-700">Culture, history, and opportunities in Telangana & AP</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-500" />
                    QwixAI Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Origin:</span>
                      <span className="text-orange-600 font-medium">Telangana & AP</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Model:</span>
                      <span>Gemini 2.0 Flash</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Capabilities:</span>
                      <span>Multi-Domain AI</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Languages:</span>
                      <span>English, Telugu, Hindi</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Specialization:</span>
                      <span>General Purpose AI</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-r from-orange-50 to-purple-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Star className="h-4 w-4 text-orange-500" />
                    About QwixAI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-xs p-3 bg-white/50 rounded border-l-4 border-orange-400">
                    <p className="font-medium text-orange-800 mb-1">🏛️ Proud Heritage</p>
                    <p className="text-orange-700">Born from the innovative spirit of Telangana & Andhra Pradesh, home to IT giants and rich culture.</p>
                  </div>
                  
                  <div className="text-xs p-3 bg-white/50 rounded border-l-4 border-purple-400">
                    <p className="font-medium text-purple-800 mb-1">🚀 Advanced AI</p>
                    <p className="text-purple-700">Powered by Google's latest Gemini 2.0 Flash for lightning-fast, accurate responses.</p>
                  </div>

                  <div className="text-xs p-3 bg-white/50 rounded border-l-4 border-blue-400">
                    <p className="font-medium text-blue-800 mb-1">🎯 Your Assistant</p>
                    <p className="text-blue-700">From coding to career advice, I'm here to help you succeed in your journey!</p>
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

export default QwixAI;

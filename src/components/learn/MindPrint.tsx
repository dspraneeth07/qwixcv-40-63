import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Brain, BarChart2, Lightbulb, Circle, CheckCircle, Clock, BookOpen, Code, ChevronRight, Award } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const assessmentQuestions = [
  {
    id: 1,
    category: "Working Memory",
    question: "When following complex instructions, I prefer to:",
    options: [
      "Take notes and break them down step by step",
      "Listen carefully and try to remember everything",
      "Ask for the instructions to be repeated",
      "Jump in and figure it out as I go"
    ]
  },
  {
    id: 2,
    category: "Processing Speed",
    question: "In learning new software or tools, I:",
    options: [
      "Read the manual thoroughly first",
      "Learn by trial and error quickly",
      "Watch tutorials and practice slowly",
      "Ask someone to show me step by step"
    ]
  },
  {
    id: 3,
    category: "Flexible Thinking",
    question: "When solving problems, I typically:",
    options: [
      "Try multiple approaches until one works",
      "Stick with proven methods that work",
      "Look for creative, unconventional solutions",
      "Break the problem into smaller parts"
    ]
  },
  {
    id: 4,
    category: "Abstract Reasoning",
    question: "I find it easier to understand concepts when they are:",
    options: [
      "Explained with real-world examples",
      "Presented with visual diagrams",
      "Described in theoretical terms",
      "Connected to things I already know"
    ]
  },
  {
    id: 5,
    category: "Attention",
    question: "In a busy environment, I:",
    options: [
      "Can focus well despite distractions",
      "Need complete quiet to concentrate",
      "Use background noise to help focus",
      "Work better with short, focused bursts"
    ]
  }
];

export const MindPrint = () => {
  const [currentStep, setCurrentStep] = useState('about');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleStartAssessment = () => {
    setCurrentStep('assessment');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete assessment
      generateResults();
    }
  };

  const generateResults = () => {
    // Simple scoring logic for demo
    const scores = {
      workingMemory: Math.floor(Math.random() * 20) + 70,
      processingSpeed: Math.floor(Math.random() * 20) + 70,
      flexibleThinking: Math.floor(Math.random() * 20) + 70,
      abstractReasoning: Math.floor(Math.random() * 20) + 70,
      attention: Math.floor(Math.random() * 20) + 70,
    };

    const overallScore = Math.floor(Object.values(scores).reduce((a, b) => a + b, 0) / 5);
    
    setResults({
      scores,
      overallScore,
      learningStyle: overallScore > 85 ? "Analytical Learner" : overallScore > 75 ? "Adaptive Learner" : "Structured Learner",
      recommendations: [
        "Focus on visual learning techniques",
        "Break complex tasks into smaller steps", 
        "Use active recall and spaced repetition",
        "Practice mindfulness to improve attention"
      ]
    });
    
    setIsCompleted(true);
    setCurrentStep('results');
    
    toast({
      title: "Assessment Complete!",
      description: "Your MindPrint profile has been generated successfully.",
    });
  };

  const progressPercentage = currentStep === 'about' ? 0 : 
                           currentStep === 'assessment' ? ((currentQuestion + 1) / assessmentQuestions.length) * 100 : 
                           100;

  return (
    <div className="container max-w-7xl py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">MindPrint Assessment</h1>
          <p className="text-muted-foreground">
            Discover your unique cognitive profile and learning style preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Assessment Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-indigo-600" />
                  <CardTitle>Cognitive Assessment</CardTitle>
                </div>
                <CardDescription>
                  Complete the assessment to generate your personalized MindPrint profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={currentStep} onValueChange={setCurrentStep}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="assessment" disabled={currentStep === 'about'}>Assessment</TabsTrigger>
                    <TabsTrigger value="results" disabled={!isCompleted}>Results</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="about" className="space-y-4 pt-4">
                    <div className="rounded-lg bg-muted p-6">
                      <h3 className="text-lg font-medium mb-3">What is MindPrint?</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        MindPrint is a scientific cognitive assessment that identifies your unique learning profile across 
                        multiple cognitive domains. Understanding your cognitive strengths and challenges can help you
                        optimize your learning and career development approaches.
                      </p>
                      
                      <h4 className="font-medium mb-2">The assessment measures:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <Circle className="h-2 w-2 text-indigo-600" />
                          <span>Memory & processing abilities</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Circle className="h-2 w-2 text-indigo-600" />
                          <span>Executive functioning skills</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Circle className="h-2 w-2 text-indigo-600" />
                          <span>Complex reasoning capabilities</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Circle className="h-2 w-2 text-indigo-600" />
                          <span>Verbal and spatial abilities</span>
                        </li>
                      </ul>
                      
                      <div className="mt-6 flex flex-col gap-2">
                        <p className="text-sm font-medium">Assessment details:</p>
                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Duration: Approximately 5-10 minutes</span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span>Format: Interactive questions</span>
                        </div>
                      </div>
                      
                      <Button onClick={handleStartAssessment} className="w-full mt-4">
                        <Brain className="mr-2 h-4 w-4" />
                        Start Assessment
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="assessment" className="space-y-4 pt-4">
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm text-muted-foreground">
                          Question {currentQuestion + 1} of {assessmentQuestions.length}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="text-sm text-primary font-medium mb-2">
                          {assessmentQuestions[currentQuestion].category}
                        </div>
                        <h3 className="text-lg font-medium mb-4">
                          {assessmentQuestions[currentQuestion].question}
                        </h3>
                        
                        <RadioGroup
                          value={answers[assessmentQuestions[currentQuestion].id] || ""}
                          onValueChange={(value) => 
                            handleAnswerSelect(assessmentQuestions[currentQuestion].id, value)
                          }
                          className="space-y-3"
                        >
                          {assessmentQuestions[currentQuestion].options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50">
                              <RadioGroupItem value={option} id={`option-${index}`} />
                              <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                                {option}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div className="flex justify-between">
                        <Button 
                          variant="outline" 
                          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                          disabled={currentQuestion === 0}
                        >
                          Previous
                        </Button>
                        <Button 
                          onClick={handleNextQuestion}
                          disabled={!answers[assessmentQuestions[currentQuestion].id]}
                        >
                          {currentQuestion === assessmentQuestions.length - 1 ? 'Complete' : 'Next'}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="results" className="space-y-4 pt-4">
                    {results ? (
                      <div className="space-y-6">
                        <div className="text-center">
                          <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                          <h3 className="text-2xl font-bold mb-2">Your MindPrint Profile</h3>
                          <p className="text-muted-foreground mb-4">
                            Overall Score: <span className="font-bold text-primary">{results.overallScore}/100</span>
                          </p>
                          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full">
                            Learning Style: {results.learningStyle}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {Object.entries(results.scores).map(([key, score]) => (
                            <Card key={key}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </span>
                                  <span className="text-primary font-bold">{score as number}/100</span>
                                </div>
                                <Progress value={score as number} className="h-2" />
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Lightbulb className="h-5 w-5" />
                              Personalized Recommendations
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {results.recommendations.map((rec: string, index: number) => (
                                <li key={index} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <BarChart2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Results Yet</h3>
                        <p className="text-muted-foreground">
                          Complete the assessment to see your cognitive profile and learning recommendations.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Learning Strategies Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-6 w-6 text-yellow-600" />
                  <CardTitle>Personalized Learning Strategies</CardTitle>
                </div>
                <CardDescription>
                  Based on your cognitive profile, these strategies will help you learn more effectively
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="grid gap-4">
                    {results.recommendations.map((strategy: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium">Strategy {index + 1}</p>
                          <p className="text-sm text-muted-foreground">{strategy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1">Learning Strategies Not Available</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete the assessment to receive personalized learning strategies
                    </p>
                    <Button variant="outline" size="sm" onClick={handleStartAssessment}>
                      Take Assessment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Profile Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your MindPrint Profile</CardTitle>
                  <CardDescription>
                    A summary of your cognitive strengths
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results ? (
                    Object.entries(results.scores).map(([key, score]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-primary rounded-full"></div>
                          <span className="text-sm capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </div>
                        <span className="text-sm font-medium">{score as number}/100</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-muted rounded-full"></div>
                          <span className="text-sm">Working Memory</span>
                        </div>
                        <span className="text-sm font-medium">--</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-muted rounded-full"></div>
                          <span className="text-sm">Processing Speed</span>
                        </div>
                        <span className="text-sm font-medium">--</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-muted rounded-full"></div>
                          <span className="text-sm">Flexible Thinking</span>
                        </div>
                        <span className="text-sm font-medium">--</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-muted rounded-full"></div>
                          <span className="text-sm">Abstract Reasoning</span>
                        </div>
                        <span className="text-sm font-medium">--</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 bg-muted rounded-full"></div>
                          <span className="text-sm">Attention</span>
                        </div>
                        <span className="text-sm font-medium">--</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              
              {/* FAQ Card */}
              <Card>
                <CardHeader>
                  <CardTitle>FAQ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-b pb-3">
                    <p className="font-medium mb-1">How accurate is this assessment?</p>
                    <p className="text-sm text-muted-foreground">
                      Our assessment is backed by cognitive science research and provides insights into your learning preferences.
                    </p>
                  </div>
                  
                  <div className="border-b pb-3">
                    <p className="font-medium mb-1">How long does it take?</p>
                    <p className="text-sm text-muted-foreground">
                      The assessment takes approximately 5-10 minutes to complete.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-medium mb-1">What do I get?</p>
                    <p className="text-sm text-muted-foreground">
                      You'll receive a personalized learning profile with specific recommendations for your cognitive style.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MindPrint;
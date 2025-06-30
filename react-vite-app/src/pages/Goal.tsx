import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Edit, Trash2, RotateCcw, Target, Sparkles, Trophy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface Goal {
  id: string;
  title: string;
  description?: string;
  steps: string[];
  currentStep: number;
  status: "not-started" | "in-progress" | "completed";
  estimatedWeeks: number;
  logs: { [stepIndex: number]: string };
  createdAt?: string;
}

export default function GoalPlanPage() {
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useAuth();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [logs, setLogs] = useState<{ [stepIndex: number]: string }>({});

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    // Try to load goals from localStorage
    const stored = localStorage.getItem("goals");
    let goals: Goal[] = [];
    if (stored) {
      try {
        goals = JSON.parse(stored);
      } catch (e) {
        goals = [];
      }
    }
    const foundGoal = goals.find((g) => g.id === params.id);
    if (foundGoal) {
      setGoal(foundGoal);
      setLogs(foundGoal.logs || {});
    }
  }, [params.id, user, navigate]);

  const handleLogChange = (stepIndex: number, value: string) => {
    setLogs((prev) => ({
      ...prev,
      [stepIndex]: value,
    }));
  };

  const handleStepComplete = (stepIndex: number, completed: boolean) => {
    if (!goal) return;
    const newCurrentStep = completed ? Math.max(goal.currentStep, stepIndex + 1) : stepIndex;
    setGoal({
      ...goal,
      currentStep: newCurrentStep,
      status: newCurrentStep >= goal.steps.length ? "completed" : "in-progress",
    });
  };

  if (!goal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Goal not found</h2>
          <Button onClick={() => navigate("/dashboard") } variant="outline" className="rounded-full">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const isCompleted = goal.status === "completed";

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-100 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-300/10 to-pink-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 relative z-10">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-4 rounded-full hover:bg-white/20 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Goal Summary */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-2xl animate-fade-in">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2 flex items-center">🎯 {goal.title}</CardTitle>
                {goal.description && <p className="text-gray-600 mb-4 text-lg">{goal.description}</p>}
                <div className="flex items-center space-x-4">
                  <Badge
                    className={`${
                      isCompleted
                        ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200"
                        : "bg-gradient-to-r from-orange-100 to-pink-100 text-orange-800 border-orange-200"
                    } shadow-sm`}
                  >
                    {isCompleted ? (
                      <>
                        <Trophy className="h-3 w-3 mr-1" />
                        Completed
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3 w-3 mr-1" />
                        In Progress
                      </>
                    )}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    Est. Time: {goal.estimatedWeeks} weeks
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-white/50 hover:bg-white/70 transition-all duration-200"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-white/50 hover:bg-white/70 transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-white/50 hover:bg-white/70 transition-all duration-200"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Regenerate Steps
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Steps List */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl">Step List</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {goal.steps.map((step, index) => {
              const isStepCompleted = index < goal.currentStep;
              const isCurrentStep = index === goal.currentStep && !isCompleted;

              return (
                <div
                  key={index}
                  className={`border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
                    isStepCompleted
                      ? "bg-gradient-to-r from-green-50/80 to-emerald-50/80 border-green-200 shadow-md"
                      : isCurrentStep
                        ? "bg-gradient-to-r from-orange-50/80 to-pink-50/80 border-orange-200 shadow-md ring-2 ring-orange-200/50"
                        : "bg-gray-50/80 border-gray-200"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center space-x-3 mt-1">
                      <span
                        className={`
                        flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold shadow-lg transition-all duration-300
                        ${
                          isStepCompleted
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white scale-110"
                            : isCurrentStep
                              ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white scale-110 animate-pulse"
                              : "bg-gray-300 text-gray-600"
                        }
                      `}
                      >
                        {index + 1}
                      </span>
                      <Checkbox
                        checked={isStepCompleted}
                        onCheckedChange={(checked) => handleStepComplete(index, checked as boolean)}
                        disabled={isCompleted}
                        className="w-6 h-6 border-2"
                      />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`font-bold mb-3 text-lg transition-all duration-300 ${
                          isStepCompleted ? "text-green-800 line-through opacity-75" : "text-gray-900"
                        }`}
                      >
                        {step}
                      </h3>
                      <Textarea
                        placeholder="Log Entry"
                        value={logs[index] || ""}
                        onChange={(e) => handleLogChange(index, e.target.value)}
                        className="min-h-[120px] resize-none rounded-xl border-0 bg-white/70 backdrop-blur-sm shadow-inner focus:shadow-lg transition-all duration-200"
                        disabled={isCompleted}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Completion Message */}
        {isCompleted && (
          <Card className="mt-8 bg-gradient-to-r from-green-100/80 to-emerald-100/80 backdrop-blur-sm border-0 shadow-2xl animate-bounce-in">
            <CardContent className="p-12 text-center">
              <div className="text-8xl mb-6 animate-bounce">🎉</div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                You've completed this goal! Want to start another?
              </h2>
              <p className="text-green-700 mb-8 text-lg">
                Congratulations on finishing all {goal.steps.length} steps! You're amazing! ✨
              </p>
              <Button
                onClick={() => navigate("/dashboard")}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full px-10 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-bold text-lg"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Start New Goal
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
} 
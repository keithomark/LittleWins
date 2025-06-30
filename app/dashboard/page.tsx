"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Target,
  Calendar,
  RotateCcw,
  Eye,
  LogOut,
  PlayCircle,
  CheckCircle2,
  Clock,
  Zap,
  Trophy,
  Flame,
  Star,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { AddGoalModal } from "@/components/add-goal-modal"

interface Goal {
  id: string
  title: string
  description?: string
  steps: string[]
  currentStep: number
  status: "not-started" | "in-progress" | "completed"
  estimatedWeeks: number
  logs: { [stepIndex: number]: string }
  createdAt: string
  completedAt?: string
}

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [goals, setGoals] = useState<Goal[]>([])
  const [showAddGoal, setShowAddGoal] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }
    setUser(JSON.parse(userData))

    // Load sample goals with more data
    const sampleGoals: Goal[] = [
      {
        id: "1",
        title: "Launch My Online Store",
        description: "Create an e-commerce business selling handmade crafts",
        steps: [
          "Research your niche and target market",
          "Create your first 10 products",
          "Set up your online store platform",
          "Develop marketing strategy and social media",
          "Launch and get your first 10 customers",
        ],
        currentStep: 2,
        status: "in-progress",
        estimatedWeeks: 4,
        createdAt: "2024-01-15",
        logs: {
          0: "Decided to focus on handmade jewelry for young professionals",
          1: "Created 5 necklaces and 5 bracelets. Need 5 more items.",
        },
      },
      {
        id: "2",
        title: "Publish My First Blog",
        description: "Start a tech blog about web development",
        steps: [
          "Choose your blog niche and platform",
          "Write your first 5 blog posts",
          "Design your blog and set up SEO",
          "Promote on social media",
          "Publish and get first 100 readers",
        ],
        currentStep: 5,
        status: "completed",
        estimatedWeeks: 3,
        createdAt: "2024-01-01",
        completedAt: "2024-01-20",
        logs: {
          0: "Chose tech tutorials on Medium",
          1: "Wrote 5 posts about React, Node.js, and web development",
          2: "Set up custom domain and optimized for search",
          3: "Shared on Twitter and LinkedIn",
          4: "Hit 150 readers in first week!",
        },
      },
      {
        id: "3",
        title: "Start Podcast",
        description: "Create a weekly podcast about entrepreneurship",
        steps: [],
        currentStep: 0,
        status: "not-started",
        estimatedWeeks: 0,
        createdAt: "2024-01-25",
        logs: {},
      },
      {
        id: "4",
        title: "Learn Python Programming",
        description: "Master Python for data science",
        steps: [
          "Complete Python basics course",
          "Build 3 small projects",
          "Learn data analysis with pandas",
          "Create a web app with Flask",
          "Contribute to an open source project",
        ],
        currentStep: 1,
        status: "in-progress",
        estimatedWeeks: 8,
        createdAt: "2024-01-10",
        logs: {
          0: "Finished Python crash course on YouTube. Ready for projects!",
        },
      },
    ]
    setGoals(sampleGoals)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const addGoal = (newGoal: Goal) => {
    setGoals([...goals, newGoal])
  }

  const inProgressGoals = goals.filter((g) => g.status === "in-progress")
  const completedGoals = goals.filter((g) => g.status === "completed")
  const notStartedGoals = goals.filter((g) => g.status === "not-started")

  // Calculate stats
  const totalGoals = goals.length
  const completionRate = totalGoals > 0 ? Math.round((completedGoals.length / totalGoals) * 100) : 0
  const totalStepsCompleted = goals.reduce((acc, goal) => acc + goal.currentStep, 0)

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-3 md:px-4 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="h-4 w-4 md:h-6 md:w-6 text-white" />
            </div>
            <span className="text-xl md:text-3xl font-bold text-purple-700">LittleWins</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button
              onClick={() => setShowAddGoal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm md:text-base px-3 md:px-4 py-2 md:py-3"
            >
              <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Add </span>Goal
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer ring-4 ring-purple-100 hover:ring-purple-200 transition-all shadow-lg">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-purple-100 text-purple-700 font-bold">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-xl"
              >
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 md:px-4 py-6 md:py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-6 md:mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-4xl font-bold text-slate-800 mb-1 md:mb-2">Welcome back, {user.name}! 👋</h1>
          <p className="text-slate-600 text-base md:text-lg">Track your progress and celebrate your wins</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <Card className="bg-indigo-600 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-indigo-100 text-xs md:text-sm font-medium">Total Goals</p>
                  <p className="text-xl md:text-3xl font-bold">{totalGoals}</p>
                </div>
                <Target className="h-6 w-6 md:h-8 md:w-8 text-indigo-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-emerald-600 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-xs md:text-sm font-medium">Completed</p>
                  <p className="text-xl md:text-3xl font-bold">{completedGoals.length}</p>
                </div>
                <Trophy className="h-6 w-6 md:h-8 md:w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-pink-100 text-xs md:text-sm font-medium">In Progress</p>
                  <p className="text-xl md:text-3xl font-bold">{inProgressGoals.length}</p>
                </div>
                <Flame className="h-6 w-6 md:h-8 md:w-8 text-pink-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600 text-white border-0 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
            <CardContent className="p-3 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-xs md:text-sm font-medium">Success Rate</p>
                  <p className="text-xl md:text-3xl font-bold">{completionRate}%</p>
                </div>
                <Star className="h-6 w-6 md:h-8 md:w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-6 md:mb-8 bg-purple-100/50 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1">Ready to achieve more? ✨</h3>
                <p className="text-slate-600 text-sm md:text-base">Start a new goal or continue your progress</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button
                  onClick={() => setShowAddGoal(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Goal
                </Button>
                {inProgressGoals.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/goal/${inProgressGoals[0].id}`)}
                    className="border-purple-200 hover:bg-purple-50 rounded-full w-full sm:w-auto"
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Continue Progress
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals Tabs */}
        <Tabs defaultValue="in-progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-1 md:p-2">
            <TabsTrigger
              value="in-progress"
              className="rounded-xl data-[state=active]:bg-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold text-xs md:text-sm px-2 md:px-4"
            >
              <Flame className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">In Progress </span>({inProgressGoals.length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-xl data-[state=active]:bg-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold text-xs md:text-sm px-2 md:px-4"
            >
              <Trophy className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Completed </span>({completedGoals.length})
            </TabsTrigger>
            <TabsTrigger
              value="not-started"
              className="rounded-xl data-[state=active]:bg-slate-500 data-[state=active]:text-white data-[state=active]:shadow-lg font-semibold text-xs md:text-sm px-2 md:px-4"
            >
              <Clock className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Not Started </span>({notStartedGoals.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="space-y-6">
            {inProgressGoals.length === 0 ? (
              <Card className="border-2 border-dashed border-pink-300 bg-white/30 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Flame className="h-16 w-16 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No goals in progress</h3>
                  <p className="text-slate-600 mb-6">Start your first goal to begin your journey!</p>
                  <Button
                    onClick={() => setShowAddGoal(true)}
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Your First Goal
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {inProgressGoals.map((goal, index) => (
                  <GoalCard key={goal.id} goal={goal} index={index} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedGoals.length === 0 ? (
              <Card className="border-2 border-dashed border-emerald-300 bg-white/30 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Trophy className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No completed goals yet</h3>
                  <p className="text-slate-600">Your completed goals will appear here</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {completedGoals.map((goal, index) => (
                  <CompletedGoalCard key={goal.id} goal={goal} index={index} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="not-started" className="space-y-6">
            {notStartedGoals.length === 0 ? (
              <Card className="border-2 border-dashed border-slate-300 bg-white/30 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <Clock className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No pending goals</h3>
                  <p className="text-slate-600">Goals waiting for roadmaps will appear here</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {notStartedGoals.map((goal, index) => (
                  <NotStartedGoalCard key={goal.id} goal={goal} index={index} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <AddGoalModal open={showAddGoal} onOpenChange={setShowAddGoal} onAddGoal={addGoal} />
    </div>
  )
}

function GoalCard({ goal, index }: { goal: Goal; index: number }) {
  const router = useRouter()
  const progress = (goal.currentStep / goal.steps.length) * 100
  const daysAgo = Math.floor((Date.now() - new Date(goal.createdAt).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:scale-105 animate-slide-up overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1 flex items-center group-hover:text-pink-600 transition-colors">
              🎯 {goal.title}
            </CardTitle>
            {goal.description && <p className="text-sm text-slate-600 line-clamp-2">{goal.description}</p>}
          </div>
          <Badge className="bg-pink-100 text-pink-700 border-pink-200 shadow-sm">
            <Flame className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div>
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>
              Progress: Step {goal.currentStep} of {goal.steps.length}
            </span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="relative">
            <Progress value={progress} className="h-3 bg-pink-100" />
            <div
              className="absolute top-0 left-0 h-3 bg-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />📆 {goal.estimatedWeeks} weeks
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {daysAgo} days ago
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/goal/${goal.id}`)}
            className="flex-1 rounded-full border-pink-200 hover:bg-pink-50 hover:border-pink-300 transition-all duration-200"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Plan
          </Button>
          <Button
            size="sm"
            onClick={() => router.push(`/goal/${goal.id}`)}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Zap className="h-4 w-4 mr-1" />
            Log Progress
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CompletedGoalCard({ goal, index }: { goal: Goal; index: number }) {
  const router = useRouter()
  const completedDate = goal.completedAt ? new Date(goal.completedAt).toLocaleDateString() : "Recently"

  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-300 bg-emerald-50/80 backdrop-blur-sm border-0 shadow-lg hover:scale-105 animate-slide-up overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1 flex items-center group-hover:text-emerald-600 transition-colors">
              🎉 {goal.title}
            </CardTitle>
            {goal.description && <p className="text-sm text-slate-600 line-clamp-2">{goal.description}</p>}
          </div>
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm">
            <Trophy className="h-3 w-3 mr-1" />
            Done
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="flex items-center text-emerald-700 font-semibold">
          <CheckCircle2 className="h-4 w-4 mr-2" />✅ All {goal.steps.length} steps completed!
        </div>

        <div className="text-sm text-slate-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            Completed on {completedDate}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/goal/${goal.id}`)}
            className="flex-1 rounded-full border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Plan
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-full border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 bg-transparent"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Restart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function NotStartedGoalCard({ goal, index }: { goal: Goal; index: number }) {
  const daysAgo = Math.floor((Date.now() - new Date(goal.createdAt).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-300 bg-amber-50/80 backdrop-blur-sm border-0 shadow-lg hover:scale-105 animate-slide-up overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardHeader className="pb-3 relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-1 flex items-center group-hover:text-amber-600 transition-colors">
              📝 {goal.title}
            </CardTitle>
            {goal.description && <p className="text-sm text-slate-600 line-clamp-2">{goal.description}</p>}
          </div>
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 shadow-sm">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 relative z-10">
        <div className="text-amber-700 text-sm">
          <div className="flex items-center justify-between">
            <span>Status: No roadmap yet</span>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {daysAgo} days ago
            </div>
          </div>
        </div>

        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          <Zap className="h-4 w-4 mr-2" />
          Generate AI Plan
        </Button>
      </CardContent>
    </Card>
  )
}

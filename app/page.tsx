"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Target, TrendingUp, Zap, BookOpen, Store, Youtube, Code, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [bigText, setBigText] = useState("")
  const [littleText, setLittleText] = useState("")
  const [showBigCursor, setShowBigCursor] = useState(false)
  const [showLittleCursor, setShowLittleCursor] = useState(false)

  const bigFullText = "Bloated · Intimidating · Garbled"
  const littleFullText = "Low-Intensity Tasks That Lead to Excellence"

  useEffect(() => {
    // Start typing BIG after 1 second
    const startBigTimer = setTimeout(() => {
      setShowBigCursor(true)
      let bigIndex = 0

      const bigTypingInterval = setInterval(() => {
        if (bigIndex < bigFullText.length) {
          setBigText(bigFullText.slice(0, bigIndex + 1))
          bigIndex++
        } else {
          clearInterval(bigTypingInterval)
          setShowBigCursor(false)

          // Start typing LITTLE after BIG is done + 1 second delay
          setTimeout(() => {
            setShowLittleCursor(true)
            let littleIndex = 0

            const littleTypingInterval = setInterval(() => {
              if (littleIndex < littleFullText.length) {
                setLittleText(littleFullText.slice(0, littleIndex + 1))
                littleIndex++
              } else {
                clearInterval(littleTypingInterval)
                setShowLittleCursor(false)
              }
            }, 50) // Slightly slower for longer text
          }, 1000)
        }
      }, 80) // Typing speed
    }, 1000)

    return () => {
      clearTimeout(startBigTimer)
    }
  }, [])

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true)
    setTimeout(() => {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Alex Johnson",
          email: "alex@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
        }),
      )
      router.push("/dashboard")
    }, 1500)
  }

  const exampleGoals = [
    { title: "Write a children's book", icon: BookOpen, color: "bg-purple-500" },
    { title: "Launch an Etsy store", icon: Store, color: "bg-emerald-500" },
    { title: "Build a YouTube channel", icon: Youtube, color: "bg-pink-500" },
    { title: "Learn Python", icon: Code, color: "bg-indigo-500" },
  ]

  const features = [
    {
      icon: Zap,
      title: "AI-generated plans",
      description: "Smart roadmaps tailored to your goals",
      color: "bg-purple-500",
    },
    {
      icon: Target,
      title: "3–5 steps only",
      description: "No overwhelming to-do lists",
      color: "bg-indigo-500",
    },
    {
      icon: TrendingUp,
      title: "Log your progress",
      description: "Track wins and stay motivated",
      color: "bg-emerald-500",
    },
    {
      icon: CheckCircle,
      title: "Track multiple goals",
      description: "Organize all your ambitions",
      color: "bg-pink-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="border-b border-white/20 bg-white/10 backdrop-blur-xl sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
              <Target className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-purple-700">LittleWins</span>
          </div>
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold"
          >
            {isLoggingIn ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Login with Google
              </>
            )}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center bg-purple-100 rounded-full px-6 py-2 mb-8 border border-purple-200 shadow-sm">
              <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-slate-700 font-medium text-sm">AI-powered goal breakdown system</span>
            </div>
          </div>

          {/* Main Title with BIG and LITTLE styling */}
          <h1 className="text-6xl md:text-7xl font-bold text-slate-800 mb-8 leading-tight animate-slide-up">
            Turn Your <span className="text-red-600 font-black">BIG</span> Goal Into{" "}
            <span className="text-emerald-600 font-black">LITTLE</span> Wins
          </h1>

          {/* Typewriter Acronym Subtitles */}
          <div className="mb-12 space-y-4 animate-slide-up delay-200">
            <div className="text-xl md:text-2xl font-semibold min-h-[2.5rem] flex items-center justify-center">
              <span className="text-red-600 font-bold">BIG</span>
              <span className="text-slate-500 mx-2">–</span>
              <span className="text-slate-700">
                {bigText}
                {showBigCursor && <span className="inline-block w-0.5 h-6 bg-red-600 ml-1 animate-pulse"></span>}
              </span>
            </div>
            <div className="text-xl md:text-2xl font-semibold min-h-[2.5rem] flex items-center justify-center">
              <span className="text-emerald-600 font-black">LITTLE</span>
              <span className="text-slate-500 mx-2">–</span>
              <span className="text-slate-700">
                {littleText}
                {showLittleCursor && <span className="inline-block w-0.5 h-6 bg-emerald-600 ml-1 animate-pulse"></span>}
              </span>
            </div>
          </div>

          <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-300">
            No more overwhelm. LittleWins helps you break down your ambitions into 3–5 actionable steps with AI-powered
            guidance.
          </p>

          <Button
            size="lg"
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="bg-purple-600 hover:bg-purple-700 text-white text-xl px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 font-bold animate-slide-up delay-400"
          >
            {isLoggingIn ? "Getting Started..." : "Get Started – It's Free"}
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Example Goals Gallery */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Popular Goals to Get You Started</h2>
          <p className="text-slate-600 text-lg">Join thousands achieving their dreams, one small win at a time</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {exampleGoals.map((goal, index) => (
            <Card
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105 bg-white/80 backdrop-blur-sm overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 text-center relative">
                <div
                  className={`w-16 h-16 ${goal.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <goal.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg group-hover:text-slate-700 transition-colors">
                  {goal.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why It Works Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="bg-white/30 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why It Works</h2>
            <p className="text-slate-600 text-lg">Science-backed approach to achieving your goals</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`w-20 h-20 ${feature.color} rounded-2xl p-5 mx-auto mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}
                >
                  <feature.icon className="h-10 w-10 text-white mx-auto" />
                </div>
                <h3 className="font-bold text-slate-800 mb-3 text-lg group-hover:text-slate-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Ready to Start Winning?</h2>
          <p className="text-xl text-slate-600 mb-8">
            Join thousands who've turned their big dreams into small, achievable wins
          </p>
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold"
          >
            Start Your First Goal
            <Target className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  )
}

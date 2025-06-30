"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Sparkles, Zap } from "lucide-react"

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
}

interface AddGoalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddGoal: (goal: Goal) => void
}

export function AddGoalModal({ open, onOpenChange, onAddGoal }: AddGoalModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const generateSteps = async () => {
    if (!title.trim()) return

    setIsGenerating(true)

    // Simulate AI generation with more realistic timing
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // AI-generated steps based on goal type
    const sampleSteps = getSampleSteps(title)

    const newGoal: Goal = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || undefined,
      steps: sampleSteps.steps,
      currentStep: 0,
      status: "in-progress",
      estimatedWeeks: sampleSteps.weeks,
      logs: {},
      createdAt: new Date().toISOString().split("T")[0],
    }

    onAddGoal(newGoal)
    setTitle("")
    setDescription("")
    setIsGenerating(false)
    onOpenChange(false)
  }

  const getSampleSteps = (goalTitle: string) => {
    const lowerTitle = goalTitle.toLowerCase()

    if (lowerTitle.includes("podcast")) {
      return {
        steps: [
          "Decide your niche and format",
          "Write your first 3 scripts",
          "Record sample episodes",
          "Create your podcast art & intro",
          "Publish on Spotify & Apple",
        ],
        weeks: 3,
      }
    } else if (lowerTitle.includes("youtube") || lowerTitle.includes("channel")) {
      return {
        steps: [
          "Define your content niche and target audience",
          "Create your first 5 videos",
          "Set up your channel branding and thumbnails",
          "Develop a consistent posting schedule",
          "Reach 100 subscribers and 1000 views",
        ],
        weeks: 6,
      }
    } else if (lowerTitle.includes("book") || lowerTitle.includes("write")) {
      return {
        steps: [
          "Outline your story and main characters",
          "Write the first draft (aim for 10,000 words)",
          "Edit and revise your manuscript",
          "Design a cover and format for publishing",
          "Publish and promote to get first 10 readers",
        ],
        weeks: 8,
      }
    } else if (lowerTitle.includes("business") || lowerTitle.includes("startup")) {
      return {
        steps: [
          "Validate your business idea with potential customers",
          "Create a simple business plan and budget",
          "Build your minimum viable product (MVP)",
          "Launch and acquire your first 10 customers",
          "Establish systems for growth and scaling",
        ],
        weeks: 12,
      }
    } else {
      return {
        steps: [
          "Research and plan your approach",
          "Start with the fundamentals",
          "Practice and build your skills",
          "Create your first project or milestone",
          "Share your progress and get feedback",
        ],
        weeks: 4,
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg w-[95vw] max-w-[95vw] sm:w-full bg-white/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden mx-auto">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-pink-100/20"></div>
        <DialogHeader className="relative z-10">
          <DialogTitle className="flex items-center text-2xl font-bold">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            Add Goal
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 md:space-y-6 relative z-10 p-1">
          <div>
            <Label htmlFor="title" className="text-sm font-semibold text-gray-700 mb-2 block">
              Goal Name
            </Label>
            <Input
              id="title"
              placeholder="e.g., Start a podcast, Learn Python, Write a book..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isGenerating}
              className="rounded-2xl border-0 bg-white/70 backdrop-blur-sm shadow-inner h-10 md:h-12 text-sm md:text-base focus:shadow-lg transition-all duration-200"
            />
          </div>
          <div>
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700 mb-2 block">
              (Optional) Describe the goal in one sentence
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your goal in one sentence..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isGenerating}
              className="resize-none rounded-2xl border-0 bg-white/70 backdrop-blur-sm shadow-inner focus:shadow-lg transition-all duration-200"
              rows={3}
            />
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              onClick={generateSteps}
              disabled={!title.trim() || isGenerating}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl h-10 md:h-12 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold text-sm md:text-base"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-3 w-3 md:h-4 md:w-4 mr-2 animate-spin" />
                  Generating Steps...
                </>
              ) : (
                <>
                  <Zap className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Generate Steps
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isGenerating}
              className="rounded-2xl h-10 md:h-12 bg-white/50 hover:bg-white/70 transition-all duration-200 sm:w-auto"
            >
              Cancel
            </Button>
          </div>
          {isGenerating && (
            <div className="text-center bg-gradient-to-r from-orange-50 to-pink-50 p-4 rounded-2xl border border-orange-200/50 animate-pulse">
              <div className="flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg"></div>
              </div>
              <p className="text-sm text-gray-600">Generating steps for your goal...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

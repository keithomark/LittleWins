"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2, Sparkles, Zap } from "lucide-react"
import { getGeminiGoalSuggestions } from "@/lib/gemini"

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
  const [suggestedWeeks, setSuggestedWeeks] = useState<number | null>(null)
  const [steps, setSteps] = useState<string[]>([])
  const [weeks, setWeeks] = useState<number | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!title.trim()) return
    setIsGenerating(true)
    setShowSuggestions(false)
    setError(null)
    try {
      const result = await getGeminiGoalSuggestions(title, description)
      setSteps(result.steps)
      setWeeks(result.weeks)
      setSuggestedWeeks(result.weeks)
      setShowSuggestions(true)
    } catch (err: any) {
      setError(err?.message || 'Failed to generate steps. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAccept = () => {
    if (!title.trim() || !steps.length || !weeks) return
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim() || undefined,
      steps,
      currentStep: 0,
      status: "in-progress",
      estimatedWeeks: weeks,
      logs: {},
      createdAt: new Date().toISOString().split("T")[0],
    }
    onAddGoal(newGoal)
    setTitle("")
    setDescription("")
    setSteps([])
    setWeeks(null)
    setShowSuggestions(false)
    setError(null)
    onOpenChange(false)
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
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 rounded-xl px-4 py-2 text-sm font-semibold">
              {error}
            </div>
          )}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              onClick={handleGenerate}
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
          {showSuggestions && !error && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mt-4">
              <h4 className="font-semibold text-orange-700 mb-2">Suggested Steps & Timeline</h4>
              <div className="space-y-2 mb-2">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="text-gray-500 text-xs">Step {idx + 1}:</span>
                    <Input
                      value={step}
                      onChange={e => {
                        const newSteps = [...steps]
                        newSteps[idx] = e.target.value
                        setSteps(newSteps)
                      }}
                      className="flex-1 rounded-lg border px-2 py-1 text-sm"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-gray-500 text-xs">Estimated Timeline (weeks):</span>
                <Input
                  type="number"
                  min={1}
                  max={52}
                  value={weeks ?? suggestedWeeks ?? ''}
                  onChange={e => setWeeks(Number(e.target.value))}
                  className="w-20 rounded-lg border px-2 py-1 text-sm"
                />
              </div>
              <Button
                onClick={handleAccept}
                className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-2 font-semibold shadow-lg"
                disabled={steps.length < 3 || !weeks}
              >
                Accept & Add Goal
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

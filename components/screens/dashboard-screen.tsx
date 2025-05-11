"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Upload, Droplet, Sun, Footprints, Clock, Utensils, ArrowRight } from "lucide-react"
import type { UserData } from "@/lib/user-data-provider"

interface DashboardScreenProps {
  userData: UserData
}

export default function DashboardScreen({ userData }: DashboardScreenProps) {
  const { toast } = useToast()
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = () => {
    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "Upload successful",
        description: "Your walking data has been uploaded and analyzed",
      })
    }, 2000)
  }

  const tips = [
    {
      icon: <Droplet className="w-4 h-4 text-blue-500" />,
      text: "Stay hydrated throughout the day",
    },
    {
      icon: <Sun className="w-4 h-4 text-yellow-500" />,
      text: "Get daily vitamin D from sunlight",
    },
    {
      icon: <Footprints className="w-4 h-4 text-green-500" />,
      text: "Wear proper footwear with good support",
    },
    {
      icon: <Clock className="w-4 h-4 text-purple-500" />,
      text: "Take regular breaks when walking",
    },
    {
      icon: <Utensils className="w-4 h-4 text-red-500" />,
      text: "Eat a balanced diet rich in calcium",
    },
  ]

  const getRiskColor = () => {
    switch (userData.fallRisk) {
      case "low":
        return "bg-green-100 text-green-600"
      case "medium":
        return "bg-yellow-100 text-yellow-600"
      case "high":
        return "bg-red-100 text-red-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getRiskMessage = () => {
    switch (userData.fallRisk) {
      case "low":
        return "Your walking pattern indicates a low risk of falling"
      case "medium":
        return "Your walking pattern shows some instability. Take care."
      case "high":
        return "Your walking pattern indicates a high risk of falling. Please be cautious."
      default:
        return "We need more data to assess your fall risk."
    }
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="border border-blue-200 mb-6">
          <CardContent className="p-6">
            <h2 className="text-center text-blue-600 font-medium mb-4">Upload Walking Data</h2>

            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors",
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400",
                isUploading && "opacity-70 pointer-events-none",
              )}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragging(false)
                handleUpload()
              }}
              onClick={handleUpload}
            >
              <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 mb-2">
                <Upload size={20} className={isUploading ? "animate-pulse" : ""} />
              </div>

              {isUploading ? (
                <p className="text-sm text-center text-gray-600">Uploading...</p>
              ) : (
                <p className="text-sm text-center text-gray-600">Tap to upload walking data</p>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Walking Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Steps</span>
                <span className="text-sm text-gray-600">
                  {userData.steps.toLocaleString()} / {userData.stepsGoal.toLocaleString()}
                </span>
              </div>
              <Progress value={(userData.steps / userData.stepsGoal) * 100} className="h-2" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Walking Time</span>
                <span className="text-sm text-gray-600">{userData.walkingTime} min</span>
              </div>
              <Progress value={(userData.walkingTime / userData.walkingTimeGoal) * 100} className="h-2" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Stability Score</span>
                <span className="text-sm text-gray-600">{userData.stabilityScore}%</span>
              </div>
              <Progress value={userData.stabilityScore} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Fall Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className={`w-24 h-24 rounded-full ${getRiskColor()} flex items-center justify-center mb-4`}>
              <span className="text-xl font-medium capitalize">{userData.fallRisk}</span>
            </div>
            <p className="text-sm text-center text-gray-600 max-w-xs">{getRiskMessage()}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Personalized Program</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Based on your walking data, we've created a personalized program targeting your specific needs.
            </p>

            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-blue-700 mb-2">Today's Recommendation</h3>
              <p className="text-sm text-blue-600">Practice balance exercises for 10 minutes to improve stability.</p>
            </div>

            <Button
              className="w-full flex items-center justify-center gap-2"
              onClick={() =>
                toast({
                  title: "Program Started",
                  description: "Your personalized walking program has been started",
                })
              }
            >
              Start Full Program
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="mb-20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Tips for Better Walking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {tip.icon}
                  </div>
                  <p className="text-sm">{tip.text}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

import { cn } from "@/lib/utils"

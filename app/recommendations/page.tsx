"use client"

import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Info } from "lucide-react"
import Link from "next/link"

export default function Recommendations() {
  const { t } = useTranslation()

  // This would typically come from an API based on the user's walking data
  const recommendations = [
    {
      title: "Improve Balance",
      description: "Practice standing on one foot for 30 seconds each day to improve balance.",
      priority: "high",
    },
    {
      title: "Increase Walking Time",
      description: "Try to increase your daily walking time by 5 minutes each week.",
      priority: "medium",
    },
    {
      title: "Strengthen Leg Muscles",
      description: "Do 10 chair squats twice a day to strengthen your leg muscles.",
      priority: "high",
    },
    {
      title: "Maintain Hydration",
      description: "Drink at least 8 glasses of water daily to stay hydrated.",
      priority: "medium",
    },
    {
      title: "Check Footwear",
      description: "Ensure your shoes provide good support and have non-slip soles.",
      priority: "high",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <main className="min-h-screen bg-[#f0f7ff] pb-20">
      <div className="container mx-auto px-4 max-w-md pt-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <h1 className="text-xl font-bold text-blue-600 mb-4">Personalized Recommendations</h1>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-700">AI-Powered Recommendations</h3>
              <p className="text-sm text-blue-600 mt-1">
                These recommendations are generated based on your walking patterns and are designed to help reduce your
                fall risk.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getPriorityColor(rec.priority)}`}
                  >
                    {rec.priority}
                  </div>
                  <div>
                    <h3 className="font-medium">{rec.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <Button variant="outline" size="sm" className="mr-2">
                    Remind Me
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700">Get More Recommendations</Button>
        </div>
      </div>
    </main>
  )
}

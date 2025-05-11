"use client"

import { useTranslation } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Sun, Footprints, Clock, Utensils } from "lucide-react"

export default function TipsForElderly() {
  const { t } = useTranslation()

  const tips = [
    {
      icon: <Droplet className="w-4 h-4 text-blue-500" />,
      text: "Stay hydrated",
    },
    {
      icon: <Sun className="w-4 h-4 text-yellow-500" />,
      text: "Get daily vitamin D from sunlight",
    },
    {
      icon: <Footprints className="w-4 h-4 text-green-500" />,
      text: "Wear proper footwear",
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

  return (
    <Card className="mt-6 border border-gray-200 mb-8">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Tips for Elderly</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">{tip.icon}</div>
              <p className="text-sm">{tip.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

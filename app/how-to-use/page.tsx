"use client"

import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload, BarChart, AlertTriangle, Heart } from "lucide-react"
import Link from "next/link"

export default function HowToUse() {
  const { t } = useTranslation()

  const steps = [
    {
      icon: <Upload className="w-5 h-5 text-blue-500" />,
      title: "Upload Walking Data",
      description: "Upload your walking data from your fitness device or smartphone app.",
    },
    {
      icon: <BarChart className="w-5 h-5 text-green-500" />,
      title: "View Analysis",
      description: "WalkSafe analyzes your walking patterns and provides insights on your stability and fall risk.",
    },
    {
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      title: "Get Alerts",
      description: "Receive alerts when your walking pattern shows signs of instability or increased fall risk.",
    },
    {
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: "Follow Recommendations",
      description: "Follow personalized recommendations to improve your walking stability and reduce fall risk.",
    },
  ]

  return (
    <main className="min-h-screen bg-[#f0f7ff] pb-20">
      <div className="container mx-auto px-4 max-w-md pt-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center text-blue-600">How to Use WalkSafe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}

            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <h3 className="font-medium text-blue-700">Need Help?</h3>
              <p className="text-sm text-blue-600 mt-1">
                If you need assistance with using WalkSafe, please contact our support team at support@walksafe.com or
                call us at 1-800-WALKSAFE.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

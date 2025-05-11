"use client"

import { useTranslation } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Info, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import type { UserData } from "@/lib/mock-data-provider"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"

interface RecommendationsScreenProps {
  userData: UserData
}

export default function RecommendationsScreen({ userData }: RecommendationsScreenProps) {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [completedRecommendations, setCompletedRecommendations] = useState<number[]>([])

  // This would typically come from an API based on the user's walking data
  const recommendations = [
    {
      id: 1,
      title: t("improveBalance"),
      description: t("improveBalanceDescription"),
      priority: "high",
    },
    {
      id: 2,
      title: t("increaseWalkingTime"),
      description: t("increaseWalkingTimeDescription"),
      priority: "medium",
    },
    {
      id: 3,
      title: t("strengthenLegMuscles"),
      description: t("strengthenLegMusclesDescription"),
      priority: "high",
    },
    {
      id: 4,
      title: t("maintainHydration"),
      description: t("maintainHydrationDescription"),
      priority: "medium",
    },
    {
      id: 5,
      title: t("checkFootwear"),
      description: t("checkFootwearDescription"),
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

  const handleMarkComplete = (id: number) => {
    if (completedRecommendations.includes(id)) {
      setCompletedRecommendations(completedRecommendations.filter((recId) => recId !== id))
      toast({
        title: t("taskIncomplete"),
        description: t("taskMarkedIncomplete"),
      })
    } else {
      setCompletedRecommendations([...completedRecommendations, id])
      toast({
        title: t("taskComplete"),
        description: t("taskMarkedComplete"),
      })
    }
  }

  const handleRemindMe = (title: string) => {
    toast({
      title: t("reminderSet"),
      description: t("reminderSetFor").replace("{title}", title),
    })
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-xl font-bold text-blue-600 mb-4">{t("personalizedRecommendations")}</h1>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-700">{t("aiPoweredRecommendations")}</h3>
              <p className="text-sm text-blue-600 mt-1">{t("recommendationsDescription")}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4 mb-6">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <Card className={completedRecommendations.includes(rec.id) ? "border-green-200 bg-green-50" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getPriorityColor(rec.priority)}`}
                  >
                    {t(rec.priority)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{rec.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                  </div>
                </div>
                <div className="flex justify-end mt-3">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleRemindMe(rec.title)}>
                    {t("remindMe")}
                  </Button>
                  <Button
                    size="sm"
                    className={
                      completedRecommendations.includes(rec.id)
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }
                    onClick={() => handleMarkComplete(rec.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {completedRecommendations.includes(rec.id) ? t("completed") : t("markComplete")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("progressTracker")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{t("completedTasks")}</span>
              <span className="text-sm font-medium">
                {completedRecommendations.length} / {recommendations.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div
                className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${(completedRecommendations.length / recommendations.length) * 100}%` }}
              ></div>
            </div>

            <p className="text-sm text-gray-600">
              {completedRecommendations.length === 0
                ? t("startCompletingTasks")
                : completedRecommendations.length === recommendations.length
                  ? t("allTasksCompleted")
                  : t("keepGoing")}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="mb-20"
      >
        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={() =>
            toast({
              title: t("moreRecommendations"),
              description: t("generatingMoreRecommendations"),
            })
          }
        >
          {t("getMoreRecommendations")}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    </div>
  )
}

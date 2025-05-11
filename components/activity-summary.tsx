"use client"

import { useTranslation } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ActivitySummary() {
  const { t } = useTranslation()

  // This would typically come from an API or state management
  const activityData = {
    steps: {
      current: 3542,
      goal: 5000,
      percentage: (3542 / 5000) * 100,
    },
    walkingTime: {
      minutes: 45,
      goal: 60,
      percentage: (45 / 60) * 100,
    },
    stabilityScore: {
      score: 85,
      percentage: 85,
    },
  }

  return (
    <Card className="mt-6 border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{t("todaysActivity")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{t("steps")}</span>
            <span className="text-sm text-gray-600">
              {activityData.steps.current.toLocaleString()} / {activityData.steps.goal.toLocaleString()}
            </span>
          </div>
          <Progress value={activityData.steps.percentage} className="h-2" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{t("walkingTime")}</span>
            <span className="text-sm text-gray-600">
              {activityData.walkingTime.minutes} {t("min")}
            </span>
          </div>
          <Progress value={activityData.walkingTime.percentage} className="h-2" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{t("stabilityScore")}</span>
            <span className="text-sm text-gray-600">{activityData.stabilityScore.score}%</span>
          </div>
          <Progress value={activityData.stabilityScore.percentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

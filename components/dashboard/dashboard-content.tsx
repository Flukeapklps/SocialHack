"use client"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTranslation } from "@/components/language-provider"
import { ArrowRight, Footprints, Clock, Activity, Shield } from "lucide-react"
import type { UserData } from "@/lib/user-data-provider"
import Link from "next/link"

interface DashboardContentProps {
  userData: UserData
}

export default function DashboardContent({ userData }: DashboardContentProps) {
  const { toast } = useToast()
  const { t } = useTranslation()

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
        return t("lowRiskMessage")
      case "medium":
        return t("mediumRiskMessage")
      case "high":
        return t("highRiskMessage")
      default:
        return t("unknownRiskMessage")
    }
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-600">{t("overview")}</h2>
          <Link href="/upload">
            <Button variant="outline" size="sm">
              {t("uploadWalkingVideo")}
            </Button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Footprints className="w-5 h-5 mr-2 text-blue-500" />
                {t("stepTracking")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">{userData.steps.toLocaleString()}</span>
                <span className="text-sm text-gray-500">{t("stepsGoal", { goal: userData.stepsGoal })}</span>
              </div>
              <div className="space-y-1">
                <Progress value={(userData.steps / userData.stepsGoal) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>{userData.stepsGoal.toLocaleString()}</span>
                </div>
              </div>
              <Link href="/activity" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  {t("viewDetails")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-500" />
                {t("walkingTime")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">
                  {userData.walkingTime} <span className="text-lg">{t("min")}</span>
                </span>
                <span className="text-sm text-gray-500">{t("timeGoal", { goal: userData.walkingTimeGoal })}</span>
              </div>
              <div className="space-y-1">
                <Progress value={(userData.walkingTime / userData.walkingTimeGoal) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0 {t("min")}</span>
                  <span>
                    {userData.walkingTimeGoal} {t("min")}
                  </span>
                </div>
              </div>
              <Link href="/activity" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  {t("viewDetails")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Activity className="w-5 h-5 mr-2 text-green-500" />
                {t("stabilityScore")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">
                  {userData.stabilityScore}
                  <span className="text-lg">%</span>
                </span>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor()}`}>
                  {t(userData.fallRisk)}
                </div>
              </div>
              <div className="space-y-1">
                <Progress value={userData.stabilityScore} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              <Link href="/stability" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  {t("viewAnalysis")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Shield className="w-5 h-5 mr-2 text-red-500" />
                {t("fallRiskAssessment")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center py-2">
                <div className={`w-16 h-16 rounded-full ${getRiskColor()} flex items-center justify-center mb-2`}>
                  <span className="text-lg font-medium capitalize">{t(userData.fallRisk)}</span>
                </div>
                <p className="text-sm text-center text-gray-600">{getRiskMessage()}</p>
              </div>
              <Link href="/fall-risk" className="block">
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  {t("viewFullReport")}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="mb-20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("recentActivity")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.walkingSessions.map((session, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">{session.time}</p>
                      <p className="text-sm text-gray-600">
                        {session.duration} {t("min")} • {session.steps} {t("steps")}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600"
                    onClick={() =>
                      toast({
                        title: t("sessionDetails"),
                        description: t("sessionDetailsDescription", { time: session.time }),
                      })
                    }
                  >
                    {t("details")}
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { UserData } from "@/lib/user-data-provider"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/components/language-provider"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts"

interface FallRiskContentProps {
  userData: UserData
}

export default function FallRiskContent({ userData }: FallRiskContentProps) {
  const { toast } = useToast()
  const { t } = useTranslation()

  // Fall risk factors data
  const riskFactorsData = [
    { name: t("balance"), score: 75 },
    { name: t("strength"), score: 65 },
    { name: t("gaitSpeed"), score: 80 },
    { name: t("coordination"), score: 70 },
    { name: t("reactionTime"), score: 60 },
  ]

  // Historical risk data
  const historicalRiskData = [
    { month: t("jan"), risk: 35 },
    { month: t("feb"), risk: 32 },
    { month: t("mar"), risk: 30 },
    { month: t("apr"), risk: 28 },
    { month: t("may"), risk: 25 },
    { month: t("jun"), risk: 22 },
  ]

  // Improvement opportunities data
  const improvementData = [
    { area: t("balanceExercises"), potential: 85 },
    { area: t("strengthTraining"), potential: 75 },
    { area: t("gaitTraining"), potential: 65 },
    { area: t("homeModifications"), potential: 90 },
    { area: t("properFootwear"), potential: 80 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

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
          <h2 className="text-xl font-bold text-blue-600">{t("fallRiskAnalysis")}</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: t("shareReport"),
                description: t("shareReportDescription"),
              })
            }
          >
            {t("shareWithDoctor")}
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("currentRiskAssessment")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className={`w-32 h-32 rounded-full ${getRiskColor()} flex items-center justify-center mb-4`}>
                <span className="text-2xl font-medium capitalize">{t(userData.fallRisk)}</span>
              </div>
              <p className="text-center text-gray-600 max-w-md mb-4">{getRiskMessage()}</p>
              <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className={`h-2.5 rounded-full ${
                    userData.fallRisk === "low"
                      ? "bg-green-500"
                      : userData.fallRisk === "medium"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{
                    width: userData.fallRisk === "low" ? "25%" : userData.fallRisk === "medium" ? "50%" : "75%",
                  }}
                ></div>
              </div>
              <div className="flex justify-between w-full max-w-md text-xs text-gray-500">
                <span>{t("low")}</span>
                <span>{t("medium")}</span>
                <span>{t("high")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">{t("riskFactors")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskFactorsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="score"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      animationDuration={1500}
                    >
                      {riskFactorsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-center text-gray-600 mt-4">{t("riskFactorsDescription")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">{t("riskTrend")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalRiskData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="risk"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-center text-gray-600 mt-4">{t("riskTrendDescription")}</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("improvementOpportunities")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={improvementData} layout="vertical" margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="area" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="potential" fill="#3b82f6" animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-center text-gray-600 mt-4">{t("improvementOpportunitiesDescription")}</p>
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
            <CardTitle className="text-lg font-medium">{t("aiRecommendations")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">{t("personalizedRecommendations")}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">{t("recommendation1Title")}</p>
                    <p className="text-sm text-blue-700 mt-1">{t("recommendation1Description")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">{t("recommendation2Title")}</p>
                    <p className="text-sm text-blue-700 mt-1">{t("recommendation2Description")}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">{t("recommendation3Title")}</p>
                    <p className="text-sm text-blue-700 mt-1">{t("recommendation3Description")}</p>
                  </div>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="mb-20"
      >
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() =>
            toast({
              title: t("detailedReport"),
              description: t("detailedReportDescription"),
            })
          }
        >
          {t("generateDetailedReport")}
        </Button>
      </motion.div>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { UserData } from "@/lib/user-data-provider"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/components/language-provider"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

interface StabilityContentProps {
  userData: UserData
}

export default function StabilityContent({ userData }: StabilityContentProps) {
  const { toast } = useToast()
  const { t } = useTranslation()

  // Gait analysis data
  const gaitData = [
    { time: "0s", stability: 75 },
    { time: "0.5s", stability: 82 },
    { time: "1.0s", stability: 65 },
    { time: "1.5s", stability: 88 },
    { time: "2.0s", stability: 72 },
    { time: "2.5s", stability: 90 },
    { time: "3.0s", stability: 78 },
    { time: "3.5s", stability: 85 },
    { time: "4.0s", stability: 68 },
    { time: "4.5s", stability: 80 },
    { time: "5.0s", stability: 85 },
  ]

  // Pressure distribution data
  const pressureData = [
    { name: t("leftHeel"), value: 30 },
    { name: t("leftMid"), value: 25 },
    { name: t("leftToe"), value: 15 },
    { name: t("rightHeel"), value: 32 },
    { name: t("rightMid"), value: 28 },
    { name: t("rightToe"), value: 18 },
  ]

  // Stability factors data
  const stabilityFactors = [
    { factor: t("balance"), value: 75 },
    { factor: t("posture"), value: 80 },
    { factor: t("gaitRhythm"), value: 85 },
    { factor: t("stepSymmetry"), value: 70 },
    { factor: t("turnStability"), value: 65 },
  ]

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-600">{t("stabilityAnalysis")}</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: t("aiAnalysis"),
                description: t("aiAnalysisDescription"),
              })
            }
          >
            {t("generateReport")}
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("currentStabilityScore")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-32 h-32 mb-4">
                <div className="absolute inset-0 rounded-full bg-blue-100"></div>
                <div
                  className="absolute inset-0 rounded-full bg-blue-500"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${userData.stabilityScore > 50 ? "100%" : "50%"} 0%, 100% ${userData.stabilityScore}%, 100% 100%, 0% 100%, 0% 0%, ${userData.stabilityScore < 50 ? "0%" : "50%"} 0%)`,
                  }}
                ></div>
                <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">
                    {userData.stabilityScore}
                    <span className="text-lg">%</span>
                  </span>
                </div>
              </div>
              <p className="text-center text-gray-600 max-w-md">{t("stabilityScoreDescription")}</p>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="gait" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="gait">{t("gaitPattern")}</TabsTrigger>
            <TabsTrigger value="pressure">{t("pressureDistribution")}</TabsTrigger>
            <TabsTrigger value="factors">{t("stabilityFactors")}</TabsTrigger>
          </TabsList>

          <TabsContent value="gait">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">{t("gaitStabilityAnalysis")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={gaitData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="stability"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-center text-gray-600 mt-4">{t("gaitAnalysisDescription")}</p>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-700 mb-2">{t("gaitAnalysisInsights")}</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <p>{t("gaitInsight1")}</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <p>{t("gaitInsight2")}</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <p>{t("gaitInsight3")}</p>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pressure">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">{t("footPressureDistribution")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pressureData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#10b981" animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-center text-gray-600 mt-4">{t("pressureDistributionDescription")}</p>

                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-700 mb-2">{t("pressureDistributionInsights")}</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <p>{t("pressureInsight1")}</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <p>{t("pressureInsight2")}</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <p>{t("pressureInsight3")}</p>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="factors">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">{t("stabilityFactorsAnalysis")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={stabilityFactors}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="factor" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar
                        name={t("stabilityScore")}
                        dataKey="value"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                        animationDuration={1500}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-center text-gray-600 mt-4">{t("stabilityFactorsDescription")}</p>

                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-purple-700 mb-2">{t("stabilityFactorsInsights")}</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="bg-purple-200 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        1
                      </span>
                      <p>{t("factorsInsight1")}</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-purple-200 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        2
                      </span>
                      <p>{t("factorsInsight2")}</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-purple-200 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        3
                      </span>
                      <p>{t("factorsInsight3")}</p>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mb-20"
      >
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() =>
            toast({
              title: t("fullAnalysis"),
              description: t("fullAnalysisDescription"),
            })
          }
        >
          {t("generateFullAnalysis")}
        </Button>
      </motion.div>
    </div>
  )
}

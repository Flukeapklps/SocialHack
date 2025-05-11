"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import type { UserData } from "@/lib/user-data-provider"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/components/language-provider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

interface ActivityContentProps {
  userData: UserData
}

export default function ActivityContent({ userData }: ActivityContentProps) {
  const { toast } = useToast()
  const { t } = useTranslation()

  // Weekly data for chart
  const weeklyData = [
    { day: t("mon"), steps: 3200, stability: 82, time: 35 },
    { day: t("tue"), steps: 4500, stability: 85, time: 42 },
    { day: t("wed"), steps: 3800, stability: 80, time: 38 },
    { day: t("thu"), steps: 5200, stability: 88, time: 50 },
    { day: t("fri"), steps: userData.steps, stability: userData.stabilityScore, time: userData.walkingTime },
    { day: t("sat"), steps: 0, stability: 0, time: 0 },
    { day: t("sun"), steps: 0, stability: 0, time: 0 },
  ]

  // Monthly data for chart
  const monthlyData = [
    { week: t("week1"), steps: 24000, stability: 81, time: 240 },
    { week: t("week2"), steps: 28500, stability: 83, time: 280 },
    { week: t("week3"), steps: 31200, stability: 85, time: 310 },
    { week: t("week4"), steps: 26800, stability: 84, time: 260 },
  ]

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-600">{t("walkingHistory")}</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: t("calendar"),
                description: t("calendarDescription"),
              })
            }
          >
            <Calendar className="w-4 h-4 mr-2" />
            {t("selectDate")}
          </Button>
        </div>

        <Tabs defaultValue="steps" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="steps">{t("steps")}</TabsTrigger>
            <TabsTrigger value="time">{t("time")}</TabsTrigger>
            <TabsTrigger value="stability">{t("stability")}</TabsTrigger>
          </TabsList>

          <TabsContent value="steps">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-2 text-blue-500" />
                  {t("stepsProgress")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="steps" fill="#3b82f6" animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-700 mb-2">{t("weeklyStepsSummary")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">{t("totalSteps")}</p>
                      <p className="text-lg font-bold">16,700</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("dailyAverage")}</p>
                      <p className="text-lg font-bold">3,340</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("bestDay")}</p>
                      <p className="text-lg font-bold">{t("thu")}: 5,200</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("goalCompletion")}</p>
                      <p className="text-lg font-bold">67%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-2 text-purple-500" />
                  {t("walkingTimeProgress")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="time" fill="#8b5cf6" animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-medium text-purple-700 mb-2">{t("weeklyTimeSummary")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">{t("totalTime")}</p>
                      <p className="text-lg font-bold">165 {t("min")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("dailyAverage")}</p>
                      <p className="text-lg font-bold">33 {t("min")}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("bestDay")}</p>
                      <p className="text-lg font-bold">
                        {t("thu")}: 50 {t("min")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("goalCompletion")}</p>
                      <p className="text-lg font-bold">73%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stability">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-2 text-green-500" />
                  {t("stabilityProgress")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="stability"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-700 mb-2">{t("weeklyStabilitySummary")}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">{t("averageStability")}</p>
                      <p className="text-lg font-bold">84%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("stabilityTrend")}</p>
                      <p className="text-lg font-bold text-green-600">+3%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("bestDay")}</p>
                      <p className="text-lg font-bold">{t("thu")}: 88%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t("worstDay")}</p>
                      <p className="text-lg font-bold">{t("wed")}: 80%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="mb-20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("recentActivities")}</CardTitle>
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
                        {session.duration} {t("min")} • {session.steps} {t("steps")} • {t("stability")}:{" "}
                        {session.stability}%
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

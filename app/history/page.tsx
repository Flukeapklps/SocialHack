"use client"

import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function History() {
  const { t } = useTranslation()

  // This would typically come from an API
  const weeklyData = [
    { day: "Mon", steps: 3200, stability: 82 },
    { day: "Tue", steps: 4500, stability: 85 },
    { day: "Wed", steps: 3800, stability: 80 },
    { day: "Thu", steps: 5200, stability: 88 },
    { day: "Fri", steps: 3542, stability: 85 },
    { day: "Sat", steps: 2800, stability: 83 },
    { day: "Sun", steps: 3100, stability: 84 },
  ]

  const monthlyData = [
    { week: "Week 1", steps: 24000, stability: 81 },
    { week: "Week 2", steps: 28500, stability: 83 },
    { week: "Week 3", steps: 31200, stability: 85 },
    { week: "Week 4", steps: 26800, stability: 84 },
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

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-blue-600">Walking History</h1>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Select Date
          </Button>
        </div>

        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                  Weekly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="steps" stroke="#3b82f6" activeDot={{ r: 8 }} />
                      <Line yAxisId="right" type="monotone" dataKey="stability" stroke="#10b981" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Steps</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Stability</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                  Monthly Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis yAxisId="left" orientation="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="steps" stroke="#3b82f6" activeDot={{ r: 8 }} />
                      <Line yAxisId="right" type="monotone" dataKey="stability" stroke="#10b981" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm">Steps</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Stability</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.slice(0, 5).map((day, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                      {day.day}
                    </div>
                    <div>
                      <p className="font-medium">{day.steps} steps</p>
                      <p className="text-sm text-gray-600">Stability: {day.stability}%</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

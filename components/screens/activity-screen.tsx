"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import type { UserData } from "@/lib/user-data-provider"
import { useToast } from "@/components/ui/use-toast"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ActivityScreenProps {
  userData: UserData
}

export default function ActivityScreen({ userData }: ActivityScreenProps) {
  const { toast } = useToast()

  // Weekly data for chart
  const weeklyData = [
    { day: "Mon", steps: 3200, stability: 82 },
    { day: "Tue", steps: 4500, stability: 85 },
    { day: "Wed", steps: 3800, stability: 80 },
    { day: "Thu", steps: 5200, stability: 88 },
    { day: "Fri", steps: userData.steps, stability: userData.stabilityScore },
    { day: "Sat", steps: 0, stability: 0 },
    { day: "Sun", steps: 0, stability: 0 },
  ]

  // Monthly data for chart
  const monthlyData = [
    { week: "Week 1", steps: 24000, stability: 81 },
    { week: "Week 2", steps: 28500, stability: 83 },
    { week: "Week 3", steps: 31200, stability: 85 },
    { week: "Week 4", steps: 26800, stability: 84 },
  ]

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-600">Walking History</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: "Calendar",
                description: "Calendar view is not available in the demo",
              })
            }
          >
            <Calendar className="w-4 h-4 mr-2" />
            Select Date
          </Button>
        </div>

        <Tabs defaultValue="weekly" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <ArrowUpRight className="w-4 h-4 mr-2 text-blue-500" />
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
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="steps"
                        stroke="#3b82f6"
                        activeDot={{ r: 8 }}
                        animationDuration={1500}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="stability"
                        stroke="#10b981"
                        animationDuration={1500}
                        animationBegin={300}
                      />
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
                  <ArrowUpRight className="w-4 h-4 mr-2 text-blue-500" />
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
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="steps"
                        stroke="#3b82f6"
                        activeDot={{ r: 8 }}
                        animationDuration={1500}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="stability"
                        stroke="#10b981"
                        animationDuration={1500}
                        animationBegin={300}
                      />
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="mb-20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Activities</CardTitle>
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
                        {session.duration} min • {session.steps} steps
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600"
                    onClick={() =>
                      toast({
                        title: "Session Details",
                        description: `Viewing details for session at ${session.time}`,
                      })
                    }
                  >
                    Details
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

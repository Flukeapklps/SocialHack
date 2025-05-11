"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { UserData } from "@/lib/user-data-provider"
import { useToast } from "@/components/ui/use-toast"
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
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface AnalysisScreenProps {
  userData: UserData
}

export default function AnalysisScreen({ userData }: AnalysisScreenProps) {
  const { toast } = useToast()

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
    { name: "Left Heel", value: 30 },
    { name: "Left Mid", value: 25 },
    { name: "Left Toe", value: 15 },
    { name: "Right Heel", value: 32 },
    { name: "Right Mid", value: 28 },
    { name: "Right Toe", value: 18 },
  ]

  // Fall risk factors data
  const riskFactorsData = [
    { name: "Balance", score: 75 },
    { name: "Strength", score: 65 },
    { name: "Gait Speed", score: 80 },
    { name: "Coordination", score: 70 },
    { name: "Reaction Time", score: 60 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-600">Walking Analysis</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast({
                title: "AI Analysis",
                description: "Detailed AI analysis is being generated",
              })
            }
          >
            Generate Report
          </Button>
        </div>

        <Tabs defaultValue="gait" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="gait">Gait Pattern</TabsTrigger>
            <TabsTrigger value="pressure">Pressure</TabsTrigger>
            <TabsTrigger value="risk">Risk Factors</TabsTrigger>
          </TabsList>

          <TabsContent value="gait">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Gait Stability Analysis</CardTitle>
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
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 8 }}
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-center text-gray-600 mt-4">
                  This chart shows your walking stability over time. Higher values indicate better stability.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pressure">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Foot Pressure Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pressureData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" animationDuration={1500}>
                        {pressureData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-center text-gray-600 mt-4">
                  This chart shows how pressure is distributed across your feet while walking.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Fall Risk Factors</CardTitle>
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
                <p className="text-sm text-center text-gray-600 mt-4">
                  This chart shows the factors contributing to your fall risk assessment.
                </p>
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
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">AI Prediction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Fall risk in next 3 months</span>
                  <span className="text-sm text-amber-600 font-medium">22%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: "22%" }}></div>
                </div>
                <p className="text-xs text-gray-500">Decreased by 8% from previous assessment</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Improvement opportunity</span>
                  <span className="text-sm text-green-600 font-medium">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
                <p className="text-xs text-gray-500">Increased by 12% from previous assessment</p>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-700 mb-2">AI Recommendations</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-sm text-blue-800">Walk at least 20 minutes daily</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-sm text-blue-800">Practice balance exercises regularly</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-sm text-blue-800">Use proper footwear with good support when going outside</p>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
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
              title: "Full Analysis",
              description: "Generating your comprehensive walking analysis report",
            })
          }
        >
          Generate Full Analysis
        </Button>
      </motion.div>
    </div>
  )
}

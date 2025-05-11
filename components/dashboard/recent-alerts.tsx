"use client"

import { useTranslation } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell } from "lucide-react"

export default function RecentAlerts() {
  const { t } = useTranslation()

  // This would typically come from an API
  const alerts = [] // Empty for now, matching the screenshot

  return (
    <Card className="mt-6 border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length > 0 ? (
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                <Bell className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-sm">{alert.title}</h3>
                  <p className="text-xs text-gray-600">{alert.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4">
            <p className="text-sm font-medium">No recent alerts</p>
            <p className="text-xs text-gray-600 mt-1">WalkSafe is monitoring your walking patterns</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import { useTranslation } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FallRiskAssessment() {
  const { t } = useTranslation()

  // This would typically come from an API based on analysis of walking data
  const riskLevel = "low" // could be "low", "medium", or "high"

  const getRiskColor = () => {
    switch (riskLevel) {
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
    switch (riskLevel) {
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
    <Card className="mt-6 border border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{t("fallRiskAssessment")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <div className={`w-24 h-24 rounded-full ${getRiskColor()} flex items-center justify-center mb-4`}>
          <span className="text-xl font-medium capitalize">{t(riskLevel)}</span>
        </div>
        <p className="text-sm text-center text-gray-600 max-w-xs">{getRiskMessage()}</p>
      </CardContent>
    </Card>
  )
}

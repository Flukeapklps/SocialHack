"use client"

import { useUserData } from "@/lib/user-data-provider"
import { useTranslation } from "@/components/language-provider"
import AppLayout from "@/components/layout/app-layout"
import FallRiskContent from "@/components/fall-risk/fall-risk-content"
import LoadingScreen from "@/components/loading-screen"

export default function FallRiskPage() {
  const { isLoading, userData } = useUserData()
  const { t } = useTranslation()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <AppLayout title={t("fallRiskAnalysis")}>
      <FallRiskContent userData={userData} />
    </AppLayout>
  )
}

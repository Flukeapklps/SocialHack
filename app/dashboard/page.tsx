"use client"

import { useEffect } from "react"
import { useUserData } from "@/lib/user-data-provider"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/components/language-provider"
import AppLayout from "@/components/layout/app-layout"
import DashboardContent from "@/components/dashboard/dashboard-content"
import LoadingScreen from "@/components/loading-screen"

export default function DashboardPage() {
  const { isLoading, userData } = useUserData()
  const { toast } = useToast()
  const { t } = useTranslation()

  // Show welcome toast on first load
  useEffect(() => {
    if (!isLoading && !userData.hasSeenWelcome) {
      toast({
        title: t("welcomeToWalkSafe"),
        description: t("welcomeDescription"),
      })
    }
  }, [isLoading, userData.hasSeenWelcome, toast, t])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <AppLayout title={t("dashboard")}>
      <DashboardContent userData={userData} />
    </AppLayout>
  )
}

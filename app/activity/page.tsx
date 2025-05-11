"use client"

import { useUserData } from "@/lib/user-data-provider"
import { useTranslation } from "@/components/language-provider"
import AppLayout from "@/components/layout/app-layout"
import ActivityContent from "@/components/activity/activity-content"
import LoadingScreen from "@/components/loading-screen"

export default function ActivityPage() {
  const { isLoading, userData } = useUserData()
  const { t } = useTranslation()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <AppLayout title={t("activity")}>
      <ActivityContent userData={userData} />
    </AppLayout>
  )
}

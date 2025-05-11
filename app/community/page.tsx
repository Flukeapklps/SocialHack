"use client"

import { useUserData } from "@/lib/user-data-provider"
import { useTranslation } from "@/components/language-provider"
import AppLayout from "@/components/layout/app-layout"
import CommunityContent from "@/components/community/community-content"
import LoadingScreen from "@/components/loading-screen"

export default function CommunityPage() {
  const { isLoading, userData } = useUserData()
  const { t } = useTranslation()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <AppLayout title={t("community")}>
      <CommunityContent userData={userData} />
    </AppLayout>
  )
}

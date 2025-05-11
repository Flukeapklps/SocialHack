"use client"

import { useUserData } from "@/lib/user-data-provider"
import { useTranslation } from "@/components/language-provider"
import AppLayout from "@/components/layout/app-layout"
import ProfileContent from "@/components/profile/profile-content"
import LoadingScreen from "@/components/loading-screen"

export default function ProfilePage() {
  const { isLoading, userData } = useUserData()
  const { t } = useTranslation()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <AppLayout title={t("profile")}>
      <ProfileContent userData={userData} />
    </AppLayout>
  )
}

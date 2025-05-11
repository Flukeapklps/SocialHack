"use client"

import { useUserData } from "@/lib/user-data-provider"
import { useTranslation } from "@/components/language-provider"
import AppLayout from "@/components/layout/app-layout"
import UploadContent from "@/components/upload/upload-content"
import LoadingScreen from "@/components/loading-screen"

export default function UploadPage() {
  const { isLoading, userData } = useUserData()
  const { t } = useTranslation()

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <AppLayout title={t("uploadWalkingVideo")}>
      <UploadContent userData={userData} />
    </AppLayout>
  )
}

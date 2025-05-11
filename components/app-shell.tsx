"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { useUserData } from "@/lib/user-data-provider"
import { useToast } from "@/components/ui/use-toast"
import AppHeader from "@/components/app-header"
import BottomNavigation from "@/components/bottom-navigation"
import DashboardScreen from "@/components/screens/dashboard-screen"
import ActivityScreen from "@/components/screens/activity-screen"
import AnalysisScreen from "@/components/screens/analysis-screen"
import CommunityScreen from "@/components/screens/community-screen"
import ProfileScreen from "@/components/screens/profile-screen"

interface AppShellProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function AppShell({ activeTab, onTabChange }: AppShellProps) {
  const { userData, refreshData } = useUserData()
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Handle pull-to-refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refreshData()

    toast({
      title: "Data refreshed",
      description: "Your walking data has been updated",
    })

    setTimeout(() => {
      setIsRefreshing(false)
    }, 800)
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#f8faff] overflow-hidden">
      <AppHeader
        title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <Tabs value={activeTab} onValueChange={onTabChange} className="flex-1 flex flex-col overflow-hidden">
        <TabsContent value="dashboard" className="flex-1 overflow-y-auto pb-20 data-[state=active]:flex-1">
          <DashboardScreen userData={userData} />
        </TabsContent>

        <TabsContent value="activity" className="flex-1 overflow-y-auto pb-20 data-[state=active]:flex-1">
          <ActivityScreen userData={userData} />
        </TabsContent>

        <TabsContent value="analysis" className="flex-1 overflow-y-auto pb-20 data-[state=active]:flex-1">
          <AnalysisScreen userData={userData} />
        </TabsContent>

        <TabsContent value="community" className="flex-1 overflow-y-auto pb-20 data-[state=active]:flex-1">
          <CommunityScreen userData={userData} />
        </TabsContent>

        <TabsContent value="profile" className="flex-1 overflow-y-auto pb-20 data-[state=active]:flex-1">
          <ProfileScreen userData={userData} />
        </TabsContent>
      </Tabs>

      <BottomNavigation activeTab={activeTab} onChange={onTabChange} />
    </div>
  )
}

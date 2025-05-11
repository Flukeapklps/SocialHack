"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useUserData } from "@/lib/user-data-provider"
import { useToast } from "@/components/ui/use-toast"
import AppHeader from "@/components/layout/app-header"
import BottomNavigation from "@/components/layout/bottom-navigation"
import SideNavigation from "@/components/layout/side-navigation"

interface AppLayoutProps {
  children: React.ReactNode
  title: string
}

export default function AppLayout({ children, title }: AppLayoutProps) {
  const { refreshData } = useUserData()
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Initial check
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

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
        title={title}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden">
        {!isMobile && <SideNavigation isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

        <main className="flex-1 overflow-y-auto pb-20">{children}</main>
      </div>

      <BottomNavigation />
    </div>
  )
}

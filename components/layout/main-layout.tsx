"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import TopNavigation from "@/components/navigation/top-navigation"
import SideNavigation from "@/components/navigation/side-navigation"
import BottomNavigation from "@/components/navigation/bottom-navigation"
import { cn } from "@/lib/utils"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

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

  return (
    <div className="min-h-screen bg-[#f0f7ff] flex">
      {/* Sidebar for desktop */}
      {!isMobile && <SideNavigation isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}

      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          isSidebarOpen && !isMobile ? "ml-64" : "ml-0",
        )}
      >
        {/* Top navigation */}
        <TopNavigation
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
        />

        {/* Main content */}
        <main className="flex-1 px-4 pb-24 md:px-6 max-w-7xl mx-auto w-full">{children}</main>

        {/* Bottom navigation for mobile */}
        {isMobile && <BottomNavigation currentPath={pathname} />}
      </div>
    </div>
  )
}

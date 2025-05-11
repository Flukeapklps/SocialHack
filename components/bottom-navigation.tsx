"use client"

import { Home, Activity, BarChart2, Users, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface BottomNavigationProps {
  activeTab: string
  onChange: (value: string) => void
}

export default function BottomNavigation({ activeTab, onChange }: BottomNavigationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Handle scroll to hide/show navigation
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navigationItems = [
    {
      name: "Dashboard",
      value: "dashboard",
      icon: Home,
    },
    {
      name: "Activity",
      value: "activity",
      icon: Activity,
    },
    {
      name: "Analysis",
      value: "analysis",
      icon: BarChart2,
    },
    {
      name: "Community",
      value: "community",
      icon: Users,
    },
    {
      name: "Profile",
      value: "profile",
      icon: User,
    },
  ]

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center justify-around h-16">
        {navigationItems.map((item) => {
          const isActive = activeTab === item.value
          const Icon = item.icon

          return (
            <button
              key={item.value}
              onClick={() => onChange(item.value)}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700 active:text-blue-500",
              )}
            >
              <Icon className={cn("h-5 w-5 transition-all", isActive && "scale-110")} />
              <span className={cn("text-xs mt-1 transition-all", isActive && "font-medium")}>{item.name}</span>

              {isActive && <span className="absolute bottom-0 w-10 h-1 bg-blue-600 rounded-t-md" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

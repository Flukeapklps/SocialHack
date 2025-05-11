"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Activity, BarChart2, Users, Upload, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useTranslation } from "@/components/language-provider"

export default function BottomNavigation() {
  const pathname = usePathname()
  const { t } = useTranslation()
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
      name: t("dashboard"),
      href: "/dashboard",
      icon: Home,
    },
    {
      name: t("activity"),
      href: "/activity",
      icon: Activity,
    },
    {
      name: t("stability"),
      href: "/stability",
      icon: BarChart2,
    },
    {
      name: t("fallRisk"),
      href: "/fall-risk",
      icon: AlertTriangle,
    },
    {
      name: t("upload"),
      href: "/upload",
      icon: Upload,
    },
    {
      name: t("community"),
      href: "/community",
      icon: Users,
    },
  ]

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="grid grid-cols-6 h-16">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center transition-colors",
                isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-700 active:text-blue-500",
              )}
            >
              <Icon className={cn("h-5 w-5 transition-all", isActive && "scale-110")} />
              <span className={cn("text-xs mt-1 transition-all", isActive && "font-medium")}>{item.name}</span>

              {isActive && <span className="absolute bottom-0 w-10 h-1 bg-blue-600 rounded-t-md" />}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

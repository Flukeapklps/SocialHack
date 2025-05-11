"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTranslation } from "@/components/language-provider"
import { cn } from "@/lib/utils"
import { Home, BarChart2, Activity, Brain, Users, Calendar, Settings, HelpCircle, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SideNavigationProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function SideNavigation({ isOpen, setIsOpen }: SideNavigationProps) {
  const { t } = useTranslation()
  const pathname = usePathname()

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
      name: t("analysis"),
      href: "/analysis",
      icon: BarChart2,
    },
    {
      name: t("recommendations"),
      href: "/recommendations",
      icon: Brain,
    },
    {
      name: t("community"),
      href: "/community",
      icon: Users,
    },
    {
      name: t("schedule"),
      href: "/schedule",
      icon: Calendar,
    },
    { type: "divider" },
    {
      name: t("settings"),
      href: "/settings",
      icon: Settings,
    },
    {
      name: t("helpSupport"),
      href: "/help",
      icon: HelpCircle,
    },
  ]

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-white"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-blue-600">WalkSafe</h1>
            <p className="text-xs text-gray-600">{t("walkingDetectionForElderly")}</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigationItems.map((item, index) => {
          if (item.type === "divider") {
            return <div key={index} className="my-4 border-t border-gray-200" />
          }

          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <Icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700",
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <Button variant="outline" size="sm" className="w-full justify-between" onClick={() => setIsOpen(false)}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          {t("collapseSidebar")}
        </Button>
      </div>
    </aside>
  )
}

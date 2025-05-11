"use client"

import Link from "next/link"
import { useTranslation } from "@/components/language-provider"
import { cn } from "@/lib/utils"
import { Home, BarChart2, Activity, Brain, Users, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface BottomNavigationProps {
  currentPath: string
}

export default function BottomNavigation({ currentPath }: BottomNavigationProps) {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around h-16">
        {navigationItems.slice(0, 4).map((item, index) => {
          const isActive = currentPath === item.href
          const Icon = item.icon

          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full",
                isActive ? "text-blue-600" : "text-gray-500",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}

        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-col items-center justify-center w-full h-full rounded-none text-gray-500"
            >
              <Menu className="h-5 w-5" />
              <span className="text-xs mt-1">{t("more")}</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[70vh] pt-6">
            <div className="grid grid-cols-3 gap-4 p-4">
              {navigationItems.slice(4).map((item, index) => {
                const isActive = currentPath === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className={cn("h-6 w-6 mb-2", isActive ? "text-blue-600" : "text-gray-500")} />
                    <span className="text-sm font-medium text-center">{item.name}</span>
                  </Link>
                )
              })}
              <Link
                href="/settings"
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="h-6 w-6 mb-2 text-gray-500" />
                <span className="text-sm font-medium text-center">{t("settings")}</span>
              </Link>
              <Link
                href="/help"
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <HelpCircle className="h-6 w-6 mb-2 text-gray-500" />
                <span className="text-sm font-medium text-center">{t("help")}</span>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

import { Settings, HelpCircle } from "lucide-react"

"use client"

import { usePathname } from "next/navigation"

import { useState } from "react"
import Link from "next/link"
import { useTranslation } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Menu, Bell, User, ChevronDown, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import LanguageSwitcher from "@/components/language-switcher"

interface TopNavigationProps {
  toggleSidebar: () => void
  isSidebarOpen: boolean
  isMobile: boolean
}

export default function TopNavigation({ toggleSidebar, isSidebarOpen, isMobile }: TopNavigationProps) {
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState(2)

  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Menu toggle button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:flex hidden"
            aria-label={t("toggleMenu")}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
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
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-blue-600">WalkSafe</h1>
              <p className="text-xs text-gray-600">{t("walkingDetectionForElderly")}</p>
            </div>
          </Link>
        </div>

        {/* Desktop navigation links - only show on larger screens */}
        {!isMobile && (
          <nav className="hidden lg:flex items-center space-x-1">
            <NavLink href="/dashboard" label={t("dashboard")} />
            <NavLink href="/activity" label={t("activity")} />
            <NavLink href="/analysis" label={t("analysis")} />
            <NavLink href="/recommendations" label={t("recommendations")} />
            <NavLink href="/community" label={t("community")} />
          </nav>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Search button */}
          <Button variant="ghost" size="icon" className="text-gray-600" aria-label={t("search")}>
            <Search className="h-5 w-5" />
          </Button>

          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative text-gray-600" aria-label={t("notifications")}>
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {notifications}
              </span>
            )}
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="hidden md:inline-block font-medium">{t("profile")}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/profile">{t("myProfile")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">{t("settings")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help">{t("helpSupport")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">{t("signOut")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

interface NavLinkProps {
  href: string
  label: string
}

function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  )
}

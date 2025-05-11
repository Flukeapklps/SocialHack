"use client"

import { useState, useEffect } from "react"
import { Bell, RefreshCw, User, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface AppHeaderProps {
  title: string
  onRefresh?: () => void
  isRefreshing?: boolean
}

export default function AppHeader({ title, onRefresh, isRefreshing = false }: AppHeaderProps) {
  const { toast } = useToast()
  const [scrolled, setScrolled] = useState(false)
  const [notifications, setNotifications] = useState(2)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 2 unread notifications",
    })
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full bg-white transition-shadow duration-200",
        scrolled ? "shadow-md" : "shadow-sm",
      )}
    >
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
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
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 0.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <h1 className="text-xl font-bold text-blue-600">WalkSafe</h1>
        </div>

        <div className="flex items-center gap-1">
          {onRefresh && (
            <Button variant="ghost" size="icon" className="text-gray-600" onClick={onRefresh} disabled={isRefreshing}>
              <RefreshCw className={cn("h-5 w-5", isRefreshing && "animate-spin")} />
              <span className="sr-only">Refresh</span>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="relative text-gray-600" onClick={handleNotificationClick}>
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {notifications}
              </span>
            )}
          </Button>

          <Link href="/help" passHref>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Help</span>
            </Button>
          </Link>

          <Link href="/settings" passHref>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => toast({ title: "Profile", description: "View and edit your profile" })}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help">Help</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onSelect={() => toast({ title: "Signed out", description: "You have been signed out" })}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

"use client"

import { useTranslation } from "@/components/language-provider"

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-md">
        <div className="text-center font-medium text-blue-700 mb-4">{t("mainMenu")}</div>
        <div className="flex items-center justify-center gap-4 py-2">
          <div className="relative w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-white"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="text-left">
            <h1 className="text-xl font-bold text-blue-600">WalkSafe</h1>
            <p className="text-sm text-gray-600">{t("walkingDetectionForElderly")}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

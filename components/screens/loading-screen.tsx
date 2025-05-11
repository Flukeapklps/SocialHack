"use client"

import { useTranslation } from "@/components/language-provider"

export default function LoadingScreen() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f0f7ff]">
      <div className="relative w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-white animate-pulse"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
      </div>
      <h1 className="text-2xl font-bold text-blue-600 mb-2">WalkSafe</h1>
      <p className="text-gray-600 mb-8">{t("walkingDetectionForElderly")}</p>

      <div className="flex space-x-2 justify-center items-center">
        <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce"></div>
      </div>
      <p className="text-sm text-gray-500 mt-4">{t("loading")}</p>
    </div>
  )
}

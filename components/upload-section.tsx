"use client"

import type React from "react"

import { useState } from "react"
import { useTranslation } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Upload } from "lucide-react"
import Link from "next/link"

export default function UploadSection() {
  const { t } = useTranslation()
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    setFile(file)
    // Here you would typically upload the file to your server
    console.log("File selected:", file.name)
    // For demo purposes, we'll just simulate a successful upload
    setTimeout(() => {
      setFile(null)
      // You could redirect to a success page or update the UI
    }, 2000)
  }

  return (
    <div className="w-full">
      <Card className="border border-blue-200">
        <CardContent className="p-6">
          <h2 className="text-center text-blue-600 font-medium mb-4">{t("uploadWalkingData")}</h2>

          <div
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".csv,.json,.txt"
              onChange={handleFileChange}
            />

            <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 mb-2">
              <Upload size={20} />
            </div>

            {file ? (
              <p className="text-sm text-center text-gray-600">
                {t("uploading")}: {file.name}
              </p>
            ) : (
              <p className="text-sm text-center text-gray-600">{t("dragAndDropOrClick")}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 text-center">
        <Link href="/how-to-use" className="text-blue-600 text-sm hover:underline">
          {t("howToUseWalkSafe")}
        </Link>
      </div>
    </div>
  )
}

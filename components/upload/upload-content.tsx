"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Video, X, Play, Pause, Check, AlertTriangle } from "lucide-react"
import type { UserData } from "@/lib/user-data-provider"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/components/language-provider"
import { cn } from "@/lib/utils"

interface UploadContentProps {
  userData: UserData
}

export default function UploadContent({ userData }: UploadContentProps) {
  const { toast } = useToast()
  const { t } = useTranslation()
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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
    // Check if file is a video
    if (!file.type.startsWith("video/")) {
      toast({
        title: t("invalidFileType"),
        description: t("pleaseUploadVideo"),
        variant: "destructive",
      })
      return
    }

    setFile(file)
    setVideoUrl(URL.createObjectURL(file))
    simulateUpload()
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          simulateAnalysis()
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const simulateAnalysis = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis taking some time
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisComplete(true)

      toast({
        title: t("analysisComplete"),
        description: t("analysisCompleteDescription"),
      })
    }, 3000)
  }

  const resetUpload = () => {
    setFile(null)
    setVideoUrl(null)
    setIsUploading(false)
    setUploadProgress(0)
    setIsAnalyzing(false)
    setAnalysisComplete(false)
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-600">{t("uploadWalkingVideo")}</h2>
        </div>

        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("videoUpload")}</CardTitle>
          </CardHeader>
          <CardContent>
            {!videoUrl ? (
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors",
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400",
                  isUploading && "opacity-70 pointer-events-none",
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("video-upload")?.click()}
              >
                <input id="video-upload" type="file" className="hidden" accept="video/*" onChange={handleFileChange} />

                <div className="w-16 h-16 rounded-full border-2 border-blue-500 flex items-center justify-center text-blue-500 mb-4">
                  <Video size={32} />
                </div>

                <h3 className="text-lg font-medium text-center mb-2">{t("uploadWalkingVideoTitle")}</h3>
                <p className="text-sm text-center text-gray-600 mb-4 max-w-md">{t("uploadWalkingVideoDescription")}</p>

                <p className="text-xs text-center text-gray-500">{t("dragAndDropOrClick")}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                  <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full h-full object-contain"
                    onEnded={() => setIsPlaying(false)}
                  />

                  {!isUploading && !isAnalyzing && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
                        onClick={togglePlayPause}
                      >
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                      </Button>
                    </div>
                  )}

                  {(isUploading || isAnalyzing) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                      {isUploading && (
                        <>
                          <p className="text-white mb-2">
                            {t("uploading")}: {uploadProgress}%
                          </p>
                          <div className="w-48">
                            <Progress value={uploadProgress} className="h-2" />
                          </div>
                        </>
                      )}
                      {isAnalyzing && (
                        <div className="text-white flex flex-col items-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-2"></div>
                          <p>{t("analyzingVideo")}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm hover:bg-white/30"
                    onClick={resetUpload}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center text-sm">
                  <Video className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="text-gray-700 font-medium">{file?.name}</span>
                  <span className="ml-auto text-gray-500">
                    {file?.size ? (file.size / (1024 * 1024)).toFixed(2) : 0} MB
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {analysisComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">{t("analysisResults")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-green-50 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">{t("analysisSuccessful")}</h3>
                    <p className="text-sm text-green-700 mt-1">{t("analysisSuccessfulDescription")}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">{t("gaitAnalysis")}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{t("stepLength")}</span>
                        <span className="text-sm font-medium">68 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{t("stepWidth")}</span>
                        <span className="text-sm font-medium">12 cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{t("cadence")}</span>
                        <span className="text-sm font-medium">110 steps/min</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{t("walkingSpeed")}</span>
                        <span className="text-sm font-medium">1.2 m/s</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">{t("postureAnalysis")}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{t("trunkAngle")}</span>
                        <span className="text-sm font-medium">5°</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{t("armSwing")}</span>
                        <span className="text-sm font-medium">{t("moderate")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{t("headPosition")}</span>
                        <span className="text-sm font-medium">{t("good")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">{t("shoulderAlignment")}</span>
                        <span className="text-sm font-medium">{t("slightlyUneven")}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-yellow-800">{t("areasForImprovement")}</h3>
                      <ul className="mt-2 space-y-2 text-sm text-yellow-700">
                        <li className="flex items-start gap-2">
                          <span className="bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            1
                          </span>
                          <p>{t("improvementArea1")}</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            2
                          </span>
                          <p>{t("improvementArea2")}</p>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                            3
                          </span>
                          <p>{t("improvementArea3")}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => {
                  toast({
                    title: t("detailedReport"),
                    description: t("detailedReportDescription"),
                  })
                }}
              >
                {t("viewDetailedReport")}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="mb-20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("uploadTips")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h3 className="font-medium">{t("tipTitle1")}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t("tipDescription1")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h3 className="font-medium">{t("tipTitle2")}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t("tipDescription2")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h3 className="font-medium">{t("tipTitle3")}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t("tipDescription3")}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

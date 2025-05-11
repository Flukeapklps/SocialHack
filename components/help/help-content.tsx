"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslation } from "@/components/language-provider"
import AppLayout from "@/components/layout/app-layout"
import { Search, BookOpen, HelpCircle, MessageSquare, Send, ChevronRight, Play } from "lucide-react"

export default function HelpContent() {
  const { toast } = useToast()
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: t("questionSubmitted"),
      description: t("questionSubmittedDesc"),
    })
    // Reset form
    const form = e.target as HTMLFormElement
    form.reset()
  }

  const handleStartTutorial = () => {
    toast({
      title: t("tutorialStarted"),
      description: t("tutorialStartedDesc"),
    })
  }

  return (
    <AppLayout title={t("helpAndSupport")}>
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">{t("helpAndSupport")}</h1>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={t("searchHelp")}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="guides" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="guides">
              <BookOpen className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t("guides")}</span>
            </TabsTrigger>
            <TabsTrigger value="faq">
              <HelpCircle className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t("faq")}</span>
            </TabsTrigger>
            <TabsTrigger value="contact">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t("contactUs")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guides">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("gettingStarted")}</CardTitle>
                  <CardDescription>{t("gettingStartedDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <Button variant="outline" className="justify-between" onClick={handleStartTutorial}>
                      <div className="flex items-center">
                        <Play className="h-4 w-4 mr-2" />
                        {t("appTutorial")}
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      className="justify-between"
                      onClick={() => toast({ title: t("videoOpened") })}
                    >
                      <div className="flex items-center">
                        <Play className="h-4 w-4 mr-2" />
                        {t("howToTrackSteps")}
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      className="justify-between"
                      onClick={() => toast({ title: t("videoOpened") })}
                    >
                      <div className="flex items-center">
                        <Play className="h-4 w-4 mr-2" />
                        {t("understandingFallRisk")}
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("featureGuides")}</CardTitle>
                  <CardDescription>{t("featureGuidesDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">{t("dashboard")}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{t("dashboardGuideDesc")}</p>
                      <Button variant="link" className="p-0" onClick={() => toast({ title: t("guideOpened") })}>
                        {t("readMore")} <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">{t("activity")}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{t("activityGuideDesc")}</p>
                      <Button variant="link" className="p-0" onClick={() => toast({ title: t("guideOpened") })}>
                        {t("readMore")} <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">{t("stability")}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{t("stabilityGuideDesc")}</p>
                      <Button variant="link" className="p-0" onClick={() => toast({ title: t("guideOpened") })}>
                        {t("readMore")} <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">{t("fallRisk")}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{t("fallRiskGuideDesc")}</p>
                      <Button variant="link" className="p-0" onClick={() => toast({ title: t("guideOpened") })}>
                        {t("readMore")} <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">{t("upload")}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{t("uploadGuideDesc")}</p>
                      <Button variant="link" className="p-0" onClick={() => toast({ title: t("guideOpened") })}>
                        {t("readMore")} <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">{t("community")}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{t("communityGuideDesc")}</p>
                      <Button variant="link" className="p-0" onClick={() => toast({ title: t("guideOpened") })}>
                        {t("readMore")} <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>{t("frequentlyAskedQuestions")}</CardTitle>
                <CardDescription>{t("faqDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{t("faqQuestion1")}</AccordionTrigger>
                    <AccordionContent>{t("faqAnswer1")}</AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>{t("faqQuestion2")}</AccordionTrigger>
                    <AccordionContent>{t("faqAnswer2")}</AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>{t("faqQuestion3")}</AccordionTrigger>
                    <AccordionContent>{t("faqAnswer3")}</AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>{t("faqQuestion4")}</AccordionTrigger>
                    <AccordionContent>{t("faqAnswer4")}</AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>{t("faqQuestion5")}</AccordionTrigger>
                    <AccordionContent>{t("faqAnswer5")}</AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>{t("faqQuestion6")}</AccordionTrigger>
                    <AccordionContent>{t("faqAnswer6")}</AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>{t("faqQuestion7")}</AccordionTrigger>
                    <AccordionContent>{t("faqAnswer7")}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>{t("contactSupport")}</CardTitle>
                <CardDescription>{t("contactSupportDesc")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitQuestion} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      {t("subject")}
                    </label>
                    <Input id="subject" placeholder={t("subjectPlaceholder")} required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {t("message")}
                    </label>
                    <Textarea id="message" placeholder={t("messagePlaceholder")} className="min-h-[120px]" required />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    {t("sendMessage")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

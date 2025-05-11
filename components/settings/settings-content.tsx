"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useTranslation } from "@/components/language-provider"
import LanguageSwitcher from "@/components/language-switcher"
import AppLayout from "@/components/layout/app-layout"
import { Bell, Moon, Sun, User, Shield, Target, ChevronRight, Save, Trash2 } from "lucide-react"

export default function SettingsContent() {
  const { toast } = useToast()
  const { t } = useTranslation()
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [dataSharing, setDataSharing] = useState(true)
  const [stepGoal, setStepGoal] = useState(8000)
  const [timeGoal, setTimeGoal] = useState(30)

  const handleSaveSettings = () => {
    toast({
      title: t("settingsSaved"),
      description: t("settingsSavedDesc"),
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: t("warning"),
      description: t("deleteAccountWarning"),
      variant: "destructive",
    })
  }

  return (
    <AppLayout title={t("settings")}>
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">{t("settings")}</h1>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="account">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t("account")}</span>
            </TabsTrigger>
            <TabsTrigger value="app">
              <Sun className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t("appSettings")}</span>
            </TabsTrigger>
            <TabsTrigger value="goals">
              <Target className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t("goals")}</span>
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{t("privacy")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("profile")}</CardTitle>
                  <CardDescription>{t("profileDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("name")}</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("phone")}</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    {t("saveChanges")}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("password")}</CardTitle>
                  <CardDescription>{t("passwordDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">{t("currentPassword")}</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">{t("newPassword")}</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    {t("updatePassword")}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="app">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("appearance")}</CardTitle>
                  <CardDescription>{t("appearanceDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Moon className="h-4 w-4" />
                      <Label htmlFor="dark-mode">{t("darkMode")}</Label>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={(checked) => {
                        setDarkMode(checked)
                        toast({
                          title: checked ? t("darkModeEnabled") : t("darkModeDisabled"),
                          description: checked ? t("darkModeEnabledDesc") : t("darkModeDisabledDesc"),
                        })
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">{t("language")}</Label>
                    <LanguageSwitcher className="w-full" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("notifications")}</CardTitle>
                  <CardDescription>{t("notificationsDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4" />
                      <Label htmlFor="notifications">{t("enableNotifications")}</Label>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={(checked) => {
                        setNotifications(checked)
                        toast({
                          title: checked ? t("notificationsEnabled") : t("notificationsDisabled"),
                          description: checked ? t("notificationsEnabledDesc") : t("notificationsDisabledDesc"),
                        })
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-type">{t("notificationType")}</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="notification-type">
                        <SelectValue placeholder={t("selectNotificationType")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t("allNotifications")}</SelectItem>
                        <SelectItem value="important">{t("importantOnly")}</SelectItem>
                        <SelectItem value="none">{t("noNotifications")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveSettings}>
                    <Save className="h-4 w-4 mr-2" />
                    {t("saveChanges")}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>{t("dailyGoals")}</CardTitle>
                <CardDescription>{t("dailyGoalsDesc")}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="step-goal">
                      {t("stepGoal")}: {stepGoal.toLocaleString()} {t("steps")}
                    </Label>
                  </div>
                  <Slider
                    id="step-goal"
                    min={1000}
                    max={20000}
                    step={500}
                    value={[stepGoal]}
                    onValueChange={(value) => setStepGoal(value[0])}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="time-goal">
                      {t("walkingTimeGoal")}: {timeGoal} {t("minutes")}
                    </Label>
                  </div>
                  <Slider
                    id="time-goal"
                    min={5}
                    max={120}
                    step={5}
                    value={[timeGoal]}
                    onValueChange={(value) => setTimeGoal(value[0])}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings}>
                  <Save className="h-4 w-4 mr-2" />
                  {t("saveGoals")}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("dataSharing")}</CardTitle>
                  <CardDescription>{t("dataSharingDesc")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <Label htmlFor="data-sharing">{t("shareData")}</Label>
                    </div>
                    <Switch
                      id="data-sharing"
                      checked={dataSharing}
                      onCheckedChange={(checked) => {
                        setDataSharing(checked)
                        toast({
                          title: checked ? t("dataSharingEnabled") : t("dataSharingDisabled"),
                          description: checked ? t("dataSharingEnabledDesc") : t("dataSharingDisabledDesc"),
                        })
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("exportData")}</CardTitle>
                  <CardDescription>{t("exportDataDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    onClick={() => toast({ title: t("dataExported"), description: t("dataExportedDesc") })}
                  >
                    {t("exportData")}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="text-red-600">
                  <CardTitle>{t("dangerZone")}</CardTitle>
                  <CardDescription className="text-red-500">{t("dangerZoneDesc")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    {t("deleteAccount")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}

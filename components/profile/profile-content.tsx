"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Globe, Shield, HelpCircle, User, Save } from "lucide-react"
import { motion } from "framer-motion"
import type { UserData } from "@/lib/user-data-provider"
import { useToast } from "@/components/ui/use-toast"
import { useTranslation } from "@/components/language-provider"

interface ProfileContentProps {
  userData: UserData
}

export default function ProfileContent({ userData }: ProfileContentProps) {
  const { toast } = useToast()
  const { t, language, setLanguage } = useTranslation()
  const [formState, setFormState] = useState({
    name: userData.name,
    email: userData.email,
    age: userData.age,
    gender: userData.gender,
    medicalConditions: userData.medicalConditions,
    notifications: userData.preferences.notifications,
    dataSharing: userData.preferences.dataSharing,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormState((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveChanges = () => {
    toast({
      title: t("profileUpdated"),
      description: t("profileUpdateSuccess"),
    })
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center mb-6"
      >
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2">
          <User size={32} />
        </div>
        <h1 className="text-xl font-bold">{formState.name}</h1>
        <p className="text-sm text-gray-600">{formState.email}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("personalInformation")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name">{t("fullName")}</Label>
              <Input id="name" name="name" value={formState.name} onChange={handleInputChange} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input id="email" name="email" type="email" value={formState.email} onChange={handleInputChange} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="age">{t("age")}</Label>
                <Input id="age" name="age" type="number" value={formState.age} onChange={handleInputChange} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="gender">{t("gender")}</Label>
                <Select value={formState.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder={t("selectGender")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t("male")}</SelectItem>
                    <SelectItem value="female">{t("female")}</SelectItem>
                    <SelectItem value="other">{t("other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="medical-conditions">{t("medicalConditions")}</Label>
              <Input
                id="medical-conditions"
                name="medicalConditions"
                value={formState.medicalConditions}
                onChange={handleInputChange}
              />
            </div>

            <Button className="w-full flex items-center gap-2" onClick={handleSaveChanges}>
              <Save className="w-4 h-4" />
              {t("saveChanges")}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">{t("settings")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-600" />
                <Label htmlFor="notifications" className="cursor-pointer">
                  {t("notifications")}
                </Label>
              </div>
              <Switch
                id="notifications"
                checked={formState.notifications}
                onCheckedChange={(checked) => handleSwitchChange("notifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-gray-600" />
                <Label htmlFor="language" className="cursor-pointer">
                  {t("language")}
                </Label>
              </div>
              <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "th")}>
                <SelectTrigger id="language" className="w-[120px]">
                  <SelectValue placeholder={t("selectLanguage")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">{t("english")}</SelectItem>
                  <SelectItem value="th">{t("thai")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-600" />
                <Label htmlFor="data-sharing" className="cursor-pointer">
                  {t("dataSharing")}
                </Label>
              </div>
              <Switch
                id="data-sharing"
                checked={formState.dataSharing}
                onCheckedChange={(checked) => handleSwitchChange("dataSharing", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="flex justify-between mb-20"
      >
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() =>
            toast({
              title: t("helpSupport"),
              description: t("contactingSupport"),
            })
          }
        >
          <HelpCircle className="w-4 h-4" />
          {t("helpSupport")}
        </Button>
        <Button
          variant="destructive"
          onClick={() =>
            toast({
              title: t("signOut"),
              description: t("signOutConfirmation"),
            })
          }
        >
          {t("signOut")}
        </Button>
      </motion.div>
    </div>
  )
}

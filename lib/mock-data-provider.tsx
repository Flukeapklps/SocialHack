"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type WalkingSession = {
  time: string
  duration: number
  steps: number
  stability: number
}

export type Alert = {
  title: string
  description: string
  time: string
}

export type UserData = {
  name: string
  email: string
  age: string
  gender: string
  medicalConditions: string
  steps: number
  stepsGoal: number
  walkingTime: number
  walkingTimeGoal: number
  stabilityScore: number
  fallRisk: "low" | "medium" | "high"
  lastSyncTime: string | null
  walkingSessions: WalkingSession[]
  alerts: Alert[]
  preferences: {
    notifications: boolean
    dataSharing: boolean
  }
}

type MockDataContextType = {
  isLoading: boolean
  userData: UserData
  refreshData: () => Promise<void>
}

const defaultUserData: UserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  age: "72",
  gender: "male",
  medicalConditions: "Arthritis, High Blood Pressure",
  steps: 3542,
  stepsGoal: 5000,
  walkingTime: 45,
  walkingTimeGoal: 60,
  stabilityScore: 85,
  fallRisk: "low",
  lastSyncTime: null,
  walkingSessions: [
    { time: "10:30 AM", duration: 15, steps: 1250, stability: 82 },
    { time: "3:45 PM", duration: 25, steps: 2100, stability: 87 },
    { time: "9:15 AM", duration: 20, steps: 1800, stability: 84 },
  ],
  alerts: [],
  preferences: {
    notifications: true,
    dataSharing: true,
  },
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined)

export function MockDataProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<UserData>(defaultUserData)

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setUserData({
        ...defaultUserData,
        lastSyncTime: new Date().toISOString(),
      })
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Function to refresh data
  const refreshData = async (): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate API call delay
      setTimeout(() => {
        // Generate random steps between 3000-6000
        const newSteps = Math.floor(Math.random() * 3000) + 3000

        // Generate random walking time between 30-60 minutes
        const newWalkingTime = Math.floor(Math.random() * 30) + 30

        // Generate random stability score between 75-95
        const newStabilityScore = Math.floor(Math.random() * 20) + 75

        // Determine fall risk based on stability score
        let newFallRisk: "low" | "medium" | "high" = "medium"
        if (newStabilityScore >= 85) {
          newFallRisk = "low"
        } else if (newStabilityScore < 70) {
          newFallRisk = "high"
        }

        setUserData({
          ...userData,
          steps: newSteps,
          walkingTime: newWalkingTime,
          stabilityScore: newStabilityScore,
          fallRisk: newFallRisk,
          lastSyncTime: new Date().toISOString(),
        })

        resolve()
      }, 1000)
    })
  }

  return <MockDataContext.Provider value={{ isLoading, userData, refreshData }}>{children}</MockDataContext.Provider>
}

export function useMockData() {
  const context = useContext(MockDataContext)
  if (context === undefined) {
    throw new Error("useMockData must be used within a MockDataProvider")
  }
  return context
}

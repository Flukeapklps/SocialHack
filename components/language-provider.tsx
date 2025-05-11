"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "th"

type Translations = {
  [key in Language]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    // General
    walkingDetectionForElderly: "Walking Detection for Elderly",
    loading: "Loading your health data...",
    welcomeToWalkSafe: "Welcome to WalkSafe",
    welcomeDescription: "Your personal walking assistant for fall prevention",
    refresh: "Refresh",

    // Navigation
    dashboard: "Dashboard",
    activity: "Activity",
    stability: "Stability",
    fallRisk: "Fall Risk",
    upload: "Upload",
    community: "Community",
    profile: "Profile",
    settings: "Settings",
    help: "Help",
    helpSupport: "Help & Support",
    signOut: "Sign Out",
    toggleMenu: "Toggle Menu",
    collapseSidebar: "Collapse Sidebar",
    notifications: "Notifications",
    notificationsDescription: "You have 2 unread notifications",
    settingsDescription: "Adjust your app settings",
    helpDescription: "Get help and support",
    signedOut: "Signed Out",
    signedOutDescription: "You have been signed out",

    // Dashboard
    overview: "Overview",
    uploadWalkingVideo: "Upload Walking Video",
    stepTracking: "Step Tracking",
    walkingTime: "Walking Time",
    stabilityScore: "Stability Score",
    fallRiskAssessment: "Fall Risk Assessment",
    recentActivity: "Recent Activity",
    stepsGoal: "Goal: {goal} steps",
    timeGoal: "Goal: {goal} min",
    viewDetails: "View Details",
    viewAnalysis: "View Analysis",
    viewFullReport: "View Full Report",
    min: "min",
    steps: "Steps",
    details: "Details",
    sessionDetails: "Session Details",
    sessionDetailsDescription: "Viewing details for session at {time}",

    // Risk levels
    low: "Low",
    medium: "Medium",
    high: "High",
    lowRiskMessage: "Your walking pattern indicates a low risk of falling",
    mediumRiskMessage: "Your walking pattern shows some instability. Take care.",
    highRiskMessage: "Your walking pattern indicates a high risk of falling. Please be cautious.",
    unknownRiskMessage: "We need more data to assess your fall risk.",

    // Activity
    walkingHistory: "Walking History",
    calendar: "Calendar",
    calendarDescription: "Calendar view is not available in the demo",
    selectDate: "Select Date",
    time: "Time",
    weekly: "Weekly",
    monthly: "Monthly",
    stepsProgress: "Steps Progress",
    walkingTimeProgress: "Walking Time Progress",
    stabilityProgress: "Stability Progress",
    recentActivities: "Recent Activities",
    weeklyStepsSummary: "Weekly Steps Summary",
    weeklyTimeSummary: "Weekly Time Summary",
    weeklyStabilitySummary: "Weekly Stability Summary",
    totalSteps: "Total Steps",
    totalTime: "Total Time",
    dailyAverage: "Daily Average",
    bestDay: "Best Day",
    worstDay: "Worst Day",
    goalCompletion: "Goal Completion",
    averageStability: "Average Stability",
    stabilityTrend: "Stability Trend",

    // Days
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",

    // Months
    jan: "Jan",
    feb: "Feb",
    mar: "Mar",
    apr: "Apr",
    may: "May",
    jun: "Jun",

    // Weeks
    week1: "Week 1",
    week2: "Week 2",
    week3: "Week 3",
    week4: "Week 4",

    // Stability
    stabilityAnalysis: "Stability Analysis",
    currentStabilityScore: "Current Stability Score",
    stabilityScoreDescription:
      "Your stability score is calculated based on your walking pattern, posture, and balance. A higher score indicates better stability and lower fall risk.",
    gaitPattern: "Gait Pattern",
    pressureDistribution: "Pressure Distribution",
    stabilityFactors: "Stability Factors",
    gaitStabilityAnalysis: "Gait Stability Analysis",
    footPressureDistribution: "Foot Pressure Distribution",
    stabilityFactorsAnalysis: "Stability Factors Analysis",
    gaitAnalysisDescription:
      "This chart shows your walking stability over time. Higher values indicate better stability.",
    pressureDistributionDescription: "This chart shows how pressure is distributed across your feet while walking.",
    stabilityFactorsDescription:
      "This chart shows the different factors that contribute to your overall stability score.",
    gaitAnalysisInsights: "Gait Analysis Insights",
    pressureDistributionInsights: "Pressure Distribution Insights",
    stabilityFactorsInsights: "Stability Factors Insights",
    gaitInsight1: "Your step length is consistent, which is good for stability.",
    gaitInsight2: "There are some fluctuations in your walking rhythm that could be improved.",
    gaitInsight3: "Your turning stability is good, showing controlled movements.",
    pressureInsight1: "You place slightly more pressure on your right foot than your left.",
    pressureInsight2: "Your heel strike pattern is normal, which is good for stability.",
    pressureInsight3: "Consider exercises to improve weight distribution across your feet.",
    factorsInsight1: "Your balance is good, but could be improved with specific exercises.",
    factorsInsight2: "Your posture while walking is excellent, keep it up!",
    factorsInsight3: "Your step symmetry could be improved to enhance overall stability.",
    aiAnalysis: "AI Analysis",
    aiAnalysisDescription: "Detailed AI analysis is being generated",
    fullAnalysis: "Full Analysis",
    fullAnalysisDescription: "Generating your comprehensive walking analysis report",
    generateFullAnalysis: "Generate Full Analysis",

    // Foot parts
    leftHeel: "Left Heel",
    leftMid: "Left Mid",
    leftToe: "Left Toe",
    rightHeel: "Right Heel",
    rightMid: "Right Mid",
    rightToe: "Right Toe",

    // Stability factors
    balance: "Balance",
    posture: "Posture",
    gaitRhythm: "Gait Rhythm",
    stepSymmetry: "Step Symmetry",
    turnStability: "Turn Stability",

    // Fall Risk
    fallRiskAnalysis: "Fall Risk Analysis",
    currentRiskAssessment: "Current Risk Assessment",
    riskFactors: "Risk Factors",
    riskTrend: "Risk Trend",
    improvementOpportunities: "Improvement Opportunities",
    aiRecommendations: "AI Recommendations",
    personalizedRecommendations: "Personalized Recommendations",
    riskFactorsDescription: "This chart shows the factors contributing to your fall risk assessment.",
    riskTrendDescription: "This chart shows how your fall risk has changed over time.",
    improvementOpportunitiesDescription: "These are areas where you can make improvements to reduce your fall risk.",
    shareReport: "Share Report",
    shareReportDescription: "Report has been shared with your doctor",
    shareWithDoctor: "Share with Doctor",
    detailedReport: "Detailed Report",
    detailedReportDescription: "Generating your detailed fall risk report",
    generateDetailedReport: "Generate Detailed Report",

    // Risk factors
    strength: "Strength",
    gaitSpeed: "Gait Speed",
    coordination: "Coordination",
    reactionTime: "Reaction Time",

    // Improvement areas
    balanceExercises: "Balance Exercises",
    strengthTraining: "Strength Training",
    gaitTraining: "Gait Training",
    homeModifications: "Home Modifications",
    properFootwear: "Proper Footwear",

    // Recommendations
    recommendation1Title: "Daily Balance Exercises",
    recommendation1Description: "Practice standing on one foot for 30 seconds each day to improve balance.",
    recommendation2Title: "Strength Training",
    recommendation2Description: "Do 10 chair squats twice a day to strengthen your leg muscles.",
    recommendation3Title: "Proper Footwear",
    recommendation3Description: "Ensure your shoes provide good support and have non-slip soles.",

    // Upload
    videoUpload: "Video Upload",
    uploadWalkingVideoTitle: "Upload Walking Video for Analysis",
    uploadWalkingVideoDescription:
      "Upload a video of your walking pattern for AI-powered analysis of your posture, gait, and stability.",
    dragAndDropOrClick: "Drag and drop a video file here or click to browse",
    uploading: "Uploading",
    analyzingVideo: "Analyzing your walking pattern...",
    analysisResults: "Analysis Results",
    analysisSuccessful: "Analysis Successful",
    analysisSuccessfulDescription:
      "Our AI has analyzed your walking pattern and identified key insights to help improve your stability.",
    analysisComplete: "Analysis Complete",
    analysisCompleteDescription: "Your walking video has been analyzed successfully",
    invalidFileType: "Invalid File Type",
    pleaseUploadVideo: "Please upload a video file",
    uploadTips: "Tips for Better Analysis",
    tipTitle1: "Record from the Side",
    tipDescription1: "For best results, record your walking from the side to capture your full body movement.",
    tipTitle2: "Walk Naturally",
    tipDescription2: "Walk at your normal pace and in your usual manner for the most accurate analysis.",
    tipTitle3: "Good Lighting",
    tipDescription3: "Ensure the area is well-lit so the AI can clearly see your walking pattern.",
    gaitAnalysis: "Gait Analysis",
    postureAnalysis: "Posture Analysis",
    areasForImprovement: "Areas for Improvement",
    improvementArea1:
      "Your step width is slightly narrow, which may affect stability. Try walking with feet slightly wider apart.",
    improvementArea2: "Your trunk leans forward slightly when walking. Focus on maintaining an upright posture.",
    improvementArea3:
      "Your arm swing is limited, which can affect balance. Practice walking with natural arm movements.",
    viewDetailedReport: "View Detailed Report",

    // Gait measurements
    stepLength: "Step Length",
    stepWidth: "Step Width",
    cadence: "Cadence",
    walkingSpeed: "Walking Speed",

    // Posture measurements
    trunkAngle: "Trunk Angle",
    armSwing: "Arm Swing",
    headPosition: "Head Position",
    shoulderAlignment: "Shoulder Alignment",

    // Qualitative descriptions
    moderate: "Moderate",
    good: "Good",
    slightlyUneven: "Slightly Uneven",

    // Community
    feed: "Feed",
    challenges: "Challenges",
    leaderboard: "Leaderboard",
    shareProgress: "Share your walking progress or tips...",
    share: "Share",
    likes: "likes",
    comments: "comments",
    like: "Like",
    comment: "Comment",
    writeComment: "Write a comment...",
    commentPosted: "Comment Posted",
    commentPostedDescription: "Your comment has been added to the discussion",
    postCreated: "Post Created",
    postCreatedDescription: "Your post has been shared with the community",
    postLiked: "Post Liked",
    postLikedDescription: "You liked this post",
    progress: "Progress",
    participants: "participants",
    daysLeft: "days left",
    completed: "Completed",
    viewResults: "View Results",
    joinChallenge: "Join Challenge",
    challengeJoined: "Challenge Joined",
    challengeJoinedDescription: "You've successfully joined the challenge",
    weeklyStepsLeaderboard: "Weekly Steps Leaderboard",
    viewFullLeaderboard: "View Full Leaderboard",
    leaderboardDescription: "View complete leaderboard and your ranking history",
    you: "You",

    // Community badges
    expertWalker: "Expert Walker",
    fallPreventionCoach: "Fall Prevention Coach",
    progressChampion: "Progress Champion",

    // Community posts
    post1Content:
      "Just completed my 10,000 steps goal for the 7th day in a row! The stability exercises from WalkSafe have really helped improve my balance.",
    post2Content:
      "Tip of the day: When walking on uneven surfaces, slightly bend your knees to lower your center of gravity and improve stability. This simple adjustment can significantly reduce fall risk!",
    post3Content:
      "I've been using WalkSafe for 3 months now, and my stability score has improved from 65% to 82%! So grateful for this community and all the support.",
    hoursAgo: "{hours} hours ago",
    yesterday: "Yesterday",

    // Challenges
    challenge1Title: "7-Day Step Challenge",
    challenge1Description: "Complete 5,000 steps every day for 7 consecutive days",
    challenge2Title: "Balance Master",
    challenge2Description: "Complete all balance exercises in the app for 5 days",
    challenge3Title: "Walking Buddy",
    challenge3Description: "Invite a friend to join you for a 30-minute walk",

    // Profile
    personalInformation: "Personal Information",
    fullName: "Full Name",
    email: "Email",
    age: "Age",
    gender: "Gender",
    selectGender: "Select gender",
    male: "Male",
    female: "Female",
    other: "Other",
    medicalConditions: "Medical Conditions",
    saveChanges: "Save Changes",
    dataSharing: "Data Sharing",
    language: "Language",
    selectLanguage: "Select language",
    english: "English",
    thai: "Thai",
    profileUpdated: "Profile Updated",
    profileUpdateSuccess: "Your profile has been successfully updated",
    contactingSupport: "Connecting you with our support team",
    signOutConfirmation: "You are about to sign out of your account",

    // Settings translations
    settings: "Settings",
    settingsSaved: "Settings Saved",
    settingsSavedDesc: "Your settings have been saved successfully.",
    account: "Account",
    appSettings: "App Settings",
    goals: "Goals",
    privacy: "Privacy",
    profile: "Profile",
    profileDesc: "Manage your personal information",
    name: "Name",
    email: "Email",
    phone: "Phone",
    saveChanges: "Save Changes",
    password: "Password",
    passwordDesc: "Update your password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    updatePassword: "Update Password",
    appearance: "Appearance",
    appearanceDesc: "Customize how the app looks",
    darkMode: "Dark Mode",
    darkModeEnabled: "Dark Mode Enabled",
    darkModeDisabled: "Dark Mode Disabled",
    darkModeEnabledDesc: "The app will now use dark mode.",
    darkModeDisabledDesc: "The app will now use light mode.",
    language: "Language",
    notifications: "Notifications",
    notificationsDesc: "Manage your notification preferences",
    enableNotifications: "Enable Notifications",
    notificationsEnabled: "Notifications Enabled",
    notificationsDisabled: "Notifications Disabled",
    notificationsEnabledDesc: "You will now receive notifications.",
    notificationsDisabledDesc: "You will no longer receive notifications.",
    notificationType: "Notification Type",
    selectNotificationType: "Select notification type",
    allNotifications: "All Notifications",
    importantOnly: "Important Only",
    noNotifications: "No Notifications",
    dailyGoals: "Daily Goals",
    dailyGoalsDesc: "Set your daily activity goals",
    stepGoal: "Step Goal",
    steps: "steps",
    walkingTimeGoal: "Walking Time Goal",
    minutes: "minutes",
    saveGoals: "Save Goals",
    dataSharing: "Data Sharing",
    dataSharingDesc: "Control how your data is shared",
    shareData: "Share Data",
    dataSharingEnabled: "Data Sharing Enabled",
    dataSharingDisabled: "Data Sharing Disabled",
    dataSharingEnabledDesc: "Your data will be shared for analysis.",
    dataSharingDisabledDesc: "Your data will not be shared.",
    exportData: "Export Data",
    exportDataDesc: "Download a copy of your data",
    dataExported: "Data Exported",
    dataExportedDesc: "Your data has been exported successfully.",
    dangerZone: "Danger Zone",
    dangerZoneDesc: "Irreversible actions",
    deleteAccount: "Delete Account",
    warning: "Warning",
    deleteAccountWarning: "This action cannot be undone. Your account and all data will be permanently deleted.",

    // Help translations
    helpAndSupport: "Help & Support",
    searchHelp: "Search help articles...",
    guides: "Guides",
    faq: "FAQ",
    contactUs: "Contact Us",
    gettingStarted: "Getting Started",
    gettingStartedDesc: "Learn the basics of using WalkSafe",
    appTutorial: "App Tutorial",
    tutorialStarted: "Tutorial Started",
    tutorialStartedDesc: "Follow the on-screen instructions to learn how to use the app.",
    howToTrackSteps: "How to Track Steps",
    understandingFallRisk: "Understanding Fall Risk",
    videoOpened: "Video Tutorial",
    featureGuides: "Feature Guides",
    featureGuidesDesc: "Learn how to use each feature",
    dashboardGuideDesc: "Overview of your daily activity and health metrics",
    activityGuideDesc: "Track your steps, distance, and walking time",
    stabilityGuideDesc: "Monitor your walking stability and balance",
    fallRiskGuideDesc: "Understand your fall risk assessment",
    uploadGuideDesc: "Upload videos for gait analysis",
    communityGuideDesc: "Connect with others and share your progress",
    readMore: "Read More",
    guideOpened: "Guide Opened",
    frequentlyAskedQuestions: "Frequently Asked Questions",
    faqDesc: "Find answers to common questions",
    faqQuestion1: "How accurate is the step tracking?",
    faqAnswer1:
      "WalkSafe uses your device's built-in sensors to track steps with approximately 95% accuracy. For best results, keep your phone in your pocket or bag while walking.",
    faqQuestion2: "Can I use WalkSafe without internet connection?",
    faqAnswer2:
      "Yes, basic step tracking works offline. However, features like fall risk assessment and video analysis require an internet connection to process data.",
    faqQuestion3: "How is my fall risk calculated?",
    faqAnswer3:
      "Fall risk is calculated using AI algorithms that analyze your walking patterns, stability, and historical data. The assessment considers factors like gait speed, stride length, and balance.",
    faqQuestion4: "Is my data secure?",
    faqAnswer4:
      "Yes, we take data security seriously. All your personal information and health data is encrypted and stored securely. You can control data sharing in the Settings.",
    faqQuestion5: "Can I share my progress with my doctor?",
    faqAnswer5:
      "Yes, you can export your data reports from the Settings page and share them with your healthcare provider.",
    faqQuestion6: "How often should I upload walking videos?",
    faqAnswer6:
      "For the most accurate analysis, we recommend uploading a walking video once a week. This helps our AI track changes in your gait and stability over time.",
    faqQuestion7: "Can I use WalkSafe on multiple devices?",
    faqAnswer7:
      "Yes, you can sign in to your WalkSafe account on multiple devices. Your data will sync across all devices when connected to the internet.",
    contactSupport: "Contact Support",
    contactSupportDesc: "Get help from our support team",
    subject: "Subject",
    subjectPlaceholder: "What do you need help with?",
    message: "Message",
    messagePlaceholder: "Describe your issue or question in detail...",
    sendMessage: "Send Message",
    questionSubmitted: "Question Submitted",
    questionSubmittedDesc: "We've received your question and will respond within 24 hours.",
  },
  th: {
    // General
    walkingDetectionForElderly: "ระบบตรวจจับการเดินสำหรับผู้สูงอายุ",
    loading: "กำลังโหลดข้อมูลสุขภาพของคุณ...",
    welcomeToWalkSafe: "ยินดีต้อนรับสู่ WalkSafe",
    welcomeDescription: "ผู้ช่วยการเดินส่วนตัวของคุณเพื่อป้องกันการล้ม",
    refresh: "รีเฟรช",

    // Navigation
    dashboard: "หน้าหลัก",
    activity: "กิจกรรม",
    stability: "ความมั่นคง",
    fallRisk: "ความเสี่ยงในการล้ม",
    upload: "อัปโหลด",
    community: "ชุมชน",
    profile: "โปรไฟล์",
    settings: "ตั้งค่า",
    help: "ช่วยเหลือ",
    helpSupport: "ช่วยเหลือและสนับสนุน",
    signOut: "ออกจากระบบ",
    toggleMenu: "สลับเมนู",
    collapseSidebar: "ย่อแถบด้านข้าง",
    notifications: "การแจ้งเตือน",
    notificationsDescription: "คุณมี 2 การแจ้งเตือนที่ยังไม่ได้อ่าน",
    settingsDescription: "ปรับการตั้งค่าแอปของคุณ",
    helpDescription: "รับความช่วยเหลือและการสนับสนุน",
    signedOut: "ออกจากระบบแล้ว",
    signedOutDescription: "คุณได้ออกจากระบบแล้ว",

    // Dashboard
    overview: "ภาพรวม",
    uploadWalkingVideo: "อัปโหลดวิดีโอการเดิน",
    stepTracking: "การติดตามก้าว",
    walkingTime: "เวลาเดิน",
    stabilityScore: "คะแนนความมั่นคง",
    fallRiskAssessment: "การประเมินความเสี่ยงในการล้ม",
    recentActivity: "กิจกรรมล่าสุด",
    stepsGoal: "เป้าหมาย: {goal} ก้าว",
    timeGoal: "เป้าหมาย: {goal} นาที",
    viewDetails: "ดูรายละเอียด",
    viewAnalysis: "ดูการวิเคราะห์",
    viewFullReport: "ดูรายงานฉบับเต็ม",
    min: "นาที",
    steps: "ก้าว",
    details: "รายละเอียด",
    sessionDetails: "รายละเอียดเซสชัน",
    sessionDetailsDescription: "กำลังดูรายละเอียดสำหรับเซสชันเวลา {time}",

    // Risk levels
    low: "ต่ำ",
    medium: "ปานกลาง",
    high: "สูง",
    lowRiskMessage: "รูปแบบการเดินของคุณบ่งชี้ว่ามีความเสี่ยงต่ำในการล้ม",
    mediumRiskMessage: "รูปแบบการเดินของคุณแสดงความไม่มั่นคงบางอย่าง โปรดระวัง",
    highRiskMessage: "รูปแบบการเดินของคุณบ่งชี้ว่ามีความเสี่ยงสูงในการล้ม โปรดระมัดระวัง",
    unknownRiskMessage: "เราต้องการข้อมูลเพิ่มเติมเพื่อประเมินความเสี่ยงในการล้มของคุณ",

    // Activity
    walkingHistory: "ประวัติการเดิน",
    calendar: "ปฏิทิน",
    calendarDescription: "มุมมองปฏิทินไม่พร้อมใช้งานในเดโม",
    selectDate: "เลือกวันที่",
    time: "เวลา",
    weekly: "รายสัปดาห์",
    monthly: "รายเดือน",
    stepsProgress: "ความคืบหน้าก้าว",
    walkingTimeProgress: "ความคืบหน้าเวลาเดิน",
    stabilityProgress: "ความคืบหน้าความมั่นคง",
    recentActivities: "กิจกรรมล่าสุด",
    weeklyStepsSummary: "สรุปก้าวรายสัปดาห์",
    weeklyTimeSummary: "สรุปเวลารายสัปดาห์",
    weeklyStabilitySummary: "สรุปความมั่นคงรายสัปดาห์",
    totalSteps: "ก้าวทั้งหมด",
    totalTime: "เวลาทั้งหมด",
    dailyAverage: "ค่าเฉลี่ยรายวัน",
    bestDay: "วันที่ดีที่สุด",
    worstDay: "วันที่แย่ที่สุด",
    goalCompletion: "การบรรลุเป้าหมาย",
    averageStability: "ความมั่นคงเฉลี่ย",
    stabilityTrend: "แนวโน้มความมั่นคง",

    // Days
    mon: "จ.",
    tue: "อ.",
    wed: "พ.",
    thu: "พฤ.",
    fri: "ศ.",
    sat: "ส.",
    sun: "อา.",

    // Months
    jan: "ม.ค.",
    feb: "ก.พ.",
    mar: "มี.ค.",
    apr: "เม.ย.",
    may: "พ.ค.",
    jun: "มิ.ย.",

    // Weeks
    week1: "สัปดาห์ 1",
    week2: "สัปดาห์ 2",
    week3: "สัปดาห์ 3",
    week4: "สัปดาห์ 4",

    // Stability
    stabilityAnalysis: "การวิเคราะห์ความมั่นคง",
    currentStabilityScore: "คะแนนความมั่นคงปัจจุบัน",
    stabilityScoreDescription:
      "คะแนนความมั่นคงของคุณคำนวณจากรูปแบบการเดิน ท่าทาง และการทรงตัว คะแนนที่สูงขึ้นบ่งชี้ถึงความมั่นคงที่ดีขึ้นและความเสี่ยงในการล้มที่ต่ำลง",
    gaitPattern: "รูปแบบการเดิน",
    pressureDistribution: "การกระจายแรงกด",
    stabilityFactors: "ปัจจัยความมั่นคง",
    gaitStabilityAnalysis: "การวิเคราะห์ความมั่นคงในการเดิน",
    footPressureDistribution: "การกระจายแรงกดที่เท้า",
    stabilityFactorsAnalysis: "การวิเคราะห์ปัจจัยความมั่นคง",
    gaitAnalysisDescription: "แผนภูมินี้แสดงความมั่นคงในการเดินของคุณตามเวลา ค่าที่สูงขึ้นแสดงถึงความมั่นคงที่ดีขึ้น",
    pressureDistributionDescription: "แผนภูมินี้แสดงการกระจายแรงกดบนเท้าของคุณขณะเดิน",
    stabilityFactorsDescription: "แผนภูมินี้แสดงปัจจัยต่างๆ ที่มีส่วนในคะแนนความมั่นคงโดยรวมของคุณ",
    gaitAnalysisInsights: "ข้อมูลเชิงลึกการวิเคราะห์การเดิน",
    pressureDistributionInsights: "ข้อมูลเชิงลึกการกระจายแรงกด",
    stabilityFactorsInsights: "ข้อมูลเชิงลึกปัจจัยความมั่นคง",
    gaitInsight1: "ความยาวก้าวของคุณสม่ำเสมอ ซึ่งดีสำหรับความมั่นคง",
    gaitInsight2: "มีความผันผวนบางอย่างในจังหวะการเดินของคุณที่สามารถปรับปรุงได้",
    gaitInsight3: "ความมั่นคงในการหมุนตัวของคุณดี แสดงถึงการเคลื่อนไหวที่ควบคุมได้",
    pressureInsight1: "คุณลงน้ำหนักที่เท้าขวามากกว่าเท้าซ้ายเล็กน้อย",
    pressureInsight2: "รูปแบบการลงส้นเท้าของคุณปกติ ซึ่งดีสำหรับความมั่นคง",
    pressureInsight3: "พิจารณาการออกกำลังกายเพื่อปรับปรุงการกระจายน้ำหนักบนเท้าของคุณ",
    factorsInsight1: "การทรงตัวของคุณดี แต่สามารถปรับปรุงได้ด้วยการออกกำลังกายเฉพาะ",
    factorsInsight2: "ท่าทางของคุณขณะเดินยอดเยี่ยม รักษาไว้!",
    factorsInsight3: "ความสมมาตรของก้าวของคุณสามารถปรับปรุงได้เพื่อเพิ่มความมั่นคงโดยรวม",
    aiAnalysis: "การวิเคราะห์ด้วย AI",
    aiAnalysisDescription: "กำลังสร้างการวิเคราะห์ AI โดยละเอียด",
    fullAnalysis: "การวิเคราะห์แบบเต็ม",
    fullAnalysisDescription: "กำลังสร้างรายงานการวิเคราะห์การเดินแบบครอบคลุมของคุณ",
    generateFullAnalysis: "สร้างการวิเคราะห์แบบเต็ม",

    // Foot parts
    leftHeel: "ส้นเท้าซ้าย",
    leftMid: "กลางเท้าซ้าย",
    leftToe: "นิ้วเท้าซ้าย",
    rightHeel: "ส้นเท้าขวา",
    rightMid: "กลางเท้าขวา",
    rightToe: "นิ้วเท้าขวา",

    // Stability factors
    balance: "การทรงตัว",
    posture: "ท่าทาง",
    gaitRhythm: "จังหวะการเดิน",
    stepSymmetry: "ความสมมาตรของก้าว",
    turnStability: "ความมั่นคงในการหมุนตัว",

    // Fall Risk
    fallRiskAnalysis: "การวิเคราะห์ความเสี่ยงในการล้ม",
    currentRiskAssessment: "การประเมินความเสี่ยงปัจจุบัน",
    riskFactors: "ปัจจัยเสี่ยง",
    riskTrend: "แนวโน้มความเสี่ยง",
    improvementOpportunities: "โอกาสในการปรับปรุง",
    aiRecommendations: "คำแนะนำจาก AI",
    personalizedRecommendations: "คำแนะนำส่วนบุคคล",
    riskFactorsDescription: "แผนภูมินี้แสดงปัจจัยที่มีผลต่อการประเมินความเสี่ยงในการล้มของคุณ",
    riskTrendDescription: "แผนภูมินี้แสดงการเปลี่ยนแปลงความเสี่ยงในการล้มของคุณตามเวลา",
    improvementOpportunitiesDescription: "นี่คือพื้นที่ที่คุณสามารถปรับปรุงเพื่อลดความเสี่ยงในการล้มของคุณ",
    shareReport: "แชร์รายงาน",
    shareReportDescription: "รายงานได้ถูกแชร์กับแพทย์ของคุณแล้ว",
    shareWithDoctor: "แชร์กับแพทย์",
    detailedReport: "รายงานโดยละเอียด",
    detailedReportDescription: "กำลังสร้างรายงานความเสี่ยงในการล้มโดยละเอียดของคุณ",
    generateDetailedReport: "สร้างรายงานโดยละเอียด",

    // Risk factors
    strength: "ความแข็งแรง",
    gaitSpeed: "ความเร็วในการเดิน",
    coordination: "การประสานงาน",
    reactionTime: "เวลาตอบสนอง",

    // Improvement areas
    balanceExercises: "การออกกำลังกายเพื่อการทรงตัว",
    strengthTraining: "การฝึกความแข็งแรง",
    gaitTraining: "การฝึกการเดิน",
    homeModifications: "การปรับปรุงบ้าน",
    properFootwear: "รองเท้าที่เหมาะสม",

    // Recommendations
    recommendation1Title: "การออกกำลังกายเพื่อการทรงตัวประจำวัน",
    recommendation1Description: "ฝึกยืนขาเดียวเป็นเวลา 30 วินาทีทุกวันเพื่อปรับปรุงการทรงตัว",
    recommendation2Title: "การฝึกความแข็งแรง",
    recommendation2Description: "ทำท่าสควอทบนเก้าอี้ 10 ครั้งวันละสองครั้งเพื่อเสริมสร้างกล้ามเนื้อขา",
    recommendation3Title: "รองเท้าที่เหมาะสม",
    recommendation3Description: "ตรวจสอบให้แน่ใจว่ารองเท้าของคุณให้การรองรับที่ดีและมีพื้นกันลื่น",

    // Upload
    videoUpload: "อัปโหลดวิดีโอ",
    uploadWalkingVideoTitle: "อัปโหลดวิดีโอการเดินเพื่อการวิเคราะห์",
    uploadWalkingVideoDescription: "อัปโหลดวิดีโอรูปแบบการเดินของคุณเพื่อการวิเคราะห์ท่าทาง การเดิน และความมั่นคงด้วย AI",
    dragAndDropOrClick: "ลากและวางไฟล์วิดีโอที่นี่หรือคลิกเพื่อเรียกดู",
    uploading: "กำลังอัปโหลด",
    analyzingVideo: "กำลังวิเคราะห์รูปแบบการเดินของคุณ...",
    analysisResults: "ผลการวิเคราะห์",
    analysisSuccessful: "การวิเคราะห์สำเร็จ",
    analysisSuccessfulDescription: "AI ของเราได้วิเคราะห์รูปแบบการเดินของคุณและระบุข้อมูลเชิงลึกสำคัญเพื่อช่วยปรับปรุงความมั่นคงของคุณ",
    analysisComplete: "การวิเคราะห์เสร็จสมบูรณ์",
    analysisCompleteDescription: "วิดีโอการเดินของคุณได้รับการวิเคราะห์เรียบร้อยแล้ว",
    invalidFileType: "ประเภทไฟล์ไม่ถูกต้อง",
    pleaseUploadVideo: "โปรดอัปโหลดไฟล์วิดีโอ",
    uploadTips: "เคล็ดลับสำหรับการวิเคราะห์ที่ดีขึ้น",
    tipTitle1: "บันทึกจากด้านข้าง",
    tipDescription1: "เพื่อผลลัพธ์ที่ดีที่สุด บันทึกการเดินของคุณจากด้านข้างเพื่อจับการเคลื่อนไหวของร่างกายทั้งหมด",
    tipTitle2: "เดินตามธรรมชาติ",
    tipDescription2: "เดินด้วยความเร็วปกติและในลักษณะปกติของคุณเพื่อการวิเคราะห์ที่แม่นยำที่สุด",
    tipTitle3: "แสงสว่างที่ดี",
    tipDescription3: "ตรวจสอบให้แน่ใจว่าพื้นที่มีแสงสว่างเพียงพอเพื่อให้ AI สามารถเห็นรูปแบบการเดินของคุณได้อย่างชัดเจน",
    gaitAnalysis: "การวิเคราะห์การเดิน",
    postureAnalysis: "การวิเคราะห์ท่าทาง",
    areasForImprovement: "พื้นที่สำหรับการปรับปรุง",
    improvementArea1: "ความกว้างของก้าวของคุณค่อนข้างแคบ ซึ่งอาจส่งผลต่อความมั่นคง ลองเดินโดยให้เท้าห่างกันเล็กน้อย",
    improvementArea2: "ลำตัวของคุณเอียงไปข้างหน้าเล็กน้อยเมื่อเดิน มุ่งเน้นการรักษาท่าทางตรง",
    improvementArea3: "การแกว่งแขนของคุณมีจำกัด ซึ่งอาจส่งผลต่อการทรงตัว ฝึกเดินด้วยการเคลื่อนไหวแขนตามธรรมชาติ",
    viewDetailedReport: "ดูรายงานโดยละเอียด",

    // Gait measurements
    stepLength: "ความยาวก้าว",
    stepWidth: "ความกว้างก้าว",
    cadence: "จังหวะก้าว",
    walkingSpeed: "ความเร็วในการเดิน",

    // Posture measurements
    trunkAngle: "มุมลำตัว",
    armSwing: "การแกว่งแขน",
    headPosition: "ตำแหน่งศีรษะ",
    shoulderAlignment: "การจัดแนวไหล่",

    // Qualitative descriptions
    moderate: "ปานกลาง",
    good: "ดี",
    slightlyUneven: "ไม่สม่ำเสมอเล็กน้อย",

    // Community
    feed: "ฟีด",
    challenges: "ความท้าทาย",
    leaderboard: "กระดานผู้นำ",
    shareProgress: "แชร์ความคืบหน้าการเดินหรือเคล็ดลับของคุณ...",
    share: "แชร์",
    likes: "ถูกใจ",
    comments: "ความคิดเห็น",
    like: "ถูกใจ",
    comment: "แสดงความคิดเห็น",
    writeComment: "เขียนความคิดเห็น...",
    commentPosted: "โพสต์ความคิดเห็นแล้ว",
    commentPostedDescription: "ความคิดเห็นของคุณได้ถูกเพิ่มเข้าไปในการสนทนาแล้ว",
    postCreated: "สร้างโพสต์แล้ว",
    postCreatedDescription: "โพสต์ของคุณได้ถูกแชร์กับชุมชนแล้ว",
    postLiked: "ถูกใจโพสต์แล้ว",
    postLikedDescription: "คุณได้กดถูกใจโพสต์นี้",
    progress: "ความคืบหน้า",
    participants: "ผู้เข้าร่วม",
    daysLeft: "วันที่เหลือ",
    completed: "เสร็จสมบูรณ์",
    viewResults: "ดูผลลัพธ์",
    joinChallenge: "เข้าร่วมความท้าทาย",
    challengeJoined: "เข้าร่วมความท้าทายแล้ว",
    challengeJoinedDescription: "คุณได้เข้าร่วมความท้าทายเรียบร้อยแล้ว",
    weeklyStepsLeaderboard: "กระดานผู้นำก้าวรายสัปดาห์",
    viewFullLeaderboard: "ดูกระดานผู้นำแบบเต็ม",
    leaderboardDescription: "ดูกระดานผู้นำแบบเต็มและประวัติอันดับของคุณ",
    you: "คุณ",

    // Community badges
    expertWalker: "ผู้เดินเชี่ยวชาญ",
    fallPreventionCoach: "โค้ชป้องกันการล้ม",
    progressChampion: "แชมป์ความคืบหน้า",

    // Community posts
    post1Content:
      "เพิ่งบรรลุเป้าหมาย 10,000 ก้าวเป็นวันที่ 7 ติดต่อกัน! การออกกำลังกายเพื่อความมั่นคงจาก WalkSafe ช่วยปรับปรุงการทรงตัวของฉันได้จริงๆ",
    post2Content:
      "เคล็ดลับประจำวัน: เมื่อเดินบนพื้นผิวที่ไม่เรียบ ให้งอเข่าเล็กน้อยเพื่อลดจุดศูนย์ถ่วงและปรับปรุงความมั่นคง การปรับเปลี่ยนง่ายๆ นี้สามารถลดความเสี่ยงในการล้มได้อย่างมาก!",
    post3Content:
      "ฉันใช้ WalkSafe มา 3 เดือนแล้ว และคะแนนความมั่นคงของฉันได้ปรับปรุงจาก 65% เป็น 82%! ขอบคุณชุมชนนี้และการสนับสนุนทั้งหมด",
    hoursAgo: "{hours} ชั่วโมงที่แล้ว",
    yesterday: "เมื่อวาน",

    // Challenges
    challenge1Title: "ความท้าทาย 7 วัน",
    challenge1Description: "ทำให้ครบ 5,000 ก้าวทุกวันเป็นเวลา 7 วันติดต่อกัน",
    challenge2Title: "ผู้เชี่ยวชาญการทรงตัว",
    challenge2Description: "ทำการออกกำลังกายเพื่อการทรงตัวทั้งหมดในแอปเป็นเวลา 5 วัน",
    challenge3Title: "เพื่อนร่วมเดิน",
    challenge3Description: "เชิญเพื่อนมาร่วมเดินกับคุณเป็นเวลา 30 นาที",

    // Profile
    personalInformation: "ข้อมูลส่วนตัว",
    fullName: "ชื่อเต็ม",
    email: "อีเมล",
    age: "อายุ",
    gender: "เพศ",
    selectGender: "เลือกเพศ",
    male: "ชาย",
    female: "หญิง",
    other: "อื่นๆ",
    medicalConditions: "เงื่อนไขทางการแพทย์",
    saveChanges: "บันทึกการเปลี่ยนแปลง",
    dataSharing: "การแบ่งปันข้อมูล",
    language: "ภาษา",
    selectLanguage: "เลือกภาษา",
    english: "อังกฤษ",
    thai: "ไทย",
    profileUpdated: "อัปเดตโปรไฟล์แล้ว",
    profileUpdateSuccess: "โปรไฟล์ของคุณได้รับการอัปเดตเรียบร้อยแล้ว",
    contactingSupport: "กำลังเชื่อมต่อคุณกับทีมสนับสนุนของเรา",
    signOutConfirmation: "คุณกำลังจะออกจากระบบบัญชีของคุณ",

    // Settings translations
    settings: "ตั้งค่า",
    settingsSaved: "บันทึกการตั้งค่าแล้ว",
    settingsSavedDesc: "การตั้งค่าของคุณได้รับการบันทึกเรียบร้อยแล้ว",
    account: "บัญชี",
    appSettings: "การตั้งค่าแอป",
    goals: "เป้าหมาย",
    privacy: "ความเป็นส่วนตัว",
    profile: "โปรไฟล์",
    profileDesc: "จัดการข้อมูลส่วนตัวของคุณ",
    name: "ชื่อ",
    email: "อีเมล",
    phone: "โทรศัพท์",
    saveChanges: "บันทึกการเปลี่ยนแปลง",
    password: "รหัสผ่าน",
    passwordDesc: "อัปเดตรหัสผ่านของคุณ",
    currentPassword: "รหัสผ่านปัจจุบัน",
    newPassword: "รหัสผ่านใหม่",
    confirmPassword: "ยืนยันรหัสผ่าน",
    updatePassword: "อัปเดตรหัสผ่าน",
    appearance: "ลักษณะที่ปรากฏ",
    appearanceDesc: "ปรับแต่งลักษณะที่ปรากฏของแอป",
    darkMode: "โหมดมืด",
    darkModeEnabled: "เปิดใช้งานโหมดมืด",
    darkModeDisabled: "ปิดใช้งานโหมดมืด",
    darkModeEnabledDesc: "แอปจะใช้โหมดมืด",
    darkModeDisabledDesc: "แอปจะใช้โหมดสว่าง",
    language: "ภาษา",
    notifications: "การแจ้งเตือน",
    notificationsDesc: "จัดการการตั้งค่าการแจ้งเตือนของคุณ",
    enableNotifications: "เปิดใช้งานการแจ้งเตือน",
    notificationsEnabled: "เปิดใช้งานการแจ้งเตือนแล้ว",
    notificationsDisabled: "ปิดใช้งานการแจ้งเตือนแล้ว",
    notificationsEnabledDesc: "คุณจะได้รับการแจ้งเตือน",
    notificationsDisabledDesc: "คุณจะไม่ได้รับการแจ้งเตือน",
    notificationType: "ประเภทการแจ้งเตือน",
    selectNotificationType: "เลือกประเภทการแจ้งเตือน",
    allNotifications: "การแจ้งเตือนทั้งหมด",
    importantOnly: "เฉพาะที่สำคัญ",
    noNotifications: "ไม่มีการแจ้งเตือน",
    dailyGoals: "เป้าหมายรายวัน",
    dailyGoalsDesc: "ตั้งเป้าหมายกิจกรรมรายวันของคุณ",
    stepGoal: "เป้าหมายก้าว",
    steps: "ก้าว",
    walkingTimeGoal: "เป้าหมายเวลาเดิน",
    minutes: "นาที",
    saveGoals: "บันทึกเป้าหมาย",
    dataSharing: "การแบ่งปันข้อมูล",
    dataSharingDesc: "ควบคุมวิธีการแบ่งปันข้อมูลของคุณ",
    shareData: "แบ่งปันข้อมูล",
    dataSharingEnabled: "เปิดใช้งานการแบ่งปันข้อมูลแล้ว",
    dataSharingDisabled: "ปิดใช้งานการแบ่งปันข้อมูลแล้ว",
    dataSharingEnabledDesc: "ข้อมูลของคุณจะถูกแบ่งปันเพื่อการวิเคราะห์",
    dataSharingDisabledDesc: "ข้อมูลของคุณจะไม่ถูกแบ่งปัน",
    exportData: "ส่งออกข้อมูล",
    exportDataDesc: "ดาวน์โหลดสำเนาข้อมูลของคุณ",
    dataExported: "ส่งออกข้อมูลแล้ว",
    dataExportedDesc: "ข้อมูลของคุณถูกส่งออกเรียบร้อยแล้ว",
    dangerZone: "โซนอันตราย",
    dangerZoneDesc: "การกระทำที่ไม่สามารถย้อนกลับได้",
    deleteAccount: "ลบบัญชี",
    warning: "คำเตือน",
    deleteAccountWarning: "การกระทำนี้ไม่สามารถยกเลิกได้ บัญชีและข้อมูลทั้งหมดของคุณจะถูกลบอย่างถาวร",

    // Help translations
    helpAndSupport: "ช่วยเหลือและสนับสนุน",
    searchHelp: "ค้นหาบทความช่วยเหลือ...",
    guides: "คำแนะนำ",
    faq: "คำถามที่พบบ่อย",
    contactUs: "ติดต่อเรา",
    gettingStarted: "เริ่มต้นใช้งาน",
    gettingStartedDesc: "เรียนรู้พื้นฐานการใช้งาน WalkSafe",
    appTutorial: "บทช่วยสอนแอป",
    tutorialStarted: "เริ่มบทช่วยสอนแล้ว",
    tutorialStartedDesc: "ทำตามคำแนะนำบนหน้าจอเพื่อเรียนรู้วิธีใช้แอป",
    howToTrackSteps: "วิธีติดตามก้าว",
    understandingFallRisk: "ทำความเข้าใจความเสี่ยงในการล้ม",
    videoOpened: "วิดีโอสอน",
    featureGuides: "คู่มือคุณสมบัติ",
    featureGuidesDesc: "เรียนรู้วิธีใช้แต่ละคุณสมบัติ",
    dashboardGuideDesc: "ภาพรวมของกิจกรรมประจำวันและเมตริกสุขภาพของคุณ",
    activityGuideDesc: "ติดตามก้าว ระยะทาง และเวลาเดินของคุณ",
    stabilityGuideDesc: "ตรวจสอบความมั่นคงในการเดินและการทรงตัวของคุณ",
    fallRiskGuideDesc: "ทำความเข้าใจการประเมินความเสี่ยงในการล้มของคุณ",
    uploadGuideDesc: "อัปโหลดวิดีโอเพื่อวิเคราะห์การเดิน",
    communityGuideDesc: "เชื่อมต่อกับผู้อื่นและแบ่งปันความคืบหน้าของคุณ",
    readMore: "อ่านเพิ่มเติม",
    guideOpened: "เปิดคู่มือแล้ว",
    frequentlyAskedQuestions: "คำถามที่พบบ่อย",
    faqDesc: "ค้นหาคำตอบสำหรับคำถามทั่วไป",
    faqQuestion1: "การติดตามก้าวมีความแม่นยำเพียงใด",
    faqAnswer1:
      "WalkSafe ใช้เซ็นเซอร์ในตัวของอุปกรณ์เพื่อติดตามก้าวด้วยความแม่นยำประมาณ 95% เพื่อผลลัพธ์ที่ดีที่สุด ให้เก็บโทรศัพท์ไว้ในกระเป๋าเสื้อหรือกระเป๋าขณะเดิน",
    faqQuestion2: "ฉันสามารถใช้ WalkSafe โดยไม่เชื่อมต่ออินเทอร์เน็ตได้หรือไม่",
    faqAnswer2:
      "ได้ การติดตามก้าวพื้นฐานทำงานแบบออฟไลน์ อย่างไรก็ตาม คุณสมบัติต่างๆ เช่น การประเมินความเสี่ยงในการล้มและการวิเคราะห์วิดีโอต้องใช้การเชื่อมต่ออินเทอร์เน็ตเพื่อประมวลผลข้อมูล",
    faqQuestion3: "ความเสี่ยงในการล้มของฉันคำนวณอย่างไร",
    faqAnswer3:
      "ความเสี่ยงในการล้มคำนวณโดยใช้อัลกอริทึม AI ที่วิเคราะห์รูปแบบการเดิน ความมั่นคง และข้อมูลในอดีตของคุณ การประเมินจะพิจารณาปัจจัยต่างๆ เช่น ความเร็วในการเดิน ความยาวช่วงก้าว และการทรงตัว",
    faqQuestion4: "ข้อมูลของฉันปลอดภัยหรือไม่",
    faqAnswer4:
      "ใช่ เราให้ความสำคัญกับความปลอดภัยของข้อมูล ข้อมูลส่วนบุคคลและข้อมูลสุขภาพทั้งหมดของคุณได้รับการเข้ารหัสและจัดเก็บอย่างปลอดภัย คุณสามารถควบคุมการแบ่งปันข้อมูลในการตั้งค่า",
    faqQuestion5: "ฉันสามารถแบ่งปันความคืบหน้าของฉันกับแพทย์ได้หรือไม่",
    faqAnswer5: "ได้ คุณสามารถส่งออกรายงานข้อมูลของคุณจากหน้าการตั้งค่าและแบ่งปันกับผู้ให้บริการด้านการดูแลสุขภาพของคุณ",
    faqQuestion6: "ฉันควรอัปโหลดวิดีโอการเดินบ่อยแค่ไหน",
    faqAnswer6:
      "เพื่อให้การวิเคราะห์แม่นยำที่สุด เราแนะนำให้อัปโหลดวิดีโอการเดินสัปดาห์ละครั้ง ซึ่งจะช่วยให้ AI ของเราติดตามการเปลี่ยนแปลงในการเดินและความมั่นคงของคุณเมื่อเวลาผ่านไป",
    faqQuestion7: "ฉันสามารถใช้ WalkSafe บนอุปกรณ์หลายเครื่องได้หรือไม่",
    faqAnswer7: "ได้ คุณสามารถลงชื่อเข้าใช้บัญชี WalkSafe ของคุณบนอุปกรณ์หลายเครื่อง ข้อมูลของคุณจะซิงค์กับอุปกรณ์ทั้งหมดเมื่อเชื่อมต่อกับอินเทอร์เน็ต",
    contactSupport: "ติดต่อฝ่ายสนับสนุน",
    contactSupportDesc: "รับความช่วยเหลือจากทีมสนับสนุนของเรา",
    subject: "หัวข้อ",
    subjectPlaceholder: "คุณต้องการความช่วยเหลือเกี่ยวกับอะไร",
    message: "ข้อความ",
    messagePlaceholder: "อธิบายปัญหาหรือคำถามของคุณโดยละเอียด...",
    sendMessage: "ส่งข้อความ",
    questionSubmitted: "ส่งคำถามแล้ว",
    questionSubmittedDesc: "เราได้รับคำถามของคุณแล้วและจะตอบกลับภายใน 24 ชั่วโมง",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, any>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "th")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string, params?: Record<string, any>): string => {
    let text = translations[language][key] || key

    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, String(paramValue))
      })
    }

    return text
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}

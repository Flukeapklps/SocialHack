import { Chart } from "@/components/ui/chart"
document.addEventListener("DOMContentLoaded", () => {
  console.log("WalkSafe app initialized")

  // Navigation
  const navItems = document.querySelectorAll(".nav-item")
  const views = document.querySelectorAll(".view")

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      console.log("Navigation item clicked:", this.getAttribute("data-view"))
      const viewId = this.getAttribute("data-view")

      // Remove active class from all nav items and views
      navItems.forEach((navItem) => navItem.classList.remove("active"))
      views.forEach((view) => view.classList.remove("active-view"))

      // Add active class to clicked nav item and corresponding view
      this.classList.add("active")
      document.getElementById(viewId).classList.add("active-view")
    })
  })

  // Tabs
  const tabs = document.querySelectorAll(".tab")

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      console.log("Tab clicked:", this.getAttribute("data-tab"))
      const tabGroup = this.closest(".tabs")
      const tabsContainer = this.closest(".tabs-container")
      const tabName = this.getAttribute("data-tab")

      // Update active tab
      tabGroup.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"))
      this.classList.add("active")

      // Show selected tab content
      tabsContainer.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active")
        if (content.id === `${tabName}-tab`) {
          content.classList.add("active")
        }
      })
    })
  })

  // Toast
  const toast = document.getElementById("toast")
  const toastTitle = document.getElementById("toast-title")
  const toastDescription = document.getElementById("toast-description")
  const toastClose = document.getElementById("toast-close")

  function showToast(title, description, duration = 3000) {
    console.log("Showing toast:", title, description)
    toastTitle.textContent = title
    toastDescription.textContent = description
    toast.classList.remove("hidden")

    if (duration > 0) {
      setTimeout(() => {
        hideToast()
      }, duration)
    }
  }

  function hideToast() {
    toast.classList.add("hidden")
  }

  if (toastClose) {
    toastClose.addEventListener("click", hideToast)
  }

  // Refresh button
  const refreshBtn = document.getElementById("refresh-btn")

  if (refreshBtn) {
    refreshBtn.addEventListener("click", function () {
      console.log("Refresh button clicked")
      this.classList.add("animate-spin")

      setTimeout(() => {
        this.classList.remove("animate-spin")

        // Update random data
        const stepsValue = document.querySelector(".card:nth-child(1) .metric-value")
        if (stepsValue) {
          const newSteps = Math.floor(Math.random() * 2000) + 3000
          stepsValue.textContent = newSteps.toLocaleString()

          const stepsProgress = document.querySelector(".card:nth-child(1) .progress-bar")
          if (stepsProgress) {
            const stepsPercentage = (newSteps / 5000) * 100
            stepsProgress.style.width = `${stepsPercentage}%`
          }
        }

        const timeValue = document.querySelector(".card:nth-child(2) .metric-value")
        if (timeValue) {
          const newTime = Math.floor(Math.random() * 30) + 30
          timeValue.innerHTML = `${newTime} <span class="unit">min</span>`

          const timeProgress = document.querySelector(".card:nth-child(2) .progress-bar")
          if (timeProgress) {
            const timePercentage = (newTime / 60) * 100
            timeProgress.style.width = `${timePercentage}%`
          }
        }

        const stabilityValue = document.querySelector(".card:nth-child(3) .metric-value")
        if (stabilityValue) {
          const newStability = Math.floor(Math.random() * 20) + 75
          stabilityValue.innerHTML = `${newStability}<span class="unit">%</span>`

          const stabilityProgress = document.querySelector(".card:nth-child(3) .progress-bar")
          if (stabilityProgress) {
            stabilityProgress.style.width = `${newStability}%`
          }
        }

        // Show toast
        showToast("Data Refreshed", "Your walking data has been updated")
      }, 1000)
    })
  }

  // Upload functionality
  const uploadBtn = document.getElementById("upload-btn")
  const uploadView = document.getElementById("upload-view")

  if (uploadBtn && uploadView) {
    uploadBtn.addEventListener("click", () => {
      console.log("Upload button clicked")
      // Switch to upload view
      views.forEach((view) => view.classList.remove("active-view"))
      uploadView.classList.add("active-view")

      // Update nav
      navItems.forEach((nav) => nav.classList.remove("active"))
      const uploadNavItem = document.querySelector('[data-view="upload-view"]')
      if (uploadNavItem) {
        uploadNavItem.classList.add("active")
      }
    })
  }

  const uploadArea = document.getElementById("upload-area")
  const videoInput = document.getElementById("video-upload-input")
  const browseBtn = document.getElementById("browse-btn")

  if (uploadArea) {
    uploadArea.addEventListener("dragover", function (e) {
      e.preventDefault()
      this.style.borderColor = "var(--primary-color)"
      this.style.backgroundColor = "rgba(59, 130, 246, 0.05)"
    })

    uploadArea.addEventListener("dragleave", function () {
      this.style.borderColor = "var(--gray-300)"
      this.style.backgroundColor = ""
    })

    uploadArea.addEventListener("drop", function (e) {
      e.preventDefault()
      this.style.borderColor = "var(--gray-300)"
      this.style.backgroundColor = ""

      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("video/")) {
        handleVideoUpload(file)
      } else {
        showToast("Invalid File", "Please upload a video file", 3000)
      }
    })
  }

  if (browseBtn && videoInput) {
    browseBtn.addEventListener("click", () => {
      console.log("Browse button clicked")
      videoInput.click()
    })

    videoInput.addEventListener("change", function () {
      if (this.files.length > 0) {
        handleVideoUpload(this.files[0])
      }
    })
  }

  function handleVideoUpload(file) {
    console.log("Handling video upload:", file.name)
    // Create upload progress UI
    if (!uploadArea) return

    uploadArea.innerHTML = `
            <div class="upload-progress">
                <h3>Uploading Video...</h3>
                <div class="progress-container">
                    <div class="progress-bar" style="width: 0%"></div>
                </div>
                <p class="upload-file-name">${file.name}</p>
            </div>
        `

    // Simulate upload progress
    let progress = 0
    const progressBar = uploadArea.querySelector(".progress-bar")

    const interval = setInterval(() => {
      progress += 5
      if (progressBar) {
        progressBar.style.width = `${progress}%`
      }

      if (progress >= 100) {
        clearInterval(interval)

        // Simulate analysis
        setTimeout(() => {
          uploadArea.innerHTML = `
                        <div class="upload-success">
                            <div class="upload-icon success">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <h3>Analysis Complete</h3>
                            <p>Your walking video has been analyzed successfully</p>
                            <button class="primary-button">View Results</button>
                        </div>
                    `

          // Add event listener to the new button
          const viewResultsBtn = uploadArea.querySelector(".primary-button")
          if (viewResultsBtn) {
            viewResultsBtn.addEventListener("click", () => {
              console.log("View Results button clicked")
              showToast("Results", "Viewing analysis results")
            })
          }

          showToast("Analysis Complete", "Your walking video has been analyzed successfully")
        }, 2000)
      }
    }, 100)
  }

  // Initialize charts
  initializeCharts()

  // Settings button functionality
  const settingsBtn = document.querySelector('[data-view="settings-view"]')
  if (settingsBtn) {
    settingsBtn.addEventListener("click", function () {
      console.log("Settings button clicked")
      // Show settings view
      views.forEach((view) => view.classList.remove("active-view"))
      const settingsView = document.getElementById("settings-view")
      if (settingsView) {
        settingsView.classList.add("active-view")
      }

      // Update nav
      navItems.forEach((nav) => nav.classList.remove("active"))
      this.classList.add("active")

      // Show toast
      showToast("Settings", "Customize your app preferences and account settings")
    })
  }

  // Help button functionality
  const helpBtn = document.getElementById("help-btn")
  const helpModal = document.getElementById("help-modal")
  const modalClose = document.querySelector(".modal-close")
  const modalOverlay = document.querySelector(".modal-overlay")

  if (helpBtn && helpModal) {
    helpBtn.addEventListener("click", () => {
      console.log("Help button clicked")
      helpModal.classList.remove("hidden")
      document.body.style.overflow = "hidden" // Prevent scrolling when modal is open

      // Show toast
      showToast("Help Center", "Find answers to common questions and learn how to use the app")
    })

    // Close modal when clicking the close button
    if (modalClose) {
      modalClose.addEventListener("click", () => {
        helpModal.classList.add("hidden")
        document.body.style.overflow = "" // Re-enable scrolling
      })
    }

    // Close modal when clicking the overlay
    if (modalOverlay) {
      modalOverlay.addEventListener("click", () => {
        helpModal.classList.add("hidden")
        document.body.style.overflow = "" // Re-enable scrolling
      })
    }
  }

  // FAQ toggle functionality
  const faqItems = document.querySelectorAll(".faq-item")
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    if (question) {
      question.addEventListener("click", () => {
        console.log("FAQ question clicked")
        item.classList.toggle("active")
      })
    }
  })

  // Add event listeners to all buttons
  document.querySelectorAll("button").forEach((button) => {
    if (!button.hasAttribute("data-listener-attached")) {
      button.setAttribute("data-listener-attached", "true")
      button.addEventListener("click", function (e) {
        console.log("Button clicked:", this.textContent.trim() || this.className)

        // If the button doesn't have a specific handler already, show a toast
        if (
          !this.closest(".nav-item") &&
          !this.closest(".tab") &&
          !this.id === "refresh-btn" &&
          !this.id === "upload-btn" &&
          !this.id === "browse-btn" &&
          !this.id === "help-btn" &&
          !this.classList.contains("modal-close") &&
          !this.classList.contains("faq-toggle")
        ) {
          showToast("Button Clicked", `The ${this.textContent.trim() || "button"} was clicked`)
        }
      })
    }
  })

  function initializeCharts() {
    if (typeof Chart === "undefined") {
      console.error("Chart.js is not loaded")
      return
    }

    if (document.getElementById("steps-chart")) {
      try {
        const stepsCtx = document.getElementById("steps-chart").getContext("2d")
        new Chart(stepsCtx, {
          type: "bar",
          data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [
              {
                label: "Steps",
                data: [3200, 4500, 3800, 5200, 3542, 2800, 3100],
                backgroundColor: "#3b82f6",
                borderRadius: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        })
        console.log("Steps chart initialized")
      } catch (error) {
        console.error("Error initializing steps chart:", error)
      }
    }

    if (document.getElementById("gait-chart")) {
      try {
        const gaitCtx = document.getElementById("gait-chart").getContext("2d")
        new Chart(gaitCtx, {
          type: "line",
          data: {
            labels: ["0s", "0.5s", "1.0s", "1.5s", "2.0s", "2.5s", "3.0s", "3.5s", "4.0s", "4.5s", "5.0s"],
            datasets: [
              {
                label: "Stability",
                data: [75, 82, 65, 88, 72, 90, 78, 85, 68, 80, 85],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                tension: 0.3,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: false,
                min: 50,
                max: 100,
              },
            },
          },
        })
        console.log("Gait chart initialized")
      } catch (error) {
        console.error("Error initializing gait chart:", error)
      }
    }

    if (document.getElementById("risk-trend-chart")) {
      try {
        const riskTrendCtx = document.getElementById("risk-trend-chart").getContext("2d")
        new Chart(riskTrendCtx, {
          type: "line",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Fall Risk",
                data: [35, 32, 30, 28, 25, 22],
                borderColor: "#f59e0b",
                backgroundColor: "rgba(245, 158, 11, 0.1)",
                tension: 0.3,
                fill: true,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
          },
        })
        console.log("Risk trend chart initialized")
      } catch (error) {
        console.error("Error initializing risk trend chart:", error)
      }
    }
  }

  console.log("All event listeners attached")
})

// Add dark mode styles
const style = document.createElement("style")
style.textContent = `
  body.dark-mode {
    background-color: #1f2937;
    color: #f9fafb;
  }
  
  body.dark-mode .app-header,
  body.dark-mode .bottom-nav,
  body.dark-mode .card,
  body.dark-mode .modal-container,
  body.dark-mode .modal-header {
    background-color: #111827;
    border-color: #374151;
  }
  
  body.dark-mode .card-header,
  body.dark-mode .modal-header {
    border-color: #374151;
  }
  
  body.dark-mode .app-title h1,
  body.dark-mode .modal-header h2 {
    color: #60a5fa;
  }
  
  body.dark-mode .app-title p,
  body.dark-mode .section-header h2 {
    color: #f9fafb;
  }
  
  body.dark-mode .icon-button,
  body.dark-mode .nav-item {
    color: #d1d5db;
  }
  
  body.dark-mode .nav-item.active {
    color: #60a5fa;
  }
  
  body.dark-mode .activity-item,
  body.dark-mode .risk-factor-item,
  body.dark-mode .recommendation-item,
  body.dark-mode .settings-item,
  body.dark-mode .help-item,
  body.dark-mode .faq-question {
    background-color: #374151;
  }
  
  body.dark-mode .settings-item,
  body.dark-mode .help-section h3 {
    border-color: #374151;
  }
  
  body.dark-mode .settings-info p,
  body.dark-mode .risk-factor-description,
  body.dark-mode .recommendation-content p,
  body.dark-mode .help-content p,
  body.dark-mode .faq-answer p {
    color: #9ca3af;
  }
  
  body.dark-mode .settings-select {
    background-color: #374151;
    color: #f9fafb;
    border-color: #4b5563;
  }
  
  body.dark-mode .outline-button {
    color: #d1d5db;
    border-color: #4b5563;
  }
  
  body.dark-mode .outline-button:hover {
    background-color: #374151;
  }
  
  body.dark-mode .faq-item {
    border-color: #374151;
  }
`
document.head.appendChild(style)

// Add debugging helper to check if JavaScript is loaded
console.log("WalkSafe JavaScript file loaded successfully")

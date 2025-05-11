import { Chart } from "@/components/ui/chart"
;(() => {
  // Create debug overlay
  const debugOverlay = document.createElement("div")
  debugOverlay.style.position = "fixed"
  debugOverlay.style.bottom = "10px"
  debugOverlay.style.right = "10px"
  debugOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)"
  debugOverlay.style.color = "white"
  debugOverlay.style.padding = "10px"
  debugOverlay.style.borderRadius = "5px"
  debugOverlay.style.zIndex = "9999"
  debugOverlay.style.fontSize = "12px"
  debugOverlay.style.maxWidth = "300px"
  debugOverlay.style.maxHeight = "200px"
  debugOverlay.style.overflow = "auto"
  debugOverlay.style.fontFamily = "monospace"
  debugOverlay.innerHTML = '<h3 style="margin-top: 0;">Debug Info</h3><div id="debug-content"></div>'

  // Add toggle button
  const toggleButton = document.createElement("button")
  toggleButton.textContent = "Debug"
  toggleButton.style.position = "fixed"
  toggleButton.style.bottom = "10px"
  toggleButton.style.right = "10px"
  toggleButton.style.zIndex = "10000"
  toggleButton.style.padding = "5px 10px"
  toggleButton.style.backgroundColor = "#3b82f6"
  toggleButton.style.color = "white"
  toggleButton.style.border = "none"
  toggleButton.style.borderRadius = "5px"
  toggleButton.style.cursor = "pointer"

  // Add to document
  document.body.appendChild(toggleButton)
  document.body.appendChild(debugOverlay)
  debugOverlay.style.display = "none"

  // Toggle debug overlay
  toggleButton.addEventListener("click", () => {
    if (debugOverlay.style.display === "none") {
      debugOverlay.style.display = "block"
      updateDebugInfo()
    } else {
      debugOverlay.style.display = "none"
    }
  })

  // Update debug info
  function updateDebugInfo() {
    const debugContent = document.getElementById("debug-content")
    if (!debugContent) return

    const info = [
      `<p>Page: ${window.location.pathname}</p>`,
      `<p>Screen: ${window.innerWidth}x${window.innerHeight}</p>`,
      `<p>JavaScript: ${typeof Chart !== "undefined" ? "Chart.js loaded" : "Chart.js NOT loaded"}</p>`,
      `<p>Event Listeners:</p>`,
      `<ul>`,
      `<li>Buttons: ${document.querySelectorAll("button").length}</li>`,
      `<li>Nav Items: ${document.querySelectorAll(".nav-item").length}</li>`,
      `<li>Tabs: ${document.querySelectorAll(".tab").length}</li>`,
      `</ul>`,
      `<p>Active View: ${document.querySelector(".active-view")?.id || "None"}</p>`,
      `<p><a href="/debug.html" style="color: #60a5fa;">Open Debug Page</a></p>`,
    ]

    debugContent.innerHTML = info.join("")
  }

  // Log button clicks
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
      const button = e.target.tagName === "BUTTON" ? e.target : e.target.closest("button")
      console.log("Button clicked:", button.textContent.trim() || button.className)
    }
  })

  console.log("Debug helper loaded")
})()

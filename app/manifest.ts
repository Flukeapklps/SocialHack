import { MetadataRoute } from "next"

export const dynamic = "force-static" // Ensure the route is statically generated
export const revalidate = 60 // You can set the revalidation period if needed (optional)

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WalkSafe - Walking Analysis for Fall Prevention",
    short_name: "WalkSafe",
    description: "Monitor and improve walking patterns to prevent falls",
    start_url: "/",
    display: "standalone",
    background_color: "#f8faff",
    theme_color: "#3b82f6",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}

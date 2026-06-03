import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nakshatr Drone Academy — Master the Skies. Engineer the Future." },
      { name: "description", content: "India's elite university-embedded drone flight school. Professional piloting, high-end aerial cinematography, and advanced drone engineering." },
      { property: "og:title", content: "Nakshatr Drone Academy" },
      { property: "og:description", content: "Futuristic flight training, cinematic storytelling, and advanced drone engineering." },
      { property: "og:image", content: "/dawn_mountain_landscape.webp" }
    ],
  }),
});

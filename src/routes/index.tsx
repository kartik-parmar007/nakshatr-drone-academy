import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nakshatr Drone Academy — Master the Skies. Engineer the Future." },
      {
        name: "description",
        content:
          "India's elite university-embedded drone flight school. Professional piloting, high-end aerial cinematography, and advanced drone engineering.",
      },
      {
        name: "keywords",
        content:
          "drone academy, uav engineering, dgca remote pilot license, drone training india, drone school gujarat, mkbu drone course, aerial cinematography, drone building",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Nakshatr Drone Academy" },
      {
        property: "og:description",
        content:
          "Futuristic flight training, cinematic storytelling, and advanced drone engineering.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nakshatr.tech/" },
      { property: "og:image", content: "/dawn_mountain_landscape.webp" },
      { property: "og:site_name", content: "Nakshatr Drone Academy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Nakshatr Drone Academy" },
      {
        name: "twitter:description",
        content:
          "Futuristic flight training, cinematic storytelling, and advanced drone engineering.",
      },
      { name: "twitter:image", content: "/dawn_mountain_landscape.webp" },
    ],
    links: [{ rel: "canonical", href: "https://nakshatr.tech/" }],
  }),
});

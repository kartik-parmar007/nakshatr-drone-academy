import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/philosophy")({
  head: () => ({
    meta: [
      { title: "Our Philosophy — Reverse Engineering UAV Pedagogy" },
      { name: "description", content: "We place a drone in a student's hands before a single lecture is delivered. Learn our core reverse-engineering flight instruction pedagogy." },
      { name: "keywords", content: "drone learning pedagogy, learn uav mechanics, reverse engineering drones, drone flight physics" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Our Philosophy — Nakshatr Drone Academy" },
      { property: "og:description", content: "We place a drone in a student's hands before a single lecture is delivered. Learn our core reverse-engineering flight instruction pedagogy." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nakshatr.tech/philosophy" },
      { property: "og:image", content: "/university_drone_mapping.png" },
      { property: "og:site_name", content: "Nakshatr Drone Academy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our Philosophy — Nakshatr Drone Academy" },
      { name: "twitter:description", content: "We place a drone in a student's hands before a single lecture is delivered. Learn our core reverse-engineering flight instruction pedagogy." },
      { name: "twitter:image", content: "/university_drone_mapping.png" }
    ],
    links: [
      { rel: "canonical", href: "https://nakshatr.tech/philosophy" }
    ]
  }),
});

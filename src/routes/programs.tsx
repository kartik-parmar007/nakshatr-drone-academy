import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Drone Training & Certification Programs — Nakshatr Technologies" },
      {
        name: "description",
        content:
          "UGC aligned, DGCA compliant, MKBU certified drone education programs from Hardware Mastery to Industry Ready.",
      },
      {
        name: "keywords",
        content:
          "drone course syllabus, dgca license program, uav robotics certification, aerial photography course, gis mapping drones, university credit course",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Our Drone Education Programs" },
      {
        property: "og:description",
        content:
          "UGC aligned, DGCA compliant, MKBU certified drone education programs from Hardware Mastery to Industry Ready.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nakshatr.tech/programs" },
      { property: "og:image", content: "/dawn_mountain_landscape.webp" },
      { property: "og:site_name", content: "Nakshatr Drone Academy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our Drone Education Programs" },
      {
        name: "twitter:description",
        content:
          "UGC aligned, DGCA compliant, MKBU certified drone education programs from Hardware Mastery to Industry Ready.",
      },
      { name: "twitter:image", content: "/dawn_mountain_landscape.webp" },
    ],
    links: [{ rel: "canonical", href: "https://nakshatr.tech/programs" }],
  }),
});

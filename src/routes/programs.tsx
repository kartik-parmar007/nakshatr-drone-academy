import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/programs")({
  head: () => ({
    meta: [
      { title: "Drone Programs — Nakshatr Technologies" },
      { name: "description", content: "UGC aligned, DGCA compliant, MKBU certified drone education programs from Hardware Mastery to Industry Ready." },
      { property: "og:title", content: "Our Drone Education Programs" },
      { property: "og:image", content: "/dawn_mountain_landscape.webp" }
    ],
  }),
});

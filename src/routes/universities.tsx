import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/universities")({
  head: () => ({
    meta: [
      { title: "University Partnerships — Nakshatr Technologies" },
      { name: "description", content: "Zero investment Centre of Excellence with revenue share. Transform your university with drone technology." },
      { property: "og:title", content: "Transform Your University With Drones" },
      { property: "og:image", content: "/dawn_mountain_landscape.webp" }
    ],
  }),
});

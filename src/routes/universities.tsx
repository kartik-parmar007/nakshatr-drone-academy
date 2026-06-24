import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/universities")({
  head: () => ({
    meta: [
      { title: "University Drone Labs & Partnership — Nakshatr Technologies" },
      {
        name: "description",
        content:
          "Establish a state-of-the-art Drone Centre of Excellence on your campus with zero capital investment. Learn about our UGC credit-mapped, revenue-sharing MoU model.",
      },
      {
        name: "keywords",
        content:
          "university drone lab partnership, drone center of excellence, mkbu drone mou, college drone lab setup, ugc credit drone course",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "University Partnerships — Nakshatr Technologies" },
      {
        property: "og:description",
        content:
          "Establish a state-of-the-art Drone Centre of Excellence on your campus with zero capital investment. Learn about our UGC credit-mapped, revenue-sharing MoU model.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nakshatr.tech/universities" },
      { property: "og:image", content: "/university_drone_lab_hero.png" },
      { property: "og:site_name", content: "Nakshatr Drone Academy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "University Partnerships — Nakshatr Technologies" },
      {
        name: "twitter:description",
        content:
          "Establish a state-of-the-art Drone Centre of Excellence on your campus with zero capital investment. Learn about our UGC credit-mapped, revenue-sharing MoU model.",
      },
      { name: "twitter:image", content: "/university_drone_lab_hero.png" },
    ],
    links: [{ rel: "canonical", href: "https://nakshatr.tech/universities" }],
  }),
});

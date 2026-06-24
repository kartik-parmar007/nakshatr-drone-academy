import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nakshatr Technologies — Bhavnagar, Gujarat" },
      {
        name: "description",
        content:
          "Founded June 2024 in Bhavnagar. DGCA-compliant drone education partnered with MKBU. Meet our licensed remote pilot founders.",
      },
      {
        name: "keywords",
        content:
          "about nakshatr technologies, drone academy founders, bhavnagar drone training, mkbu partners, drone instruction india, remote pilot license",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "About Nakshatr Technologies" },
      {
        property: "og:description",
        content:
          "Founded June 2024 in Bhavnagar. DGCA-compliant drone education partnered with MKBU. Meet our licensed remote pilot founders.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nakshatr.tech/about" },
      { property: "og:image", content: "/drone_academy_founder.png" },
      { property: "og:site_name", content: "Nakshatr Drone Academy" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About Nakshatr Technologies" },
      {
        name: "twitter:description",
        content:
          "Founded June 2024 in Bhavnagar. DGCA-compliant drone education partnered with MKBU. Meet our licensed remote pilot founders.",
      },
      { name: "twitter:image", content: "/drone_academy_founder.png" },
    ],
    links: [{ rel: "canonical", href: "https://nakshatr.tech/about" }],
  }),
});

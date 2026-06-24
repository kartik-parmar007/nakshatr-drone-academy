import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Nakshatr Drone Academy | Get Your Free Drone Roadmap" },
      {
        name: "description",
        content:
          "Fill out the form and get your free Antigravity Drone Pilot Guide 2026. Our team will call you back within 24 hours. Defy gravity — join the skies with Nakshatr Drone Academy.",
      },
      {
        name: "keywords",
        content:
          "contact drone academy, enlist uav program, drone lab partnership inquiry, bhavnagar drone school contact, free drone pilot guide",
      },
      { name: "robots", content: "index, follow" },
      {
        property: "og:title",
        content: "Contact Nakshatr Drone Academy — Defy Gravity. Join the Skies.",
      },
      {
        property: "og:description",
        content:
          "Get your free Drone Roadmap. Select your profile, fill out the form, and our team will reach out within 24 hours.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nakshatr.tech/contact" },
      { property: "og:image", content: "/dawn_mountain_landscape.webp" },
      { property: "og:site_name", content: "Nakshatr Drone Academy" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Contact Nakshatr Drone Academy — Defy Gravity. Join the Skies.",
      },
      {
        name: "twitter:description",
        content:
          "Get your free Drone Roadmap. Select your profile, fill out the form, and our team will reach out within 24 hours.",
      },
      { name: "twitter:image", content: "/dawn_mountain_landscape.webp" },
    ],
    links: [{ rel: "canonical", href: "https://nakshatr.tech/contact" }],
  }),
});

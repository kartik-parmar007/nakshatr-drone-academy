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
      { property: "og:title", content: "Contact Nakshatr Drone Academy — Defy Gravity. Join the Skies." },
      {
        property: "og:description",
        content:
          "Get your free Drone Roadmap. Select your profile, fill out the form, and our team will reach out within 24 hours.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});

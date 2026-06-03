import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nakshatr Technologies — Bhavnagar, Gujarat" },
      { name: "description", content: "Founded June 2024 in Bhavnagar. DGCA-compliant drone education partnered with MKBU. Meet the founder and contact us." },
      { property: "og:title", content: "About Nakshatr Technologies LLP" },
    ],
  }),
});

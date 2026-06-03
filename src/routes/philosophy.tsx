import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/philosophy")({
  head: () => ({
    meta: [
      { title: "Our Philosophy — Nakshatr Technologies" },
      { name: "description", content: "Disassemble to assemble. Learn drone components, types, and the root principle of flight." },
      { property: "og:title", content: "Our Philosophy — Nakshatr" },
    ],
  }),
});

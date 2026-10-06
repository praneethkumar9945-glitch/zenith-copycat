import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/placement")({
  head: () => ({
    meta: [
      { title: "Placements & Career Services — Edusphere" },
      { name: "description", content: "Run campus placements: companies, opportunities, drives, student preparation, recruitment and offers." },
      { property: "og:title", content: "Placements & Career Services — Edusphere" },
      { property: "og:description", content: "One connected placement workflow from company to offer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Outlet,
});

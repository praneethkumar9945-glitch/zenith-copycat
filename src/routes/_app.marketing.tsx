import { createFileRoute } from "@tanstack/react-router";
import MarketingSuite from "@/components/marketing-suite/marketing-suite";

export const Route = createFileRoute("/_app/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing, Admissions & PR — Edusphere" },
      { name: "description", content: "Manage institutional marketing, admissions sales, digital campaigns, content, PR, events, and outreach." },
      { property: "og:title", content: "Marketing, Admissions & PR — Edusphere" },
      { property: "og:description", content: "Manage institutional marketing, admissions sales, digital campaigns, content, PR, events, and outreach." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MarketingSuite,
});

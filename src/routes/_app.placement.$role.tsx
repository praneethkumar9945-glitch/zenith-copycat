import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/placement/app-shell";
import { isRole, ROLES } from "@/components/placement/config";

export const Route = createFileRoute("/_app/placement/$role")({
  beforeLoad: ({ params }) => { if (!isRole(params.role)) throw notFound(); },
  head: ({ params }) => {
    const label = isRole(params.role) ? ROLES[params.role].label : "Portal";
    const title = `${label} — Placements & Career Services`;
    return { meta: [{ title }, { name: "description", content: `${label} workspace in the college Placements & Career Services portal.` }, { property: "og:title", content: title }, { property: "og:description", content: "Connected placement workflow from company to offer." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] };
  },
  component: Layout,
});

function Layout() {
  const { role } = Route.useParams();
  if (!isRole(role)) return null;
  return <AppShell role={role}><Outlet /></AppShell>;
}

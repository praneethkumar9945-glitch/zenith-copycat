// @ts-nocheck
import { useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { icons, Bell, LayoutDashboard, GraduationCap, Repeat } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ROLES, SECTIONS, type RoleId } from "@/components/placement/config";
import { useDB, hydrateStore } from "@/components/placement/store";
import { cn } from "@/lib/utils";

/** Placement workspace shell — renders inside the Edusphere layout with a role header and module tabs. */
export function AppShell({ role, children }: { role: RoleId; children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const db = useDB();
  useEffect(() => { hydrateStore(); }, []);
  const r = ROLES[role];
  const notes = role === "officer" ? db.opportunities.filter((o) => o.status === "Submitted").map((o) => `New opportunity: ${o.role}`)
    : role === "industry" ? db.followups.filter((f) => f.status === "Pending").map((f) => `Follow-up due ${f.date}: ${f.purpose}`)
    : role === "counselor" ? db.mockInterviews.filter((m) => m.status === "Scheduled").map((m) => `Mock interview ${String(m.datetime).replace("T", " ")}`)
    : db.referrals.filter((x) => x.status === "Pending").map(() => "Referral awaiting response");
  const tab = (active: boolean) => cn("inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors", active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground");
  return (
    <div className="space-y-5">
      <div className="rounded-xl border bg-card">
        <div className="flex flex-wrap items-center gap-3 border-b px-4 py-3">
          <div className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"><GraduationCap className="size-4" /></div>
          <div className="min-w-0">
            <div className="text-sm font-semibold">Placements & Career Services</div>
            <div className="text-xs text-muted-foreground">{r.label}</div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="relative grid size-9 place-items-center rounded-md hover:bg-accent" aria-label="Notifications"><Bell className="size-4" />{notes.length > 0 && <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />}</DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72"><DropdownMenuLabel>Notifications</DropdownMenuLabel><DropdownMenuSeparator />{notes.length === 0 ? <div className="p-2 text-sm text-muted-foreground">You're all caught up.</div> : notes.slice(0, 6).map((n, i) => <DropdownMenuItem key={i} className="text-sm">{n}</DropdownMenuItem>)}</DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden items-center gap-2 sm:flex">
              <div className="grid size-8 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{r.person.split(" ").slice(-2).map((x) => x[0]).join("")}</div>
              <div className="text-sm font-medium leading-tight">{r.person}</div>
            </div>
            <Link to="/placement" className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium hover:bg-accent"><Repeat className="size-3.5" />Switch role</Link>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 py-2 scrollbar-thin">
          <Link to="/placement/$role" params={{ role }} className={tab(path === `/placement/${role}` || path === `/placement/${role}/`)}><LayoutDashboard className="size-4" />Dashboard</Link>
          {r.nav.map((s) => { const I = icons[SECTIONS[s].icon as keyof typeof icons] ?? icons.Circle; return (
            <Link key={s} to="/placement/$role/$section" params={{ role, section: s }} className={tab(path.startsWith(`/placement/${role}/${s}`))}><I className="size-4" />{SECTIONS[s].title}</Link>
          ); })}
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Users, Wallet, CalendarDays, Plus } from "lucide-react";
import { PageHeader, Section, StatCard } from "@/components/ui/page";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/hr")({
  component: HR,
});

const staff = [
  { name: "Neha Kapoor", role: "Counselor", dept: "Admissions", salary: "₹68,000", leave: 2 },
  { name: "Rajiv Sharma", role: "Senior Teacher", dept: "Mathematics", salary: "₹92,000", leave: 1 },
  { name: "Priya Singh", role: "HR Manager", dept: "Operations", salary: "₹1,12,000", leave: 0 },
  { name: "Karthik Iyer", role: "Coordinator", dept: "Academics", salary: "₹78,500", leave: 4 },
  { name: "Anjali Mehta", role: "Lab Assistant", dept: "Science", salary: "₹42,000", leave: 1 },
];

const leaves = [
  { who: "Karthik Iyer", type: "Casual", from: "Sep 28", to: "Sep 30", status: "Approved" },
  { who: "Neha Kapoor", type: "Sick", from: "Sep 26", to: "Sep 27", status: "Approved" },
  { who: "Anjali Mehta", type: "Earned", from: "Oct 02", to: "Oct 06", status: "Pending" },
  { who: "Rajiv Sharma", type: "Casual", from: "Oct 10", to: "Oct 10", status: "Pending" },
];

function HR() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="HR dashboard"
        subtitle="148 staff · payroll cycle Sep 2025"
        actions={<Button size="sm" className="gap-1.5"><Plus className="size-4" /> Add staff</Button>}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total staff" value="148" delta="3" icon={Users} />
        <StatCard label="Payroll (Sep)" value="₹1.42 Cr" delta="2.4%" icon={Wallet} accent="success" />
        <StatCard label="On leave today" value="6" icon={CalendarDays} accent="warning" />
        <StatCard label="Open positions" value="4" icon={Briefcase} accent="destructive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Section title="Staff directory" className="lg:col-span-2">
          <div className="overflow-x-auto -m-5">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 text-left font-medium">Name</th>
                  <th className="px-3 py-3 text-left font-medium">Role</th>
                  <th className="px-3 py-3 text-left font-medium">Dept</th>
                  <th className="px-3 py-3 text-right font-medium">Salary</th>
                  <th className="px-5 py-3 text-right font-medium">Leaves</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s) => (
                  <tr key={s.name} className="border-t border-border hover:bg-secondary/40">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-full bg-gradient-to-br from-primary/80 to-chart-5 grid place-items-center text-primary-foreground text-[11px] font-semibold">
                          {s.name.split(" ").map((p) => p[0]).join("")}
                        </div>
                        <span className="font-medium">{s.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-muted-foreground">{s.role}</td>
                    <td className="px-3 py-3 text-muted-foreground">{s.dept}</td>
                    <td className="px-3 py-3 text-right font-semibold tabular-nums">{s.salary}</td>
                    <td className="px-5 py-3 text-right text-muted-foreground tabular-nums">{s.leave}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Leave requests">
          <ul className="space-y-3">
            {leaves.map((l, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div className="size-9 rounded-full bg-secondary grid place-items-center text-xs font-semibold shrink-0">
                  {l.who.split(" ").map((p) => p[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{l.who}</div>
                  <div className="text-[11px] text-muted-foreground">{l.type} · {l.from} → {l.to}</div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${l.status === "Approved" ? "bg-success/10 text-success" : "bg-warning/15 text-warning-foreground"}`}>
                  {l.status}
                </span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}

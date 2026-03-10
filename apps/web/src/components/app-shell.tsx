import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/app/dashboard", label: "Dashboard" },
  { href: "/app/content-jobs", label: "Content Jobs" },
  { href: "/app/prompts", label: "Prompts" },
  { href: "/app/policies", label: "Policies" },
  { href: "/app/governance", label: "Governance" },
  { href: "/app/admin", label: "Admin" },
];

export function AppShell({ children, userEmail }: { children: ReactNode; userEmail?: string }) {
  return (
    <div className="app-layout">
      <aside className="left-nav">
        <div className="brand">Venterra AI Content Suite</div>
        <div className="brand-sub">Internal Workspace</div>
        <nav>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-item">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="main-area">
        <header className="top-header">
          <div className="header-title">Application Shell</div>
          <div className="header-user">{userEmail ?? "Authenticated User"}</div>
        </header>
        <section className="content-area">{children}</section>
      </main>
    </div>
  );
}

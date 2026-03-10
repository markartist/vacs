"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import { logout } from "../lib/api";

const navItems = [
  { href: "/app/dashboard", label: "Dashboard", description: "Operational summary and status indicators." },
  {
    href: "/app/blog-workflow",
    label: "Blog Workflow",
    description: "Methodology intake and structure preparation for long-form content.",
  },
  { href: "/app/content-jobs", label: "Content Jobs", description: "Queued, running, and reviewed generation jobs." },
  { href: "/app/prompts", label: "Prompts", description: "Prompt assets and controlled versions." },
  { href: "/app/policies", label: "Policies", description: "SEO and brand policy logic rules." },
  { href: "/app/governance", label: "Governance", description: "Decision records and review workflows." },
  { href: "/app/admin", label: "Admin", description: "Platform controls, environments, and access." },
];

export function AppShell({ children, userEmail }: { children: ReactNode; userEmail?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const currentModule = useMemo(
    () => navItems.find((item) => pathname.startsWith(item.href)) ?? navItems[0],
    [pathname]
  );

  async function onLogout() {
    setIsLoggingOut(true);
    try {
      await logout();
      router.push("/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="app-layout">
      <aside className="left-nav">
        <div className="brand-wrap">
          <div className="brand-mark" aria-hidden="true">
            VACS
          </div>
          <div className="brand-content">
            <div className="brand">Venterra AI Content Suite</div>
            <div className="brand-sub">Internal Workspace</div>
          </div>
        </div>
        <nav className="nav-list">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item${pathname.startsWith(item.href) ? " is-active" : ""}`}
            >
              <span className="nav-item-label">{item.label}</span>
              <span className="nav-item-sub">{item.description}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="main-area">
        <header className="top-header">
          <div>
            <div className="header-kicker">Authenticated Environment</div>
            <div className="header-title">{currentModule.label}</div>
          </div>
          <div className="header-actions">
            <div className="header-user">{userEmail ?? "Authenticated User"}</div>
            <button className="ghost-button" type="button" onClick={onLogout} disabled={isLoggingOut}>
              {isLoggingOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </header>
        <section className="content-area">{children}</section>
      </main>
    </div>
  );
}

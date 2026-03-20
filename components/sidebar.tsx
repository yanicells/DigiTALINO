"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Radio,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const navGroups = [
  {
    label: "Overview",
    items: [{ href: "/", label: "Home", icon: LayoutDashboard }],
  },
  {
    label: "e-Services Module",
    items: [
      { href: "/citizen", label: "Citizen Portal", icon: FileText },
      { href: "/staff", label: "Staff Portal", icon: Users },
    ],
  },
  {
    label: "Disaster Risk Module",
    items: [
      { href: "/drrmo", label: "DRRMO Dashboard", icon: Radio },
      { href: "/drrmo/report", label: "Post-Disaster Report", icon: ClipboardList },
    ],
  },
  {
    label: "Executive",
    items: [{ href: "/mayor", label: "Mayor Dashboard", icon: BarChart3 }],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-border z-40 flex items-center px-4 gap-3">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-text-primary p-1"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">D</span>
          </div>
          <span className="font-semibold text-sm text-text-primary">
            DigiTALINO
          </span>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen z-50 bg-white border-r border-border flex flex-col transition-all duration-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${collapsed ? "md:w-16" : "md:w-60"} w-60
        `}
      >
        {/* Logo area */}
        <div className="h-14 md:h-16 flex items-center px-4 border-b border-border gap-2">
          {!collapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded bg-primary flex items-center justify-center shrink-0">
                <span className="text-white text-sm font-bold">D</span>
              </div>
              <span className="font-semibold text-sm text-text-primary truncate">
                DigiTALINO
              </span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center mx-auto">
              <span className="text-white text-sm font-bold">D</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              {!collapsed && (
                <div className="px-4 mb-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                  {group.label}
                </div>
              )}
              {group.items.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname === item.href || pathname.startsWith(item.href + "/");
                // For /drrmo, don't match /drrmo/report
                const isExactActive =
                  item.href === "/drrmo" ? pathname === "/drrmo" : isActive;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 mx-2 px-3 py-2 rounded text-sm transition-colors ${
                      isExactActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-text-secondary hover:bg-surface hover:text-text-primary"
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon size={18} className="shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Collapse button (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex h-10 items-center justify-center border-t border-border text-text-muted hover:text-text-primary transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>
    </>
  );
}

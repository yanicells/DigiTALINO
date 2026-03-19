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
} from "lucide-react";
import { useState } from "react";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/", label: "Home", icon: LayoutDashboard },
    ],
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
    ],
  },
  {
    label: "Executive",
    items: [
      { href: "/mayor", label: "Mayor Dashboard", icon: BarChart3 },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-60"
      } flex-shrink-0 h-screen sticky top-0 bg-white border-r border-border flex flex-col transition-all duration-200`}
    >
      <div className="h-16 flex items-center px-4 border-b border-border gap-2">
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center flex-shrink-0">
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

      <nav className="flex-1 overflow-y-auto py-4">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            {!collapsed && (
              <div className="px-4 mb-1 text-[11px] font-medium uppercase tracking-wider text-text-muted">
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 mx-2 px-3 py-2 rounded text-sm transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-text-secondary hover:bg-surface hover:text-text-primary"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-10 flex items-center justify-center border-t border-border text-text-muted hover:text-text-primary transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}

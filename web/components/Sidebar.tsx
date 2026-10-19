"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Bike, Gauge, GitCompareArrows, Home, Settings2, Sparkles, TrendingUp } from "lucide-react";

const nav = [
  { href: "/", label: "Panoramica", icon: Home, exact: true },
  { href: "/#attivita", label: "Attività", icon: Bike, path: "/activity" },
  { href: "/performance", label: "Performance", icon: TrendingUp },
  { href: "/compare", label: "Confronta", icon: GitCompareArrows },
  { href: "/workouts", label: "Allenamenti", icon: Activity },
  { href: "/coach", label: "Coach", icon: Sparkles },
];

export function Sidebar() {
  const pathname = usePathname();
  const active = (item: (typeof nav)[number]) => item.exact ? pathname === "/" : item.path ? pathname.startsWith(item.path) : pathname.startsWith(item.href.split("#")[0]);

  return (
    <aside className="sidebar">
      <Link className="brand" href="/">
        <div className="brandMark"><Gauge size={20}/></div>
        <div><strong>VeloLab</strong><span>Local Performance Lab</span></div>
      </Link>
      <nav className="navList">
        {nav.map((item) => {
          const Icon = item.icon;
          return <Link className={`navItem ${active(item) ? "isActive" : ""}`} href={item.href} key={item.label}><Icon size={18} strokeWidth={1.8}/><span>{item.label}</span></Link>;
        })}
      </nav>
      <div className="sidebarBottom">
        <Link className={`coachMini ${pathname.startsWith("/coach") ? "isActive" : ""}`} href="/coach"><div className="coachIcon"><Sparkles size={17}/></div><div><b>Coach mode</b><span>FIT + Journal + carico</span></div></Link>
        <Link className={`navItem ${pathname.startsWith("/settings") ? "isActive" : ""}`} href="/settings"><Settings2 size={18}/><span>Impostazioni</span></Link>
      </div>
    </aside>
  );
}

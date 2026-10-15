import Link from "next/link";
import { Activity, Bike, CalendarDays, Gauge, Home, Settings2, Sparkles } from "lucide-react";

const nav = [
  { href: "/", label: "Panoramica", icon: Home },
  { href: "/#attivita", label: "Attività", icon: Bike },
  { href: "/workouts", label: "Allenamenti", icon: Activity },
  { href: "/workouts", label: "Pianifica", icon: CalendarDays },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brandMark"><Gauge size={20} /></div>
        <div><strong>VeloLab</strong><span>Mauro Training</span></div>
      </div>
      <nav className="navList">
        {nav.map(({ href, label, icon: Icon }, i) => (
          <Link className={`navItem ${i === 0 ? "isActive" : ""}`} href={href} key={`${label}-${i}`}>
            <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="sidebarBottom">
        <div className="coachMini">
          <div className="coachIcon"><Sparkles size={17} /></div>
          <div><b>Coach mode</b><span>In arrivo</span></div>
        </div>
        <Link className="navItem" href="/"><Settings2 size={18} /><span>Impostazioni</span></Link>
      </div>
    </aside>
  );
}

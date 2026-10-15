import type { LucideIcon } from "lucide-react";

export function MetricCard({ label, value, unit, icon: Icon, hint }: { label: string; value: string; unit?: string; icon: LucideIcon; hint?: string }) {
  return (
    <div className="metricCard">
      <div className="metricTop"><span>{label}</span><div className="metricIcon"><Icon size={17} /></div></div>
      <div className="metricValue">{value}{unit && <small>{unit}</small>}</div>
      {hint && <div className="metricHint">{hint}</div>}
    </div>
  );
}

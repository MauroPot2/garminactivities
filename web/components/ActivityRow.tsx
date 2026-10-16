import Link from "next/link";
import { Bike, ChevronRight, Mountain, Timer, Zap } from "lucide-react";
import type { ActivitySummary } from "@/lib/fit";
import { formatDate, formatDuration, formatNumber } from "@/lib/format";

export function ActivityRow({ activity }: { activity: ActivitySummary }) {
  return (
    <Link className="activityRow" href={`/activity/${encodeURIComponent(activity.file)}`}>
      <div className="activityBadge"><Bike size={20} /></div>
      <div className="activityMain">
        <div className="activityTitle"><strong>Uscita in bici</strong><span>{formatDate(activity.date, true)}</span></div>
        <div className="activityMeta">
          <span><Timer size={14}/>{formatDuration(activity.movingSec)}</span>
          <span><Mountain size={14}/>{formatNumber(activity.ascentM)} m</span>
          <span><Zap size={14}/>{activity.normalizedPower ? `${formatNumber(activity.normalizedPower)} W NP` : `${formatNumber(activity.avgPower)} W`}</span>
        </div>
      </div>
      <div className="activityDistance"><strong>{formatNumber(activity.distanceKm, 1)}</strong><span>km</span></div>
      <ChevronRight className="rowChevron" size={18}/>
    </Link>
  );
}

import type { ActivitySummary } from "@/lib/fit";
import type { RiderSettings } from "@/lib/settings";
import { getFtpForDate } from "@/lib/settings";

export type ActivityLoad = {
  file: string;
  date: Date;
  tss?: number;
  estimated: boolean;
  ftp?: number;
  intensityFactor?: number;
};

export type LoadDay = {
  date: string;
  load: number;
  ctl: number;
  atl: number;
  form: number;
};

function dateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function activityLoad(activity: ActivitySummary, settings: RiderSettings): ActivityLoad {
  if (activity.trainingStress !== undefined && activity.trainingStress >= 0) {
    return { file: activity.file, date: activity.date, tss: activity.trainingStress, estimated: false, ftp: activity.thresholdPower, intensityFactor: activity.intensityFactor };
  }

  const ftp = getFtpForDate(activity.date, settings) ?? activity.thresholdPower;
  const np = activity.normalizedPower;
  if (!ftp || !np || !activity.movingSec) return { file: activity.file, date: activity.date, estimated: true, ftp };
  const intensityFactor = np / ftp;
  const tss = activity.movingSec / 3600 * intensityFactor * intensityFactor * 100;
  return { file: activity.file, date: activity.date, tss, estimated: true, ftp, intensityFactor };
}

export function buildLoadModel(activities: ActivitySummary[], settings: RiderSettings, days = 90) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  start.setDate(start.getDate() - (days - 1));
  const loadByDay = new Map<string, number>();
  const activityLoads = activities.map((activity) => activityLoad(activity, settings));

  activityLoads.forEach((load) => {
    if (load.tss === undefined) return;
    const key = dateKey(load.date);
    loadByDay.set(key, (loadByDay.get(key) ?? 0) + load.tss);
  });

  const result: LoadDay[] = [];
  let ctl = 0;
  let atl = 0;
  const ctlFactor = 1 - Math.exp(-1 / 42);
  const atlFactor = 1 - Math.exp(-1 / 7);

  for (let index = 0; index < days; index += 1) {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    const key = dateKey(date);
    const load = loadByDay.get(key) ?? 0;
    ctl += (load - ctl) * ctlFactor;
    atl += (load - atl) * atlFactor;
    result.push({ date: key, load, ctl, atl, form: ctl - atl });
  }

  const latest = result.at(-1) ?? { date: dateKey(now), load: 0, ctl: 0, atl: 0, form: 0 };
  const last7 = result.slice(-7).reduce((sum, day) => sum + day.load, 0);
  const previous7 = result.slice(-14, -7).reduce((sum, day) => sum + day.load, 0);
  const ramp = previous7 > 0 ? (last7 - previous7) / previous7 * 100 : last7 > 0 ? 100 : 0;

  return { days: result, latest, last7, previous7, ramp, activityLoads };
}

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

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function activityLoad(activity: ActivitySummary, settings: RiderSettings): ActivityLoad {
  if (activity.trainingStress !== undefined && activity.trainingStress >= 0) {
    return { file: activity.file, date: activity.date, tss: activity.trainingStress, estimated: false, ftp: activity.thresholdPower, intensityFactor: activity.intensityFactor };
  }

  const ftp = getFtpForDate(activity.date, settings) ?? activity.thresholdPower;
  const np = activity.normalizedPower;
  const activeSec = activity.timerSec !== undefined && activity.timerSec > 0
    ? activity.timerSec
    : activity.movingSec;
  if (!ftp || !np || !activeSec) return { file: activity.file, date: activity.date, estimated: true, ftp };
  const intensityFactor = np / ftp;
  const tss = activeSec / 3600 * intensityFactor * intensityFactor * 100;
  return { file: activity.file, date: activity.date, tss, estimated: true, ftp, intensityFactor };
}

export function buildLoadModel(activities: ActivitySummary[], settings: RiderSettings, days = 90) {
  const now = new Date();
  const today = startOfDay(now);
  const displayStart = new Date(today);
  displayStart.setDate(displayStart.getDate() - (Math.max(1, days) - 1));

  const loadByDay = new Map<string, number>();
  const activityLoads = activities.map((activity) => activityLoad(activity, settings));

  activityLoads.forEach((load) => {
    if (load.tss === undefined) return;
    const key = dateKey(load.date);
    loadByDay.set(key, (loadByDay.get(key) ?? 0) + load.tss);
  });

  const earliestLoadDate = activityLoads.reduce<Date | undefined>((earliest, load) => {
    if (load.tss === undefined || Number.isNaN(load.date.getTime())) return earliest;
    const day = startOfDay(load.date);
    return !earliest || day < earliest ? day : earliest;
  }, undefined);
  const modelStart = earliestLoadDate && earliestLoadDate < displayStart ? earliestLoadDate : displayStart;

  const result: LoadDay[] = [];
  let ctl = 0;
  let atl = 0;
  const ctlFactor = 1 - Math.exp(-1 / 42);
  const atlFactor = 1 - Math.exp(-1 / 7);

  for (const date = new Date(modelStart); date <= today; date.setDate(date.getDate() + 1)) {
    const key = dateKey(date);
    const load = loadByDay.get(key) ?? 0;
    ctl += (load - ctl) * ctlFactor;
    atl += (load - atl) * atlFactor;

    if (date >= displayStart) {
      result.push({ date: key, load, ctl, atl, form: ctl - atl });
    }
  }

  const latest = result.at(-1) ?? { date: dateKey(now), load: 0, ctl: 0, atl: 0, form: 0 };
  const last7 = result.slice(-7).reduce((sum, day) => sum + day.load, 0);
  const previous7 = result.slice(-14, -7).reduce((sum, day) => sum + day.load, 0);
  const ramp = previous7 > 0 ? (last7 - previous7) / previous7 * 100 : last7 > 0 ? 100 : 0;

  return { days: result, latest, last7, previous7, ramp, activityLoads };
}

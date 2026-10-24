import { getActivities, getActivity, type ActivityDetail, type ActivitySummary } from "@/lib/fit";
import { readSettings } from "@/lib/settings";

export type RiderDimensionKey = "sprint" | "anaerobic" | "puncheur" | "threshold" | "climbing" | "endurance";

export type RiderDimension = {
  key: RiderDimensionKey;
  label: string;
  score: number;
  evidence: string;
};

export type CurveBest = {
  seconds: number;
  label: string;
  watts?: number;
  wkg?: number;
  file?: string;
  date?: Date;
};

export type RiderSnapshot = {
  label: string;
  activityCount: number;
  poweredActivityCount: number;
  curve: CurveBest[];
  dimensions: RiderDimension[];
  archetype: string;
};

export type RiderProfile = {
  firstDate?: Date;
  lastDate?: Date;
  currentWindowDays: number;
  weightKg?: number;
  allTime: RiderSnapshot;
  recent: RiderSnapshot;
  strengths: RiderDimension[];
  limiters: RiderDimension[];
};

const DURATIONS = [
  { seconds: 5, label: "5 s" },
  { seconds: 30, label: "30 s" },
  { seconds: 60, label: "1 min" },
  { seconds: 120, label: "2 min" },
  { seconds: 300, label: "5 min" },
  { seconds: 1200, label: "20 min" },
  { seconds: 3600, label: "60 min" },
] as const;

function clamp(value: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

function scale(value: number | undefined, low: number, high: number, fallback = 50) {
  if (value === undefined || !Number.isFinite(value)) return fallback;
  return clamp((value - low) / (high - low) * 100);
}

function ratio(a?: number, b?: number) {
  return a !== undefined && b !== undefined && b > 0 ? a / b : undefined;
}

function cyclingOnly(activity: ActivitySummary) {
  return activity.sport.toLowerCase().includes("cycling") || activity.sport.toLowerCase().includes("biking");
}

function bestCurve(details: ActivityDetail[], weightKg?: number): CurveBest[] {
  return DURATIONS.map(({ seconds, label }) => {
    let best: CurveBest = { seconds, label };
    for (const activity of details) {
      const point = activity.powerCurve.find((item) => item.seconds === seconds);
      const watts = point?.watts ?? undefined;
      if (watts === undefined || watts <= 0 || (best.watts !== undefined && best.watts >= watts)) continue;
      best = {
        seconds,
        label,
        watts,
        wkg: weightKg ? watts / weightKg : undefined,
        file: activity.file,
        date: activity.date,
      };
    }
    return best;
  });
}

function watts(curve: CurveBest[], seconds: number) {
  return curve.find((point) => point.seconds === seconds)?.watts;
}

function scoreDimensions(curve: CurveBest[], activities: ActivitySummary[], weightKg?: number): RiderDimension[] {
  const p5 = watts(curve, 5);
  const p30 = watts(curve, 30);
  const p60 = watts(curve, 60);
  const p120 = watts(curve, 120);
  const p300 = watts(curve, 300);
  const p1200 = watts(curve, 1200);
  const p3600 = watts(curve, 3600);

  const sprintRatio = ratio(p5, p1200);
  const anaerobicRatio = ratio(p30, p1200);
  const oneMinuteRatio = ratio(p60, p1200);
  const twoMinuteRatio = ratio(p120, p1200);
  const fiveMinuteRatio = ratio(p300, p1200);
  const hourRetention = ratio(p3600, p1200);
  const thresholdRetention = ratio(p1200, p5);
  const twentyMinuteWkg = weightKg && p1200 ? p1200 / weightKg : undefined;

  const longRides = activities.filter((activity) => activity.movingSec >= 2 * 3600).length;
  const hillyRides = activities.filter((activity) => activity.ascentM >= 700).length;
  const longRideShare = activities.length ? longRides / activities.length : 0;
  const hillyShare = activities.length ? hillyRides / activities.length : 0;

  const sprint = scale(sprintRatio, 2.2, 4.8);
  const anaerobic = clamp((scale(anaerobicRatio, 1.35, 2.25) * .65) + (scale(oneMinuteRatio, 1.20, 1.85) * .35));
  const puncheur = clamp((scale(twoMinuteRatio, 1.08, 1.55) * .45) + (scale(fiveMinuteRatio, 1.02, 1.32) * .55));
  const threshold = clamp((scale(thresholdRetention, .20, .43) * .65) + (scale(ratio(p1200, p300), .72, .94) * .35));
  const climbing = twentyMinuteWkg !== undefined
    ? clamp(scale(twentyMinuteWkg, 1.7, 4.2) * .8 + scale(hillyShare, .05, .35) * .2)
    : 50;
  const endurance = clamp((scale(hourRetention, .68, .94) * .75) + (scale(longRideShare, .08, .45) * .25));

  return [
    { key: "sprint", label: "Sprint", score: Math.round(sprint), evidence: sprintRatio ? `5 s / 20 min = ${sprintRatio.toFixed(2)}×` : "Curva breve insufficiente" },
    { key: "anaerobic", label: "Anaerobico", score: Math.round(anaerobic), evidence: anaerobicRatio ? `30 s / 20 min = ${anaerobicRatio.toFixed(2)}×` : "Curva anaerobica insufficiente" },
    { key: "puncheur", label: "Puncheur", score: Math.round(puncheur), evidence: fiveMinuteRatio ? `5 min / 20 min = ${fiveMinuteRatio.toFixed(2)}×` : "Curva 5 min insufficiente" },
    { key: "threshold", label: "Soglia", score: Math.round(threshold), evidence: thresholdRetention ? `20 min conserva ${(thresholdRetention * 100).toFixed(0)}% della potenza 5 s` : "Curva soglia insufficiente" },
    { key: "climbing", label: "Climbing", score: Math.round(climbing), evidence: twentyMinuteWkg ? `${twentyMinuteWkg.toFixed(2)} W/kg sui migliori 20 min` : "Peso non configurato: W/kg non disponibile" },
    { key: "endurance", label: "Endurance", score: Math.round(endurance), evidence: hourRetention ? `60 min / 20 min = ${(hourRetention * 100).toFixed(0)}%` : `${longRides} uscite da almeno 2 h` },
  ];
}

function archetype(dimensions: RiderDimension[], poweredActivityCount: number) {
  if (poweredActivityCount < 8) return "Profilo in ricostruzione";
  const map = new Map(dimensions.map((item) => [item.key, item.score]));
  const s = (key: RiderDimensionKey) => map.get(key) ?? 0;
  if (s("sprint") >= 78 && s("anaerobic") >= 68) return "Sprinter";
  if (s("puncheur") >= 72 && s("anaerobic") >= 60) return "Puncheur";
  if (s("threshold") >= 68 && s("endurance") >= 65 && s("climbing") >= 58) return "Passista-scalatore";
  if (s("threshold") >= 65 && s("endurance") >= 62) return "Passista / rouleur";
  if (s("anaerobic") >= 75 && s("sprint") >= 55) return "All-rounder esplosivo";
  if (s("climbing") >= 72 && s("endurance") >= 62) return "Scalatore resistente";
  return "All-rounder";
}

function snapshot(label: string, activities: ActivitySummary[], details: ActivityDetail[], weightKg?: number): RiderSnapshot {
  const curve = bestCurve(details, weightKg);
  const dimensions = scoreDimensions(curve, activities, weightKg);
  const poweredActivityCount = details.filter((activity) => activity.powerCurve.some((point) => (point.watts ?? 0) > 0)).length;
  return {
    label,
    activityCount: activities.length,
    poweredActivityCount,
    curve,
    dimensions,
    archetype: archetype(dimensions, poweredActivityCount),
  };
}

let cache: { fingerprint: string; profile: RiderProfile } | undefined;

export function buildRiderProfile(currentWindowDays = 120): RiderProfile {
  const settings = readSettings();
  const activities = getActivities(10000).filter(cyclingOnly);
  const lastDate = activities[0]?.date;
  const firstDate = activities.at(-1)?.date;
  const fingerprint = [activities.length, activities[0]?.file, activities.at(-1)?.file, settings.weightKg ?? "", currentWindowDays].join("|");
  if (cache?.fingerprint === fingerprint) return cache.profile;

  const details = activities.flatMap((activity) => {
    try { return [getActivity(activity.file)]; } catch { return []; }
  });

  const anchor = lastDate?.getTime() ?? Date.now();
  const cutoff = anchor - currentWindowDays * 24 * 3600 * 1000;
  const recentActivities = activities.filter((activity) => activity.date.getTime() >= cutoff);
  const recentFiles = new Set(recentActivities.map((activity) => activity.file));
  const recentDetails = details.filter((activity) => recentFiles.has(activity.file));

  const allTime = snapshot("All-time", activities, details, settings.weightKg);
  const recent = snapshot(`Ultimi ${currentWindowDays} giorni`, recentActivities, recentDetails, settings.weightKg);
  const sorted = [...recent.dimensions].sort((a, b) => b.score - a.score);

  const profile: RiderProfile = {
    firstDate,
    lastDate,
    currentWindowDays,
    weightKg: settings.weightKg,
    allTime,
    recent,
    strengths: sorted.slice(0, 2),
    limiters: sorted.slice(-2).reverse(),
  };
  cache = { fingerprint, profile };
  return profile;
}

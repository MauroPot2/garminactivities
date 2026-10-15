import fs from "node:fs";
import path from "node:path";
import { Decoder, Stream, Profile } from "@garmin/fitsdk";

export type ActivityRecord = {
  timestamp?: Date;
  power?: number;
  heartRate?: number;
  cadence?: number;
  altitude?: number;
  speed?: number;
  distance?: number;
  lat?: number;
  lon?: number;
};

export type ActivitySummary = {
  file: string;
  date: Date;
  sport: string;
  subSport?: string;
  distanceKm: number;
  durationSec: number;
  movingSec: number;
  ascentM: number;
  avgPower?: number;
  normalizedPower?: number;
  maxPower?: number;
  avgHr?: number;
  maxHr?: number;
  avgCadence?: number;
  calories?: number;
  workKj?: number;
  trainingStress?: number;
  intensityFactor?: number;
  device?: string;
};

export type ActivityDetail = ActivitySummary & {
  records: ActivityRecord[];
  powerCurve: { label: string; seconds: number; watts: number | null }[];
};

const repoRoot = path.resolve(process.cwd(), "..");
const EXCLUDED = new Set([".git", "web", "node_modules"]);

function walkFitFiles(dir: string, depth = 0): string[] {
  if (depth > 3) return [];
  let entries: fs.Dirent[] = [];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries.flatMap((entry) => {
    if (entry.name.startsWith(".") || EXCLUDED.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkFitFiles(full, depth + 1);
    return entry.name.toLowerCase().endsWith(".fit") ? [full] : [];
  });
}

function filenameTimestamp(file: string): number {
  const name = path.basename(file);
  const m = name.match(/(20\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/);
  if (!m) return fs.statSync(file).mtimeMs;
  const [, y, mo, d, h, mi, s] = m;
  return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}`).getTime();
}

export function listActivityFiles(): string[] {
  return walkFitFiles(repoRoot).sort((a, b) => filenameTimestamp(b) - filenameTimestamp(a));
}

function safeNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function toDate(value: unknown, fallback: string): Date {
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  const ts = filenameTimestamp(fallback);
  return new Date(ts);
}

function semicirclesToDegrees(value: unknown): number | undefined {
  const n = safeNumber(value);
  if (n === undefined) return undefined;
  if (Math.abs(n) <= 180) return n;
  return n * (180 / 2147483648);
}

function estimateNormalizedPower(records: ActivityRecord[]): number | undefined {
  const powers = records.map((r) => r.power).filter((p): p is number => typeof p === "number");
  if (powers.length < 30) return undefined;
  const window = 30;
  let running = 0;
  let fourthPowerSum = 0;
  let count = 0;
  for (let i = 0; i < powers.length; i += 1) {
    running += powers[i];
    if (i >= window) running -= powers[i - window];
    if (i >= window - 1) {
      const avg = running / window;
      fourthPowerSum += avg ** 4;
      count += 1;
    }
  }
  return count ? Math.round((fourthPowerSum / count) ** 0.25) : undefined;
}

function bestAveragePower(records: ActivityRecord[], seconds: number): number | null {
  const powers = records.map((r) => r.power ?? 0);
  if (powers.length < seconds || seconds <= 0) return null;
  const prefix = new Float64Array(powers.length + 1);
  for (let i = 0; i < powers.length; i += 1) prefix[i + 1] = prefix[i] + powers[i];
  let best = 0;
  for (let i = seconds; i <= powers.length; i += 1) {
    const avg = (prefix[i] - prefix[i - seconds]) / seconds;
    if (avg > best) best = avg;
  }
  return Math.round(best);
}

function decodeFit(fullPath: string, includeRecords: boolean): ActivityDetail {
  const buffer = fs.readFileSync(fullPath);
  const stream = Stream.fromBuffer(buffer);
  if (!Decoder.isFIT(stream)) throw new Error(`File FIT non valido: ${path.basename(fullPath)}`);

  const decoder = new Decoder(stream);
  const sessions: Record<string, unknown>[] = [];
  const records: ActivityRecord[] = [];
  const devices: Record<string, unknown>[] = [];

  const { errors } = decoder.read({
    mergeHeartRates: true,
    mesgListener: (messageNumber: number, message: Record<string, unknown>) => {
      const name = Profile.types.mesgNum[messageNumber];
      if (name === "session") sessions.push(message);
      if (name === "deviceInfo") devices.push(message);
      if (includeRecords && name === "record") {
        records.push({
          timestamp: message.timestamp instanceof Date ? message.timestamp : undefined,
          power: safeNumber(message.power),
          heartRate: safeNumber(message.heartRate),
          cadence: safeNumber(message.cadence),
          altitude: safeNumber(message.enhancedAltitude) ?? safeNumber(message.altitude),
          speed: safeNumber(message.enhancedSpeed) ?? safeNumber(message.speed),
          distance: safeNumber(message.distance),
          lat: semicirclesToDegrees(message.positionLat),
          lon: semicirclesToDegrees(message.positionLong),
        });
      }
    },
  });

  if (errors.length && !sessions.length) throw new Error(errors.map(String).join(", "));

  const session = sessions.at(-1) ?? {};
  const file = path.relative(repoRoot, fullPath);
  const durationSec = safeNumber(session.totalElapsedTime) ?? safeNumber(session.totalTimerTime) ?? 0;
  const movingSec = safeNumber(session.totalTimerTime) ?? durationSec;
  const distanceM = safeNumber(session.totalDistance) ?? 0;
  const totalWork = safeNumber(session.totalWork);

  const device = devices
    .map((d) => (typeof d.productName === "string" ? d.productName : typeof d.garminProduct === "string" ? d.garminProduct : undefined))
    .filter(Boolean)
    .at(-1);

  const normalizedPower = safeNumber(session.normalizedPower) ?? (includeRecords ? estimateNormalizedPower(records) : undefined);

  const summary: ActivitySummary = {
    file,
    date: toDate(session.startTime ?? session.timestamp, fullPath),
    sport: typeof session.sport === "string" ? session.sport : "cycling",
    subSport: typeof session.subSport === "string" ? session.subSport : undefined,
    distanceKm: distanceM / 1000,
    durationSec,
    movingSec,
    ascentM: safeNumber(session.totalAscent) ?? 0,
    avgPower: safeNumber(session.avgPower),
    normalizedPower,
    maxPower: safeNumber(session.maxPower),
    avgHr: safeNumber(session.avgHeartRate),
    maxHr: safeNumber(session.maxHeartRate),
    avgCadence: safeNumber(session.avgCadence),
    calories: safeNumber(session.totalCalories),
    workKj: totalWork !== undefined ? totalWork / 1000 : undefined,
    trainingStress: safeNumber(session.trainingStressScore),
    intensityFactor: safeNumber(session.intensityFactor),
    device: device as string | undefined,
  };

  return {
    ...summary,
    records,
    powerCurve: includeRecords
      ? [
          ["5s", 5],
          ["30s", 30],
          ["1m", 60],
          ["5m", 300],
          ["10m", 600],
          ["20m", 1200],
          ["60m", 3600],
        ].map(([label, seconds]) => ({ label: String(label), seconds: Number(seconds), watts: bestAveragePower(records, Number(seconds)) }))
      : [],
  };
}

const summaryCache = new Map<string, ActivitySummary>();

export function getActivities(limit = 48): ActivitySummary[] {
  return listActivityFiles()
    .slice(0, limit)
    .map((file) => {
      if (summaryCache.has(file)) return summaryCache.get(file)!;
      try {
        const activity = decodeFit(file, false);
        summaryCache.set(file, activity);
        return activity;
      } catch {
        return null;
      }
    })
    .filter((a): a is ActivitySummary => Boolean(a));
}

export function getActivity(file: string): ActivityDetail {
  const decoded = decodeURIComponent(file);
  const candidate = path.resolve(repoRoot, decoded);
  if (!candidate.startsWith(repoRoot) || !candidate.toLowerCase().endsWith(".fit") || !fs.existsSync(candidate)) {
    throw new Error("Attività non trovata");
  }
  return decodeFit(candidate, true);
}

export function getDashboardStats(activities: ActivitySummary[]) {
  const now = Date.now();
  const week = activities.filter((a) => now - a.date.getTime() <= 7 * 24 * 3600 * 1000);
  const month = activities.filter((a) => now - a.date.getTime() <= 30 * 24 * 3600 * 1000);
  const sum = <K extends keyof ActivitySummary>(items: ActivitySummary[], key: K) =>
    items.reduce((total, item) => total + (typeof item[key] === "number" ? Number(item[key]) : 0), 0);
  return {
    weekDistance: sum(week, "distanceKm"),
    weekDuration: sum(week, "movingSec"),
    weekAscent: sum(week, "ascentM"),
    weekWork: sum(week, "workKj"),
    monthDistance: sum(month, "distanceKm"),
    ridesThisMonth: month.length,
  };
}

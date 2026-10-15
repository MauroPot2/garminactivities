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
  grade?: number;
  temperature?: number;
  respirationRate?: number;
  leftRightBalance?: number;
  leftTorqueEffectiveness?: number;
  rightTorqueEffectiveness?: number;
  leftPedalSmoothness?: number;
  rightPedalSmoothness?: number;
  combinedPedalSmoothness?: number;
  leftPco?: number;
  rightPco?: number;
  leftPowerPhase?: number[];
  rightPowerPhase?: number[];
  leftPowerPhasePeak?: number[];
  rightPowerPhasePeak?: number[];
};

export type SensorInfo = {
  index?: number;
  name?: string;
  descriptor?: string;
  manufacturer?: string;
  product?: string;
  deviceType?: string;
  sourceType?: string;
  serialNumber?: string;
  softwareVersion?: number;
  batteryVoltage?: number;
  batteryStatus?: string;
  sensorPosition?: string;
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
  descentM?: number;
  minAltitude?: number;
  maxAltitude?: number;
  avgSpeed?: number;
  maxSpeed?: number;
  avgPower?: number;
  normalizedPower?: number;
  maxPower?: number;
  avgHr?: number;
  maxHr?: number;
  avgCadence?: number;
  maxCadence?: number;
  calories?: number;
  workKj?: number;
  trainingStress?: number;
  intensityFactor?: number;
  thresholdPower?: number;
  aerobicTrainingEffect?: number;
  anaerobicTrainingEffect?: number;
  exerciseLoad?: number;
  avgTemperature?: number;
  minTemperature?: number;
  maxTemperature?: number;
  avgRespirationRate?: number;
  minRespirationRate?: number;
  maxRespirationRate?: number;
  estimatedSweatLoss?: number;
  fluidConsumed?: number;
  avgLeftRightBalance?: number;
  avgLeftTorqueEffectiveness?: number;
  avgRightTorqueEffectiveness?: number;
  avgLeftPedalSmoothness?: number;
  avgRightPedalSmoothness?: number;
  avgCombinedPedalSmoothness?: number;
  avgLeftPco?: number;
  avgRightPco?: number;
  avgLeftPowerPhase?: number[];
  avgRightPowerPhase?: number[];
  avgLeftPowerPhasePeak?: number[];
  avgRightPowerPhasePeak?: number[];
  timeStanding?: number;
  standCount?: number;
  avgPowerPosition?: number[];
  maxPowerPosition?: number[];
  avgCadencePosition?: number[];
  maxCadencePosition?: number[];
  device?: string;
};

export type ActivityDetail = ActivitySummary & {
  records: ActivityRecord[];
  sensors: SensorInfo[];
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
  const match = name.match(/(20\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/);
  if (!match) return fs.statSync(file).mtimeMs;
  const [, y, mo, d, h, mi, s] = match;
  return new Date(`${y}-${mo}-${d}T${h}:${mi}:${s}`).getTime();
}

export function listActivityFiles(): string[] {
  return walkFitFiles(repoRoot).sort((a, b) => filenameTimestamp(b) - filenameTimestamp(a));
}

function safeNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function safeString(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return undefined;
}

function safeNumberArray(value: unknown): number[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const values = value.filter((item): item is number => typeof item === "number" && Number.isFinite(item));
  return values.length ? values : undefined;
}

function average(values: number[]): number | undefined {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : undefined;
}

function minimum(values: number[]): number | undefined {
  return values.length ? Math.min(...values) : undefined;
}

function maximum(values: number[]): number | undefined {
  return values.length ? Math.max(...values) : undefined;
}

function toDate(value: unknown, fallback: string): Date {
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return new Date(filenameTimestamp(fallback));
}

function semicirclesToDegrees(value: unknown): number | undefined {
  const n = safeNumber(value);
  if (n === undefined) return undefined;
  if (Math.abs(n) <= 180) return n;
  return n * (180 / 2147483648);
}

function leftBalanceFromFit(value: unknown): number | undefined {
  const n = safeNumber(value);
  if (n === undefined) return undefined;
  if (n >= 0 && n <= 100) return n;
  const raw = Math.round(n) & 0xff;
  const percentage = raw & 0x7f;
  if (percentage > 100) return undefined;
  return (raw & 0x80) !== 0 ? 100 - percentage : percentage;
}

function estimateNormalizedPowerFromSamples(powers: number[]): number | undefined {
  if (powers.length < 30) return undefined;
  const window = 30;
  let running = 0;
  let fourthPowerSum = 0;
  let count = 0;
  for (let i = 0; i < powers.length; i += 1) {
    running += powers[i];
    if (i >= window) running -= powers[i - window];
    if (i >= window - 1) {
      const rollingAverage = running / window;
      fourthPowerSum += rollingAverage ** 4;
      count += 1;
    }
  }
  return count ? Math.round((fourthPowerSum / count) ** 0.25) : undefined;
}

function bestAveragePower(records: ActivityRecord[], seconds: number): number | null {
  const powers = records.map((record) => record.power ?? 0);
  if (powers.length < seconds || seconds <= 0) return null;
  const prefix = new Float64Array(powers.length + 1);
  for (let i = 0; i < powers.length; i += 1) prefix[i + 1] = prefix[i] + powers[i];
  let best = 0;
  for (let i = seconds; i <= powers.length; i += 1) best = Math.max(best, (prefix[i] - prefix[i - seconds]) / seconds);
  return Math.round(best);
}

function sensorFromMessage(message: any): SensorInfo {
  return {
    index: safeNumber(message.deviceIndex),
    name: safeString(message.productName) ?? safeString(message.descriptor),
    descriptor: safeString(message.descriptor),
    manufacturer: safeString(message.manufacturer),
    product: safeString(message.garminProduct) ?? safeString(message.product),
    deviceType: safeString(message.deviceType),
    sourceType: safeString(message.sourceType),
    serialNumber: safeString(message.serialNumber),
    softwareVersion: safeNumber(message.softwareVersion),
    batteryVoltage: safeNumber(message.batteryVoltage),
    batteryStatus: safeString(message.batteryStatus),
    sensorPosition: safeString(message.sensorPosition),
  };
}

function uniqueSensors(devices: Record<string, unknown>[]): SensorInfo[] {
  const seen = new Set<string>();
  const result: SensorInfo[] = [];
  devices.map(sensorFromMessage).forEach((sensor) => {
    const key = [sensor.index, sensor.serialNumber, sensor.product, sensor.name, sensor.deviceType].join("|");
    if (seen.has(key)) return;
    seen.add(key);
    result.push(sensor);
  });
  return result;
}

function decodeFit(fullPath: string, includeRecords: boolean): ActivityDetail {
  const buffer = fs.readFileSync(fullPath);
  const stream = Stream.fromBuffer(buffer);
  if (!Decoder.isFIT(stream)) throw new Error(`File FIT non valido: ${path.basename(fullPath)}`);

  const decoder = new Decoder(stream);
  const sessions: Record<string, unknown>[] = [];
  const records: ActivityRecord[] = [];
  const devices: Record<string, unknown>[] = [];
  const powerSamples: number[] = [];
  const positiveCadenceSamples: number[] = [];
  const altitudeSamples: number[] = [];
  const temperatureSamples: number[] = [];
  const respirationSamples: number[] = [];

  const { errors } = decoder.read({
    mergeHeartRates: true,
    mesgListener: (messageNumber: number, message: any) => {
      const name = Profile.types.mesgNum[messageNumber];
      if (name === "session") sessions.push(message as Record<string, unknown>);
      if (name === "deviceInfo") devices.push(message as Record<string, unknown>);
      if (name !== "record") return;

      const power = safeNumber(message.power);
      const cadence = safeNumber(message.cadence);
      const altitude = safeNumber(message.enhancedAltitude) ?? safeNumber(message.altitude);
      const temperature = safeNumber(message.temperature);
      const respirationRate = safeNumber(message.respirationRate);
      if (power !== undefined) powerSamples.push(power);
      if (cadence !== undefined && cadence > 0) positiveCadenceSamples.push(cadence);
      if (altitude !== undefined) altitudeSamples.push(altitude);
      if (temperature !== undefined) temperatureSamples.push(temperature);
      if (respirationRate !== undefined) respirationSamples.push(respirationRate);

      if (includeRecords) {
        records.push({
          timestamp: message.timestamp instanceof Date ? message.timestamp : undefined,
          power,
          heartRate: safeNumber(message.heartRate),
          cadence,
          altitude,
          speed: safeNumber(message.enhancedSpeed) ?? safeNumber(message.speed),
          distance: safeNumber(message.distance),
          lat: semicirclesToDegrees(message.positionLat),
          lon: semicirclesToDegrees(message.positionLong),
          grade: safeNumber(message.grade),
          temperature,
          respirationRate,
          leftRightBalance: leftBalanceFromFit(message.leftRightBalance),
          leftTorqueEffectiveness: safeNumber(message.leftTorqueEffectiveness),
          rightTorqueEffectiveness: safeNumber(message.rightTorqueEffectiveness),
          leftPedalSmoothness: safeNumber(message.leftPedalSmoothness),
          rightPedalSmoothness: safeNumber(message.rightPedalSmoothness),
          combinedPedalSmoothness: safeNumber(message.combinedPedalSmoothness),
          leftPco: safeNumber(message.leftPco),
          rightPco: safeNumber(message.rightPco),
          leftPowerPhase: safeNumberArray(message.leftPowerPhase),
          rightPowerPhase: safeNumberArray(message.rightPowerPhase),
          leftPowerPhasePeak: safeNumberArray(message.leftPowerPhasePeak),
          rightPowerPhasePeak: safeNumberArray(message.rightPowerPhasePeak),
        });
      }
    },
  });

  if (errors.length && !sessions.length) throw new Error(errors.map(String).join(", "));

  const session = sessions.at(-1) ?? {};
  const file = path.relative(repoRoot, fullPath);
  const durationSec = safeNumber(session.totalElapsedTime) ?? safeNumber(session.totalTimerTime) ?? 0;
  const movingSec = safeNumber(session.totalMovingTime) ?? safeNumber(session.totalTimerTime) ?? durationSec;
  const distanceM = safeNumber(session.totalDistance) ?? 0;
  const totalWork = safeNumber(session.totalWork);
  const sensors = uniqueSensors(devices);
  const device = sensors.map((sensor) => sensor.name ?? sensor.product).filter(Boolean).at(-1);
  const normalizedPower = safeNumber(session.normalizedPower) ?? estimateNormalizedPowerFromSamples(powerSamples);

  const summary: ActivitySummary = {
    file,
    date: toDate(session.startTime ?? session.timestamp, fullPath),
    sport: typeof session.sport === "string" ? session.sport : "cycling",
    subSport: typeof session.subSport === "string" ? session.subSport : undefined,
    distanceKm: distanceM / 1000,
    durationSec,
    movingSec,
    ascentM: safeNumber(session.totalAscent) ?? 0,
    descentM: safeNumber(session.totalDescent),
    minAltitude: safeNumber(session.enhancedMinAltitude) ?? safeNumber(session.minAltitude) ?? minimum(altitudeSamples),
    maxAltitude: safeNumber(session.enhancedMaxAltitude) ?? safeNumber(session.maxAltitude) ?? maximum(altitudeSamples),
    avgSpeed: safeNumber(session.enhancedAvgSpeed) ?? safeNumber(session.avgSpeed),
    maxSpeed: safeNumber(session.enhancedMaxSpeed) ?? safeNumber(session.maxSpeed),
    avgPower: safeNumber(session.avgPower),
    normalizedPower,
    maxPower: safeNumber(session.maxPower),
    avgHr: safeNumber(session.avgHeartRate),
    maxHr: safeNumber(session.maxHeartRate),
    avgCadence: average(positiveCadenceSamples) ?? safeNumber(session.avgCadence),
    maxCadence: safeNumber(session.maxCadence),
    calories: safeNumber(session.totalCalories),
    workKj: totalWork !== undefined ? totalWork / 1000 : undefined,
    trainingStress: safeNumber(session.trainingStressScore),
    intensityFactor: safeNumber(session.intensityFactor),
    thresholdPower: safeNumber(session.thresholdPower),
    aerobicTrainingEffect: safeNumber(session.totalTrainingEffect),
    anaerobicTrainingEffect: safeNumber(session.totalAnaerobicTrainingEffect),
    exerciseLoad: safeNumber(session.exerciseLoad) ?? safeNumber(session.trainingLoad),
    avgTemperature: safeNumber(session.avgTemperature) ?? average(temperatureSamples),
    minTemperature: safeNumber(session.minTemperature) ?? minimum(temperatureSamples),
    maxTemperature: safeNumber(session.maxTemperature) ?? maximum(temperatureSamples),
    avgRespirationRate: safeNumber(session.avgRespirationRate) ?? average(respirationSamples),
    minRespirationRate: safeNumber(session.minRespirationRate) ?? minimum(respirationSamples),
    maxRespirationRate: safeNumber(session.maxRespirationRate) ?? maximum(respirationSamples),
    estimatedSweatLoss: safeNumber(session.estimatedSweatLoss),
    fluidConsumed: safeNumber(session.fluidConsumed) ?? safeNumber(session.totalFluid),
    avgLeftRightBalance: leftBalanceFromFit(session.avgLeftRightBalance),
    avgLeftTorqueEffectiveness: safeNumber(session.avgLeftTorqueEffectiveness),
    avgRightTorqueEffectiveness: safeNumber(session.avgRightTorqueEffectiveness),
    avgLeftPedalSmoothness: safeNumber(session.avgLeftPedalSmoothness),
    avgRightPedalSmoothness: safeNumber(session.avgRightPedalSmoothness),
    avgCombinedPedalSmoothness: safeNumber(session.avgCombinedPedalSmoothness),
    avgLeftPco: safeNumber(session.avgLeftPco),
    avgRightPco: safeNumber(session.avgRightPco),
    avgLeftPowerPhase: safeNumberArray(session.avgLeftPowerPhase),
    avgRightPowerPhase: safeNumberArray(session.avgRightPowerPhase),
    avgLeftPowerPhasePeak: safeNumberArray(session.avgLeftPowerPhasePeak),
    avgRightPowerPhasePeak: safeNumberArray(session.avgRightPowerPhasePeak),
    timeStanding: safeNumber(session.timeStanding),
    standCount: safeNumber(session.standCount),
    avgPowerPosition: safeNumberArray(session.avgPowerPosition),
    maxPowerPosition: safeNumberArray(session.maxPowerPosition),
    avgCadencePosition: safeNumberArray(session.avgCadencePosition),
    maxCadencePosition: safeNumberArray(session.maxCadencePosition),
    device,
  };

  const curveDurations: Array<[string, number]> = [
    ["1s", 1], ["5s", 5], ["15s", 15], ["30s", 30], ["1m", 60], ["2m", 120], ["5m", 300], ["10m", 600], ["20m", 1200], ["30m", 1800], ["60m", 3600],
  ];

  return {
    ...summary,
    records,
    sensors,
    powerCurve: includeRecords ? curveDurations.map(([label, seconds]) => ({ label, seconds, watts: bestAveragePower(records, seconds) })) : [],
  };
}

const summaryCache = new Map<string, ActivitySummary>();

function ensureContainedFitPath(candidate: string): string {
  if (!candidate.toLowerCase().endsWith(".fit") || !fs.existsSync(candidate)) throw new Error("Attività non trovata");
  const rootReal = fs.realpathSync(repoRoot);
  const candidateReal = fs.realpathSync(candidate);
  const relative = path.relative(rootReal, candidateReal);
  const escapesRoot = relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative);
  if (escapesRoot) throw new Error("Attività non trovata");
  return candidateReal;
}

export function getActivities(limit = 48): ActivitySummary[] {
  return listActivityFiles()
    .slice(0, limit)
    .map((file) => {
      try {
        const containedFile = ensureContainedFitPath(file);
        const cached = summaryCache.get(containedFile);
        if (cached) return cached;
        const activity = decodeFit(containedFile, false);
        summaryCache.set(containedFile, activity);
        return activity;
      } catch {
        return null;
      }
    })
    .filter((activity): activity is ActivitySummary => Boolean(activity));
}

function resolveContainedFitPath(file: string): string {
  const decoded = decodeURIComponent(file);
  return ensureContainedFitPath(path.resolve(repoRoot, decoded));
}

export function getActivity(file: string): ActivityDetail {
  return decodeFit(resolveContainedFitPath(file), true);
}

export function getDashboardStats(activities: ActivitySummary[]) {
  const now = Date.now();
  const week = activities.filter((activity) => now - activity.date.getTime() <= 7 * 24 * 3600 * 1000);
  const month = activities.filter((activity) => now - activity.date.getTime() <= 30 * 24 * 3600 * 1000);
  const sum = <K extends keyof ActivitySummary>(items: ActivitySummary[], key: K) => items.reduce((total, item) => total + (typeof item[key] === "number" ? Number(item[key]) : 0), 0);
  return {
    weekDistance: sum(week, "distanceKm"),
    weekDuration: sum(week, "movingSec"),
    weekAscent: sum(week, "ascentM"),
    weekWork: sum(week, "workKj"),
    monthDistance: sum(month, "distanceKm"),
    ridesThisMonth: month.length,
  };
}
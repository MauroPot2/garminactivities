import fs from "node:fs";
import path from "node:path";

export type FtpEntry = { date: string; watts: number };
export type RiderSettings = {
  ftpHistory: FtpEntry[];
  weightKg?: number;
  maxHeartRate?: number;
  thresholdHeartRate?: number;
};

const localDir = path.join(process.cwd(), ".velolab");
const settingsPath = path.join(localDir, "settings.json");

const defaults: RiderSettings = { ftpHistory: [] };

function cleanSettings(value: Partial<RiderSettings>): RiderSettings {
  const ftpHistory = Array.isArray(value.ftpHistory)
    ? value.ftpHistory
        .filter((entry): entry is FtpEntry => Boolean(entry && /^\d{4}-\d{2}-\d{2}$/.test(String(entry.date)) && Number.isFinite(Number(entry.watts)) && Number(entry.watts) >= 50 && Number(entry.watts) <= 600))
        .map((entry) => ({ date: entry.date, watts: Math.round(Number(entry.watts)) }))
        .sort((a, b) => a.date.localeCompare(b.date))
    : [];

  const numeric = (input: unknown, min: number, max: number) => {
    const number = Number(input);
    return Number.isFinite(number) && number >= min && number <= max ? number : undefined;
  };

  return {
    ftpHistory,
    weightKg: numeric(value.weightKg, 35, 250),
    maxHeartRate: numeric(value.maxHeartRate, 100, 240),
    thresholdHeartRate: numeric(value.thresholdHeartRate, 90, 230),
  };
}

export function readSettings(): RiderSettings {
  try {
    if (!fs.existsSync(settingsPath)) return defaults;
    return cleanSettings(JSON.parse(fs.readFileSync(settingsPath, "utf8")) as Partial<RiderSettings>);
  } catch {
    return defaults;
  }
}

export function writeSettings(settings: Partial<RiderSettings>): RiderSettings {
  const clean = cleanSettings(settings);
  fs.mkdirSync(localDir, { recursive: true });
  fs.writeFileSync(settingsPath, `${JSON.stringify(clean, null, 2)}\n`, "utf8");
  return clean;
}

export function getFtpForDate(date: Date, settings = readSettings()): number | undefined {
  const iso = date.toISOString().slice(0, 10);
  return settings.ftpHistory.filter((entry) => entry.date <= iso).at(-1)?.watts;
}

export function getCurrentFtp(settings = readSettings()): number | undefined {
  return settings.ftpHistory.at(-1)?.watts;
}

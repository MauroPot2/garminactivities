import fs from "node:fs";
import path from "node:path";

export type RideJournalEntry = {
  file: string;
  rpe?: number;
  carbsG?: number;
  fluidsMl?: number;
  caffeine?: boolean;
  cramps?: boolean;
  crampsNote?: string;
  notes?: string;
  updatedAt: string;
};

type JournalFile = { entries: Record<string, RideJournalEntry> };

const localDir = path.join(process.cwd(), ".velolab");
const journalPath = path.join(localDir, "journal.json");

function readAll(): JournalFile {
  try {
    if (!fs.existsSync(journalPath)) return { entries: {} };
    const parsed = JSON.parse(fs.readFileSync(journalPath, "utf8")) as JournalFile;
    return parsed && parsed.entries ? parsed : { entries: {} };
  } catch {
    return { entries: {} };
  }
}

function cleanNumber(value: unknown, min: number, max: number): number | undefined {
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max ? number : undefined;
}

export function getJournalEntry(file: string): RideJournalEntry | undefined {
  return readAll().entries[file];
}

export function getJournalEntries(): RideJournalEntry[] {
  return Object.values(readAll().entries);
}

export function saveJournalEntry(input: Partial<RideJournalEntry> & { file: string }): RideJournalEntry {
  if (!input.file || input.file.length > 500) throw new Error("Attività non valida");
  const journal = readAll();
  const entry: RideJournalEntry = {
    file: input.file,
    rpe: cleanNumber(input.rpe, 1, 10),
    carbsG: cleanNumber(input.carbsG, 0, 1000),
    fluidsMl: cleanNumber(input.fluidsMl, 0, 10000),
    caffeine: Boolean(input.caffeine),
    cramps: Boolean(input.cramps),
    crampsNote: typeof input.crampsNote === "string" ? input.crampsNote.trim().slice(0, 300) : undefined,
    notes: typeof input.notes === "string" ? input.notes.trim().slice(0, 1500) : undefined,
    updatedAt: new Date().toISOString(),
  };
  fs.mkdirSync(localDir, { recursive: true });
  journal.entries[input.file] = entry;
  fs.writeFileSync(journalPath, `${JSON.stringify(journal, null, 2)}\n`, "utf8");
  return entry;
}

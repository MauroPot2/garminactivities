export function formatDuration(seconds = 0) {
  const total = Math.max(0, Math.round(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return h > 0 ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m ${String(s).padStart(2, "0")}s`;
}

export function formatDate(date: Date, withTime = false) {
  return new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(date);
}

export function formatNumber(value?: number, digits = 0) {
  if (value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("it-IT", { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value);
}

export function compact(value?: number) {
  if (value === undefined) return "—";
  return new Intl.NumberFormat("it-IT", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

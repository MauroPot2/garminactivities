import type { ActivityRecord } from "@/lib/fit";
import { formatNumber } from "@/lib/format";

function downsample(values: number[], maxPoints = 280) {
  if (values.length <= maxPoints) return values;
  const step = values.length / maxPoints;
  return Array.from({ length: maxPoints }, (_, i) => values[Math.floor(i * step)]);
}

export function SeriesChart({ records, field, label, unit, tone = "violet" }: { records: ActivityRecord[]; field: "power" | "heartRate" | "cadence" | "altitude"; label: string; unit: string; tone?: "violet" | "orange" | "pink" | "cyan" }) {
  const raw = records.map((r) => r[field]).filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  const values = downsample(raw);
  const statisticValues = field === "cadence" ? raw.filter((value) => value > 0) : raw;

  if (values.length < 2 || statisticValues.length === 0) {
    return <div className="chartCard"><div className="chartTitle"><span>{label}</span><b>—</b></div><div className="chartEmpty">Dati non disponibili</div></div>;
  }

  const width = 800;
  const height = 170;
  const plotMin = Math.min(...values);
  const plotMax = Math.max(...values);
  const statMin = Math.min(...statisticValues);
  const statMax = Math.max(...statisticValues);
  const avg = statisticValues.reduce((a, b) => a + b, 0) / statisticValues.length;
  const spread = Math.max(1, plotMax - plotMin);
  const points = values.map((v, i) => `${(i / (values.length - 1)) * width},${height - ((v - plotMin) / spread) * (height - 24) - 12}`).join(" ");

  return (
    <div className={`chartCard tone-${tone}`}>
      <div className="chartTitle"><span>{field === "cadence" ? `${label} · pedalando` : label}</span><b>{formatNumber(avg)} <small>{unit}</small></b></div>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="detailChart">
        <defs><linearGradient id={`grad-${field}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="currentColor" stopOpacity=".3"/><stop offset="100%" stopColor="currentColor" stopOpacity="0"/></linearGradient></defs>
        <line x1="0" y1="42" x2={width} y2="42" className="gridLine"/><line x1="0" y1="86" x2={width} y2="86" className="gridLine"/><line x1="0" y1="130" x2={width} y2="130" className="gridLine"/>
        <polygon points={`0,${height} ${points} ${width},${height}`} fill={`url(#grad-${field})`}/>
        <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.2" vectorEffect="non-scaling-stroke"/>
      </svg>
      <div className="chartRange"><span>{field === "cadence" ? "min pedalando " : ""}{formatNumber(statMin)} {unit}</span><span>max {formatNumber(statMax)} {unit}</span></div>
    </div>
  );
}

import Link from "next/link";
import { Activity, ArrowUpRight, BatteryMedium, Gauge, TrendingUp, Zap } from "lucide-react";
import { getActivities } from "@/lib/fit";
import { formatDate, formatNumber } from "@/lib/format";
import { readSettings } from "@/lib/settings";
import { buildLoadModel } from "@/lib/training";

export const dynamic = "force-dynamic";

function LoadChart({ days }: { days: ReturnType<typeof buildLoadModel>["days"] }) {
  const width = 1000;
  const height = 280;
  const pad = 18;
  const recent = days.slice(-56);
  const max = Math.max(20, ...recent.flatMap((day) => [day.load, day.ctl, day.atl]));
  const x = (index: number) => pad + index / Math.max(1, recent.length - 1) * (width - pad * 2);
  const y = (value: number) => height - pad - value / max * (height - pad * 2);
  const ctl = recent.map((day, index) => `${x(index)},${y(day.ctl)}`).join(" ");
  const atl = recent.map((day, index) => `${x(index)},${y(day.atl)}`).join(" ");
  const barWidth = Math.max(2, (width - pad * 2) / recent.length * .55);
  return <div className="loadChartWrap"><svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="loadChart">
    {[.25,.5,.75].map((ratio) => <line key={ratio} x1={pad} x2={width-pad} y1={pad+(height-pad*2)*ratio} y2={pad+(height-pad*2)*ratio} className="gridLine"/>)}
    {recent.map((day,index) => day.load > 0 ? <rect key={day.date} x={x(index)-barWidth/2} y={y(day.load)} width={barWidth} height={height-pad-y(day.load)} rx="3" className="loadBar"/> : null)}
    <polyline points={ctl} fill="none" className="ctlLine" vectorEffect="non-scaling-stroke"/>
    <polyline points={atl} fill="none" className="atlLine" vectorEffect="non-scaling-stroke"/>
  </svg><div className="loadLegend"><span><i className="legendLoad"/>Carico giornaliero</span><span><i className="legendCtl"/>Fitness · CTL 42g</span><span><i className="legendAtl"/>Fatigue · ATL 7g</span></div></div>;
}

export default function PerformancePage() {
  const activities = getActivities(300);
  const settings = readSettings();
  const model = buildLoadModel(activities, settings, 120);
  const loadsByFile = new Map(model.activityLoads.map((load) => [load.file, load]));
  const latestActivities = activities.slice(0, 10);

  return <div className="pageWrap performancePage">
    <header className="topbar"><div><div className="eyebrow">PERFORMANCE</div><h1>Fitness, fatica, <span>forma.</span></h1><p>Modello locale basato sul carico delle tue attività. Quando il FIT non contiene TSS, VeloLab lo stima da durata, NP e FTP valida per quella data.</p></div><Link className="secondaryButton" href="/settings"><Gauge size={16}/>Gestisci FTP</Link></header>

    <section className="performanceMetrics">
      <div className="performanceMetric"><div><TrendingUp/><span>Fitness · CTL</span></div><strong>{formatNumber(model.latest.ctl, 1)}</strong><small>media esponenziale 42 giorni</small></div>
      <div className="performanceMetric"><div><BatteryMedium/><span>Fatigue · ATL</span></div><strong>{formatNumber(model.latest.atl, 1)}</strong><small>media esponenziale 7 giorni</small></div>
      <div className="performanceMetric"><div><Zap/><span>Form · TSB</span></div><strong>{model.latest.form > 0 ? "+" : ""}{formatNumber(model.latest.form, 1)}</strong><small>fitness − fatigue</small></div>
      <div className="performanceMetric"><div><Activity/><span>Carico 7 giorni</span></div><strong>{formatNumber(model.last7, 0)}</strong><small>{model.ramp >= 0 ? "+" : ""}{formatNumber(model.ramp, 0)}% vs 7g precedenti</small></div>
    </section>

    <section className="panel performanceChartPanel"><div className="panelHeader"><div><span className="sectionLabel">TRAINING LOAD</span><h2>Ultime 8 settimane</h2></div><span className="countPill">TSS / stima VeloLab</span></div><LoadChart days={model.days}/></section>

    <section className="panel loadActivityPanel"><div className="panelHeader"><div><span className="sectionLabel">CARICO ATTIVITÀ</span><h2>Come viene costruito il modello</h2></div></div><div className="loadActivityList">
      {latestActivities.map((activity) => { const load = loadsByFile.get(activity.file); return <Link href={`/activity/${encodeURIComponent(activity.file)}`} className="loadActivityRow" key={activity.file}><div><b>{formatDate(activity.date, true)}</b><span>{formatNumber(activity.distanceKm,1)} km · NP {formatNumber(activity.normalizedPower)} W</span></div><div><strong>{load?.tss !== undefined ? formatNumber(load.tss, 1) : "—"}</strong><span>{load?.tss !== undefined ? (load.estimated ? "TSS stimato" : "TSS Garmin") : "FTP/NP mancanti"}</span></div><ArrowUpRight size={16}/></Link>; })}
    </div></section>
  </div>;
}

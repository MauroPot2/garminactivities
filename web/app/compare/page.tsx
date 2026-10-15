import { ArrowLeftRight, Bike, Gauge, HeartPulse, Mountain, Timer, Zap } from "lucide-react";
import { getActivities, getActivity } from "@/lib/fit";
import { formatDate, formatDuration, formatNumber } from "@/lib/format";

export const dynamic = "force-dynamic";

type Params = { a?: string; b?: string };

function delta(a?: number, b?: number, digits = 0, suffix = "") {
  if (a === undefined || b === undefined) return "—";
  const value = a - b;
  return `${value > 0 ? "+" : ""}${formatNumber(value, digits)}${suffix}`;
}

export default async function ComparePage({ searchParams }: { searchParams: Promise<Params> }) {
  const params = await searchParams;
  const activities = getActivities(120);
  const fileA = params.a && activities.some((activity) => activity.file === params.a) ? params.a : activities[0]?.file;
  const fileB = params.b && activities.some((activity) => activity.file === params.b) ? params.b : activities[1]?.file;
  const a = fileA ? getActivity(fileA) : undefined;
  const b = fileB ? getActivity(fileB) : undefined;

  return <div className="pageWrap comparePage">
    <header className="topbar"><div><div className="eyebrow">COMPARE LAB</div><h1>Due uscite, <span>stesso metro.</span></h1><p>Confronta volume, potenza, cardio e power-duration senza perdere il contesto delle singole attività.</p></div></header>

    <form className="panel comparePicker" method="get">
      <label><span>Uscita A</span><select name="a" defaultValue={fileA}>{activities.map((activity) => <option key={activity.file} value={activity.file}>{formatDate(activity.date, true)} · {formatNumber(activity.distanceKm,1)} km</option>)}</select></label>
      <ArrowLeftRight size={20}/>
      <label><span>Uscita B</span><select name="b" defaultValue={fileB}>{activities.map((activity) => <option key={activity.file} value={activity.file}>{formatDate(activity.date, true)} · {formatNumber(activity.distanceKm,1)} km</option>)}</select></label>
      <button className="primaryButton" type="submit">Confronta</button>
    </form>

    {a && b ? <>
      <section className="compareHeroGrid">
        {[a,b].map((activity,index) => <div className={`panel compareHero compare-${index === 0 ? "a" : "b"}`} key={activity.file}><div className="compareLetter">{index === 0 ? "A" : "B"}</div><div><span className="sectionLabel">{formatDate(activity.date,true)}</span><h2>Uscita in bici</h2><p>{activity.device ?? "Garmin"}</p></div><strong>{formatNumber(activity.distanceKm,1)}<small> km</small></strong></div>)}
      </section>

      <section className="panel compareMetrics">
        <div className="compareMetricHeader"><span>Metrica</span><span>A</span><span>B</span><span>Δ A−B</span></div>
        {[
          { label:"Tempo", icon:Timer, a:a.movingSec, b:b.movingSec, render:(v:number)=>formatDuration(v), diff:()=>delta(a.movingSec,b.movingSec,0," s") },
          { label:"Dislivello", icon:Mountain, a:a.ascentM, b:b.ascentM, render:(v:number)=>`${formatNumber(v)} m`, diff:()=>delta(a.ascentM,b.ascentM,0," m") },
          { label:"Potenza media", icon:Zap, a:a.avgPower, b:b.avgPower, render:(v:number)=>`${formatNumber(v)} W`, diff:()=>delta(a.avgPower,b.avgPower,0," W") },
          { label:"Normalized Power", icon:Gauge, a:a.normalizedPower, b:b.normalizedPower, render:(v:number)=>`${formatNumber(v)} W`, diff:()=>delta(a.normalizedPower,b.normalizedPower,0," W") },
          { label:"FC media", icon:HeartPulse, a:a.avgHr, b:b.avgHr, render:(v:number)=>`${formatNumber(v)} bpm`, diff:()=>delta(a.avgHr,b.avgHr,0," bpm") },
          { label:"Cadenza pedalando", icon:Bike, a:a.avgCadence, b:b.avgCadence, render:(v:number)=>`${formatNumber(v)} rpm`, diff:()=>delta(a.avgCadence,b.avgCadence,0," rpm") },
        ].map(({label,icon:Icon,a:av,b:bv,render,diff}) => <div className="compareMetricRow" key={label}><span><Icon size={15}/>{label}</span><b>{av !== undefined ? render(av) : "—"}</b><b>{bv !== undefined ? render(bv) : "—"}</b><strong>{diff()}</strong></div>)}
      </section>

      <section className="panel compareCurve"><div className="panelHeader"><div><span className="sectionLabel">POWER DURATION</span><h2>Curva di potenza testa a testa</h2></div></div><div className="compareCurveGrid">
        {a.powerCurve.map((point,index) => { const other=b.powerCurve[index]; const d=point.watts !== null && other?.watts !== null ? point.watts - other.watts : null; return <div key={point.label}><span>{point.label}</span><div><b className="valueA">{point.watts ?? "—"} W</b><b className="valueB">{other?.watts ?? "—"} W</b></div><small>{d !== null ? `${d>0?"+":""}${d} W` : "—"}</small></div>; })}
      </div></section>
    </> : <div className="emptyState">Servono almeno due attività FIT.</div>}
  </div>;
}

import Link from "next/link";
import { Activity, ArrowUpRight, Bike, Gauge, Mountain, TimerReset, Zap } from "lucide-react";
import { buildRiderProfile, type RiderDimension } from "@/lib/rider-profile";
import { formatDate, formatNumber } from "@/lib/format";
import styles from "./rider-profile.module.css";

export const dynamic = "force-dynamic";

const AXES = ["Sprint", "Anaerobico", "Puncheur", "Soglia", "Climbing", "Endurance"];

function point(angle: number, radius: number, cx = 180, cy = 180) {
  const radians = (angle - 90) * Math.PI / 180;
  return `${cx + Math.cos(radians) * radius},${cy + Math.sin(radians) * radius}`;
}

function polygon(dimensions: RiderDimension[], maxRadius = 126) {
  return dimensions.map((dimension, index) => point(index * 60, maxRadius * dimension.score / 100)).join(" ");
}

function Radar({ recent, allTime }: { recent: RiderDimension[]; allTime: RiderDimension[] }) {
  const rings = [25, 50, 75, 100];
  return <div className={styles.radarWrap}>
    <svg className={styles.radar} viewBox="0 0 360 360" role="img" aria-label="Radar del profilo ciclistico">
      {rings.map((ring) => <polygon key={ring} points={AXES.map((_, index) => point(index * 60, 126 * ring / 100)).join(" ")} className={styles.ring}/>) }
      {AXES.map((label, index) => {
        const axisEnd = point(index * 60, 126);
        const labelPoint = point(index * 60, 153).split(",").map(Number);
        return <g key={label}><line x1="180" y1="180" x2={axisEnd.split(",")[0]} y2={axisEnd.split(",")[1]} className={styles.axis}/><text x={labelPoint[0]} y={labelPoint[1]} textAnchor="middle" dominantBaseline="middle" className={styles.axisLabel}>{label}</text></g>;
      })}
      <polygon points={polygon(allTime)} className={styles.allTimePoly}/>
      <polygon points={polygon(recent)} className={styles.recentPoly}/>
      {recent.map((dimension, index) => { const [x,y] = point(index * 60, 126 * dimension.score / 100).split(",").map(Number); return <circle key={dimension.key} cx={x} cy={y} r="4" className={styles.recentDot}/>; })}
    </svg>
    <div className={styles.legend}><span><i className={styles.legendRecent}/>Forma recente</span><span><i className={styles.legendAll}/>Picco storico</span></div>
  </div>;
}

function ScoreCard({ dimension }: { dimension: RiderDimension }) {
  return <article className={styles.scoreCard}>
    <div><span>{dimension.label}</span><strong>{dimension.score}<small>/100</small></strong></div>
    <div className={styles.scoreTrack}><i style={{ width: `${dimension.score}%` }}/></div>
    <p>{dimension.evidence}</p>
  </article>;
}

export default function RiderProfilePage() {
  const profile = buildRiderProfile(120);
  const recent = profile.recent;
  const allTime = profile.allTime;

  return <div className={`pageWrap ${styles.page}`}>
    <header className="topbar">
      <div>
        <div className="eyebrow">RIDER PROFILE</div>
        <h1>Che ciclista <span>sei davvero.</span></h1>
        <p>Fenotipo calcolato sull'intero archivio FIT. Gli indici descrivono la forma della tua power curve e la tenuta con la durata: non sono percentili rispetto ad altri ciclisti.</p>
      </div>
      <Link className="secondaryButton" href="/settings"><Gauge size={16}/>Peso e FTP</Link>
    </header>

    <section className={styles.heroGrid}>
      <div className={`panel ${styles.identityPanel}`}>
        <span className="sectionLabel">FENOTIPO ATTUALE</span>
        <div className={styles.identity}><Bike size={30}/><div><h2>{recent.archetype}</h2><p>{recent.activityCount} uscite negli ultimi {profile.currentWindowDays} giorni · {recent.poweredActivityCount} con dati di potenza</p></div></div>
        <div className={styles.period}><span>{profile.firstDate ? formatDate(profile.firstDate, true) : "—"}</span><i/><span>{profile.lastDate ? formatDate(profile.lastDate, true) : "—"}</span></div>
        <div className={styles.callouts}>
          <div><Zap size={18}/><span>Punti forti</span><b>{profile.strengths.map((item) => item.label).join(" · ")}</b></div>
          <div><TimerReset size={18}/><span>Da sviluppare</span><b>{profile.limiters.map((item) => item.label).join(" · ")}</b></div>
        </div>
      </div>
      <div className={`panel ${styles.radarPanel}`}><Radar recent={recent.dimensions} allTime={allTime.dimensions}/></div>
    </section>

    <section className={styles.scoreGrid}>{recent.dimensions.map((dimension) => <ScoreCard dimension={dimension} key={dimension.key}/>)}</section>

    <section className={`panel ${styles.curvePanel}`}>
      <div className="panelHeader"><div><span className="sectionLabel">POWER SIGNATURE</span><h2>Picchi storici vs ultimi {profile.currentWindowDays} giorni</h2></div><span className="countPill">{profile.weightKg ? `${formatNumber(profile.weightKg, 1)} kg` : "Configura il peso per W/kg"}</span></div>
      <div className={styles.curveTable}>
        <div className={`${styles.curveRow} ${styles.curveHead}`}><span>Durata</span><span>All-time</span><span>Recente</span><span>W/kg recente</span><span>Data best</span></div>
        {allTime.curve.map((historic, index) => {
          const current = recent.curve[index];
          return <div className={styles.curveRow} key={historic.seconds}>
            <strong>{historic.label}</strong>
            <span>{historic.watts ? `${historic.watts} W` : "—"}</span>
            <span>{current?.watts ? `${current.watts} W` : "—"}</span>
            <span>{current?.wkg ? current.wkg.toFixed(2) : "—"}</span>
            <span>{historic.date ? formatDate(historic.date, true) : "—"}{historic.file ? <Link href={`/activity/${encodeURIComponent(historic.file)}`} aria-label={`Apri attività ${historic.label}`}><ArrowUpRight size={14}/></Link> : null}</span>
          </div>;
        })}
      </div>
    </section>

    <section className={styles.notesGrid}>
      <div className="panel"><div className={styles.noteTitle}><Mountain/><div><span className="sectionLabel">COME LEGGERLO</span><h3>Climbing non significa “quanto ami la salita”</h3></div></div><p>Quando il peso è configurato usa soprattutto i migliori 20 minuti in W/kg, con un piccolo contributo della frequenza di uscite molto mosse. Senza peso, il punteggio viene stimato da soglia e dislivello.</p></div>
      <div className="panel"><div className={styles.noteTitle}><Activity/><div><span className="sectionLabel">ATTENZIONE</span><h3>Il profilo cambia con la forma</h3></div></div><p>La linea storica mostra ciò che hai dimostrato almeno una volta; quella recente usa una finestra ancorata all'ultima attività nel repo. Così un vecchio picco non viene scambiato per la condizione attuale.</p></div>
    </section>
  </div>;
}

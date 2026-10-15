import type { ActivityDetail } from "@/lib/fit";
import { computePowerAnalytics } from "@/lib/power";
import { formatNumber } from "@/lib/format";
import styles from "./PedalStrokeLab.module.css";

type Pair = [number, number];

function polar(cx: number, cy: number, radius: number, angle: number) {
  const radians = (angle - 90) * Math.PI / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}

function arcSize(pair: Pair) {
  return ((pair[1] - pair[0]) % 360 + 360) % 360;
}

function arcPath(pair: Pair, radius: number) {
  const cx = 120;
  const cy = 120;
  const size = arcSize(pair);
  const endAngle = pair[0] + size;
  const start = polar(cx, cy, radius, pair[0]);
  const end = polar(cx, cy, radius, endAngle);
  const largeArc = size > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function value(number: number | undefined, suffix = "") {
  return number === undefined ? "—" : `${formatNumber(number, 0)}${suffix}`;
}

function phaseText(pair?: Pair, arc?: number) {
  if (!pair) return "—";
  return `${Math.round(pair[0])}° → ${Math.round(pair[1])}° · ${value(arc, "°")}`;
}

export function PedalStrokeLab({ activity, ftpOverride }: { activity: ActivityDetail; ftpOverride?: number }) {
  const analytics = computePowerAnalytics(activity, ftpOverride);
  const available = Boolean(analytics.leftPowerPhase || analytics.rightPowerPhase || analytics.leftPowerPhasePeak || analytics.rightPowerPhasePeak);
  if (!available) return null;

  return <section className={styles.lab}>
    <div className={styles.header}>
      <div><span>PEDAL STROKE LAB</span><h2>Dove produci coppia nel giro di pedale</h2><p>Fase di potenza e fase di picco visualizzate sull'intero ciclo di 360°. I valori arrivano dalle Cycling Dynamics del FIT.</p></div>
      <div className={styles.legend}><span><i className={styles.left}/>Sinistra</span><span><i className={styles.right}/>Destra</span><span><i className={styles.peak}/>Picco</span></div>
    </div>

    <div className={styles.content}>
      <div className={styles.dialWrap}>
        <svg viewBox="0 0 240 240" className={styles.dial} role="img" aria-label="Fasi di potenza nel giro di pedale">
          <circle cx="120" cy="120" r="88" className={styles.baseRing}/>
          <circle cx="120" cy="120" r="67" className={styles.baseRing}/>
          {[0,90,180,270].map((angle) => { const p1=polar(120,120,52,angle); const p2=polar(120,120,101,angle); return <line key={angle} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} className={styles.axis}/>; })}
          <text x="120" y="14" textAnchor="middle" className={styles.angleLabel}>0°</text><text x="226" y="124" textAnchor="middle" className={styles.angleLabel}>90°</text><text x="120" y="236" textAnchor="middle" className={styles.angleLabel}>180°</text><text x="15" y="124" textAnchor="middle" className={styles.angleLabel}>270°</text>
          {analytics.leftPowerPhase && <path d={arcPath(analytics.leftPowerPhase,88)} className={`${styles.phaseArc} ${styles.leftArc}`}/>} 
          {analytics.rightPowerPhase && <path d={arcPath(analytics.rightPowerPhase,67)} className={`${styles.phaseArc} ${styles.rightArc}`}/>} 
          {analytics.leftPowerPhasePeak && <path d={arcPath(analytics.leftPowerPhasePeak,88)} className={`${styles.peakArc} ${styles.leftPeak}`}/>} 
          {analytics.rightPowerPhasePeak && <path d={arcPath(analytics.rightPowerPhasePeak,67)} className={`${styles.peakArc} ${styles.rightPeak}`}/>} 
          <circle cx="120" cy="120" r="37" className={styles.hub}/><text x="120" y="116" textAnchor="middle" className={styles.hubTop}>360°</text><text x="120" y="132" textAnchor="middle" className={styles.hubBottom}>PEDALATA</text>
        </svg>
      </div>

      <div className={styles.metrics}>
        <div className={styles.sideCard}><div className={styles.sideTitle}><i className={styles.left}/>SINISTRA</div><div><span>Power phase</span><b>{phaseText(analytics.leftPowerPhase,analytics.leftPowerPhaseArc)}</b></div><div><span>Centro fase</span><b>{value(analytics.leftPowerPhaseCenter,"°")}</b></div><div><span>Peak phase</span><b>{phaseText(analytics.leftPowerPhasePeak,analytics.leftPowerPhasePeakArc)}</b></div><div><span>Centro picco</span><b>{value(analytics.leftPowerPhasePeakCenter,"°")}</b></div><div><span>PCO</span><b>{analytics.leftPco !== undefined ? `${formatNumber(analytics.leftPco,1)} mm` : "—"}</b></div></div>
        <div className={styles.sideCard}><div className={styles.sideTitle}><i className={styles.right}/>DESTRA</div><div><span>Power phase</span><b>{phaseText(analytics.rightPowerPhase,analytics.rightPowerPhaseArc)}</b></div><div><span>Centro fase</span><b>{value(analytics.rightPowerPhaseCenter,"°")}</b></div><div><span>Peak phase</span><b>{phaseText(analytics.rightPowerPhasePeak,analytics.rightPowerPhasePeakArc)}</b></div><div><span>Centro picco</span><b>{value(analytics.rightPowerPhasePeakCenter,"°")}</b></div><div><span>PCO</span><b>{analytics.rightPco !== undefined ? `${formatNumber(analytics.rightPco,1)} mm` : "—"}</b></div></div>
      </div>
    </div>
  </section>;
}

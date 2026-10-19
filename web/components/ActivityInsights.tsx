import { Activity, Droplets, Flame, Gauge, HeartPulse, Mountain, Thermometer, Wind } from "lucide-react";
import type { ActivityDetail } from "@/lib/fit";
import { formatNumber } from "@/lib/format";
import styles from "./ActivityInsights.module.css";

function metric(value: number | undefined, digits = 0, suffix = "") {
  if (value === undefined || !Number.isFinite(value)) return "—";
  return `${formatNumber(value, digits)}${suffix}`;
}

export function ActivityInsights({ activity }: { activity: ActivityDetail }) {
  const hasTraining = [activity.aerobicTrainingEffect, activity.anaerobicTrainingEffect, activity.trainingStress, activity.intensityFactor, activity.exerciseLoad].some((value) => value !== undefined);
  const hasEnvironment = [activity.avgTemperature, activity.minTemperature, activity.maxTemperature, activity.avgRespirationRate, activity.minRespirationRate, activity.maxRespirationRate].some((value) => value !== undefined);

  return <section className={styles.insights}>
    <div className={styles.header}><div><span>RIDE METRICS</span><h2>Quello che Garmin ha registrato</h2></div><Activity size={20}/></div>
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.cardHead}><Gauge/><div><span>TRAINING</span><h3>Effetto e carico</h3></div></div>
        {hasTraining ? <div className={styles.metricGrid}>
          <div><span>Aerobico</span><b>{metric(activity.aerobicTrainingEffect,1)}</b></div>
          <div><span>Anaerobico</span><b>{metric(activity.anaerobicTrainingEffect,1)}</b></div>
          <div><span>TSS Garmin</span><b>{metric(activity.trainingStress,1)}</b></div>
          <div><span>Intensity Factor</span><b>{metric(activity.intensityFactor,3)}</b></div>
          <div><span>Exercise load</span><b>{metric(activity.exerciseLoad,0)}</b></div>
        </div> : <div className={styles.empty}>Questi campi non sono presenti nel FIT.</div>}
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}><Mountain/><div><span>PERCORSO</span><h3>Quota e velocità</h3></div></div>
        <div className={styles.metricGrid}>
          <div><span>Quota minima</span><b>{metric(activity.minAltitude,0," m")}</b></div>
          <div><span>Quota massima</span><b>{metric(activity.maxAltitude,0," m")}</b></div>
          <div><span>Discesa totale</span><b>{metric(activity.descentM,0," m")}</b></div>
          <div><span>Velocità max</span><b>{activity.maxSpeed !== undefined ? metric(activity.maxSpeed*3.6,1," km/h") : "—"}</b></div>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}><HeartPulse/><div><span>FISIOLOGIA</span><h3>Respirazione</h3></div></div>
        {hasEnvironment && activity.avgRespirationRate !== undefined ? <div className={styles.metricGrid}>
          <div><span>Media</span><b>{metric(activity.avgRespirationRate,0," brpm")}</b></div>
          <div><span>Minima</span><b>{metric(activity.minRespirationRate,0," brpm")}</b></div>
          <div><span>Massima</span><b>{metric(activity.maxRespirationRate,0," brpm")}</b></div>
        </div> : <div className={styles.empty}><Wind size={16}/>Respirazione non disponibile nel FIT.</div>}
      </div>

      <div className={styles.card}>
        <div className={styles.cardHead}><Thermometer/><div><span>AMBIENTE</span><h3>Temperatura</h3></div></div>
        {hasEnvironment && activity.avgTemperature !== undefined ? <div className={styles.metricGrid}>
          <div><span>Media</span><b>{metric(activity.avgTemperature,0,"°C")}</b></div>
          <div><span>Minima</span><b>{metric(activity.minTemperature,0,"°C")}</b></div>
          <div><span>Massima</span><b>{metric(activity.maxTemperature,0,"°C")}</b></div>
        </div> : <div className={styles.empty}>Temperatura non disponibile.</div>}
      </div>

      <div className={`${styles.card} ${styles.energyCard}`}>
        <div className={styles.cardHead}><Flame/><div><span>ENERGIA & IDRATAZIONE</span><h3>Bilancio registrato</h3></div></div>
        <div className={styles.energyGrid}>
          <div><Flame/><span>Calorie attività</span><b>{metric(activity.calories,0," kcal")}</b></div>
          <div><Activity/><span>Lavoro meccanico</span><b>{metric(activity.workKj,0," kJ")}</b></div>
          <div><Droplets/><span>Sudorazione stimata</span><b>{metric(activity.estimatedSweatLoss,0," ml")}</b></div>
          <div><Droplets/><span>Liquidi nel FIT</span><b>{metric(activity.fluidConsumed,0," ml")}</b></div>
        </div>
        <p>Per carboidrati, caffè, crampi e liquidi non presenti nel FIT usa il Ride Journal sotto: restano dati locali.</p>
      </div>
    </div>
  </section>;
}

import { Activity, BatteryCharging, Bike, CircleGauge, Cpu, Gauge, HeartPulse, Mountain, RotateCcw, Scale, Timer, Waves, Zap } from "lucide-react";
import type { ActivityDetail } from "@/lib/fit";
import { computePowerAnalytics } from "@/lib/power";
import { formatDuration, formatNumber } from "@/lib/format";
import styles from "./PowerLab.module.css";

function metric(value: number | undefined, digits = 0, suffix = "") {
  if (value === undefined || Number.isNaN(value)) return "—";
  return `${formatNumber(value, digits)}${suffix}`;
}

function phase(value?: [number, number]) {
  if (!value) return "—";
  return `${Math.round(value[0])}° → ${Math.round(value[1])}°`;
}

function PowerCadencePlot({ activity }: { activity: ActivityDetail }) {
  const source = activity.records.filter((record) => typeof record.power === "number" && typeof record.cadence === "number" && record.cadence > 0 && record.power >= 0);
  const stride = Math.max(1, Math.ceil(source.length / 900));
  const points = source.filter((_, index) => index % stride === 0 || index === source.length - 1);
  if (points.length < 8) return <div className={styles.emptyPlot}>Dati potenza/cadenza insufficienti</div>;

  const sortedPowers = points.map((point) => point.power ?? 0).sort((a, b) => a - b);
  const p99 = sortedPowers[Math.floor(sortedPowers.length * .99)] ?? sortedPowers.at(-1) ?? 200;
  const maxPower = Math.max(200, p99);
  const maxCadence = Math.max(100, ...points.map((point) => Math.min(160, point.cadence ?? 0)));
  const width = 720;
  const height = 250;
  const pad = 34;

  return (
    <svg className={styles.scatter} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Distribuzione potenza e cadenza">
      {[0.25, 0.5, 0.75].map((ratio) => <line key={`h-${ratio}`} x1={pad} x2={width - 10} y1={height - pad - ratio * (height - pad * 1.6)} y2={height - pad - ratio * (height - pad * 1.6)} className={styles.grid}/>) }
      {[0.25, 0.5, 0.75].map((ratio) => <line key={`v-${ratio}`} y1={10} y2={height - pad} x1={pad + ratio * (width - pad - 10)} x2={pad + ratio * (width - pad - 10)} className={styles.grid}/>) }
      {points.map((point, index) => {
        const cadence = Math.min(maxCadence, point.cadence ?? 0);
        const power = Math.min(maxPower, point.power ?? 0);
        const x = pad + (cadence / maxCadence) * (width - pad - 10);
        const y = height - pad - (power / maxPower) * (height - pad - 10);
        return <circle key={index} cx={x} cy={y} r="2.4" className={styles.dot}/>;
      })}
      <text x={pad} y={height - 8} className={styles.axis}>0 rpm</text>
      <text x={width - 56} y={height - 8} className={styles.axis}>{Math.round(maxCadence)} rpm</text>
      <text x="4" y={18} className={styles.axis}>{Math.round(maxPower)} W</text>
    </svg>
  );
}

export function PowerLab({ activity, ftpOverride, weightKg }: { activity: ActivityDetail; ftpOverride?: number; weightKg?: number }) {
  const analytics = computePowerAnalytics(activity, ftpOverride);
  const effectiveFtp = analytics.ftp;
  const dynamicsAvailable = [analytics.averageLeftBalance, analytics.leftTorqueEffectiveness, analytics.rightTorqueEffectiveness, analytics.leftPedalSmoothness, analytics.rightPedalSmoothness, analytics.combinedPedalSmoothness, analytics.leftPco, analytics.rightPco, analytics.leftPowerPhase, analytics.rightPowerPhase].some((value) => value !== undefined);
  const position = analytics.riderPosition;
  const positionAvailable = [position.standingSeconds, position.seatedAvgPower, position.standingAvgPower, position.seatedAvgCadence, position.standingAvgCadence].some((value) => value !== undefined);
  const wKg = activity.normalizedPower !== undefined && weightKg ? activity.normalizedPower / weightKg : undefined;

  return (
    <section className={styles.powerLab}>
      <div className={styles.hero}>
        <div>
          <span className={styles.eyebrow}>POWER LAB</span>
          <h2>Analisi del misuratore di potenza</h2>
          <p>Potenza, torque, cadenza, salita e dinamica di pedalata ricavate dal FIT. I dati che il sensore non registra non vengono stimati come se fossero reali.</p>
        </div>
        <div className={styles.ftpBadge}>
          <small>{ftpOverride ? "FTP VELOLAB" : "FTP NEL FIT"}</small>
          <strong>{effectiveFtp ? `${Math.round(effectiveFtp)} W` : "—"}</strong>
          {ftpOverride && activity.thresholdPower && activity.thresholdPower !== ftpOverride && <em>FIT {Math.round(activity.thresholdPower)} W</em>}
        </div>
      </div>

      <div className={styles.primaryGrid}>
        <div className={styles.metricCard}><Zap/><span>Potenza media</span><strong>{metric(activity.avgPower, 0, " W")}</strong><small>media Garmin</small></div>
        <div className={styles.metricCard}><Activity/><span>NP</span><strong>{metric(activity.normalizedPower, 0, " W")}</strong><small>potenza normalizzata</small></div>
        <div className={styles.metricCard}><CircleGauge/><span>Potenza pedalando</span><strong>{metric(analytics.pedalingAveragePower, 0, " W")}</strong><small>campioni &gt; 0 W</small></div>
        <div className={styles.metricCard}><Gauge/><span>Variability Index</span><strong>{metric(analytics.variabilityIndex, 2)}</strong><small>NP / potenza media</small></div>
        <div className={styles.metricCard}><RotateCcw/><span>Cadenza pedalando</span><strong>{metric(analytics.averageCadencePedaling, 0, " rpm")}</strong><small>zeri esclusi</small></div>
        <div className={styles.metricCard}><Waves/><span>Tempo a 0 W</span><strong>{metric(analytics.zeroPowerPercent, 1, "%")}</strong><small>coasting / non spinta</small></div>
        <div className={styles.metricCard}><Scale/><span>Torque medio</span><strong>{metric(analytics.averageTorqueNm, 1, " Nm")}</strong><small>da watt + rpm</small></div>
        <div className={styles.metricCard}><Scale/><span>Torque massimo</span><strong>{metric(analytics.maxTorqueNm, 1, " Nm")}</strong><small>durante pedalata</small></div>
        <div className={styles.metricCard}><HeartPulse/><span>Efficiency Factor</span><strong>{metric(analytics.efficiencyFactor, 2)}</strong><small>NP / FC media</small></div>
        <div className={styles.metricCard}><HeartPulse/><span>Pw:Hr drift</span><strong>{metric(analytics.decouplingPercent, 1, "%")}</strong><small>prima vs seconda metà</small></div>
        {weightKg && <div className={styles.metricCard}><Bike/><span>NP relativa</span><strong>{metric(wKg, 2, " W/kg")}</strong><small>{formatNumber(weightKg, 1)} kg nel profilo</small></div>}
        {activity.intensityFactor !== undefined && <div className={styles.metricCard}><Gauge/><span>IF Garmin</span><strong>{metric(activity.intensityFactor, 3)}</strong><small>valore salvato nel FIT</small></div>}
      </div>

      <div className={styles.twoCols}>
        <div className={styles.panel}>
          <div className={styles.panelHead}><div><span>POWER DURATION</span><h3>Curva di potenza</h3></div><b>{metric(activity.maxPower, 0, " W max")}</b></div>
          <div className={styles.curveGrid}>{activity.powerCurve.map((point) => <div key={point.label}><span>{point.label}</span><strong>{point.watts ? `${point.watts} W` : "—"}</strong></div>)}</div>
        </div>
        <div className={styles.panel}>
          <div className={styles.panelHead}><div><span>QUADRANT VIEW</span><h3>Potenza × cadenza</h3></div><small>outlier visivi limitati al P99</small></div>
          <PowerCadencePlot activity={activity}/>
        </div>
      </div>

      <div className={styles.twoCols}>
        <div className={styles.panel}>
          <div className={styles.panelHead}><div><span>CADENCE LAB</span><h3>Come hai girato le gambe</h3></div><RotateCcw size={19}/></div>
          <div className={styles.cadenceBands}>{analytics.cadenceBands.map((band) => <div key={band.key} className={styles.cadenceBand}><div><b>{band.label}</b><span>{formatDuration(band.seconds)}</span></div><div className={styles.zoneTrack}><i style={{ width: `${Math.max(.6, band.percent)}%` }}/></div><div><b>{formatNumber(band.percent, 1)}%</b><span>{band.avgPower !== undefined ? `${formatNumber(band.avgPower)} W medi` : "—"}</span></div></div>)}</div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHead}><div><span>RIDER POSITION</span><h3>Seduto vs in piedi</h3></div><Bike size={19}/></div>
          {positionAvailable ? <div className={styles.positionGrid}>
            <div><span>Seduto</span><b>{formatDuration(position.seatedSeconds ?? 0)}</b><small>{metric(position.seatedAvgPower, 0, " W medi")} · {metric(position.seatedAvgCadence, 0, " rpm")}</small></div>
            <div><span>In piedi</span><b>{formatDuration(position.standingSeconds ?? 0)}</b><small>{metric(position.standingAvgPower, 0, " W medi")} · {metric(position.standingAvgCadence, 0, " rpm")}</small></div>
            <div><span>% in piedi</span><b>{metric(position.standingPercent, 1, "%")}</b><small>{position.standCount !== undefined ? `${Math.round(position.standCount)} cambi posizione` : ""}</small></div>
            <div><span>Picco in piedi</span><b>{metric(position.standingMaxPower, 0, " W")}</b><small>max seduto {metric(position.seatedMaxPower, 0, " W")}</small></div>
          </div> : <div className={styles.emptyDynamics}>Il FIT non contiene dati rider-position sufficienti.</div>}
        </div>
      </div>

      {analytics.climbs.length > 0 && <div className={styles.panel}>
        <div className={styles.panelHead}><div><span>CLIMB LAB</span><h3>Salite rilevate automaticamente</h3></div><Mountain size={19}/></div>
        <div className={styles.climbTable}>
          <div className={styles.climbHeader}><span>Tratto</span><span>Lunghezza</span><span>D+</span><span>Pendenza</span><span>Tempo</span><span>VAM</span><span>W</span><span>FC</span><span>rpm</span></div>
          {analytics.climbs.map((climb, index) => <div className={styles.climbRow} key={climb.key}><span><b>Salita {index + 1}</b><small>km {formatNumber(climb.startKm, 1)} → {formatNumber(climb.endKm, 1)}</small></span><span>{formatNumber(climb.lengthKm, 2)} km</span><span>{formatNumber(climb.gainM)} m</span><span>{formatNumber(climb.avgGrade, 1)}%</span><span>{formatDuration(climb.durationSec)}</span><span>{metric(climb.vam, 0, " m/h")}</span><span>{metric(climb.avgPower, 0, " W")}</span><span>{metric(climb.avgHr, 0, " bpm")}</span><span>{metric(climb.avgCadence, 0, " rpm")}</span></div>)}
        </div>
      </div>}

      {analytics.zones.length > 0 && <div className={styles.panel}>
        <div className={styles.panelHead}><div><span>DISTRIBUZIONE</span><h3>Tempo nelle zone di potenza</h3></div><small>FTP usata: {Math.round(analytics.ftp ?? 0)} W {ftpOverride ? "· VeloLab" : "· FIT"}</small></div>
        <div className={styles.zones}>{analytics.zones.map((zone) => <div className={styles.zoneRow} key={zone.key}><div className={styles.zoneName}><b>{zone.label}</b><span>{zone.range}</span></div><div className={styles.zoneTrack}><i style={{ width: `${Math.max(.6, zone.percent)}%` }}/></div><div className={styles.zoneValue}><b>{formatDuration(zone.seconds)}</b><span>{formatNumber(zone.percent, 1)}%</span></div></div>)}</div>
      </div>}

      <div className={styles.twoCols}>
        <div className={styles.panel}>
          <div className={styles.panelHead}><div><span>CYCLING DYNAMICS</span><h3>Qualità della pedalata</h3></div><Scale size={19}/></div>
          {dynamicsAvailable ? <div className={styles.dynamicsGrid}>
            <div className={styles.balanceCard}><span>Bilanciamento L/R</span><strong>{analytics.averageLeftBalance !== undefined ? `${formatNumber(analytics.averageLeftBalance, 1)} / ${formatNumber(analytics.averageRightBalance, 1)}` : "—"}</strong>{analytics.averageLeftBalance !== undefined && <div className={styles.balanceBar}><i style={{ width: `${analytics.averageLeftBalance}%` }}/></div>}<small>{analytics.estimatedLeftPower !== undefined ? `≈ ${formatNumber(analytics.estimatedLeftPower)} W L · ${formatNumber(analytics.estimatedRightPower)} W R durante la pedalata` : ""}</small></div>
            <div><span>Torque effectiveness L</span><b>{metric(analytics.leftTorqueEffectiveness, 1, "%")}</b></div><div><span>Torque effectiveness R</span><b>{metric(analytics.rightTorqueEffectiveness, 1, "%")}</b></div>
            <div><span>Pedal smoothness L</span><b>{metric(analytics.leftPedalSmoothness, 1, "%")}</b></div><div><span>Pedal smoothness R</span><b>{metric(analytics.rightPedalSmoothness, 1, "%")}</b></div>
            <div><span>Pedal smoothness combinata</span><b>{metric(analytics.combinedPedalSmoothness, 1, "%")}</b></div>
            <div><span>PCO sinistro</span><b>{metric(analytics.leftPco, 1, " mm")}</b></div><div><span>PCO destro</span><b>{metric(analytics.rightPco, 1, " mm")}</b></div>
            <div><span>Power phase L</span><b>{phase(analytics.leftPowerPhase)}</b><small>{metric(analytics.leftPowerPhaseArc, 0, "° arco")} · centro {metric(analytics.leftPowerPhaseCenter, 0, "°")}</small></div>
            <div><span>Power phase R</span><b>{phase(analytics.rightPowerPhase)}</b><small>{metric(analytics.rightPowerPhaseArc, 0, "° arco")} · centro {metric(analytics.rightPowerPhaseCenter, 0, "°")}</small></div>
            <div><span>Peak phase L</span><b>{phase(analytics.leftPowerPhasePeak)}</b></div><div><span>Peak phase R</span><b>{phase(analytics.rightPowerPhasePeak)}</b></div>
          </div> : <div className={styles.emptyDynamics}>Il FIT non contiene Cycling Dynamics avanzate. VeloLab le mostrerà automaticamente quando il misuratore le registra.</div>}
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHead}><div><span>HARDWARE</span><h3>Sensori registrati</h3></div><Cpu size={19}/></div>
          <div className={styles.sensorList}>{activity.sensors.length ? activity.sensors.map((sensor, index) => <div className={styles.sensor} key={`${sensor.index ?? index}-${sensor.serialNumber ?? sensor.name ?? index}`}><div className={styles.sensorIcon}>{sensor.batteryStatus || sensor.batteryVoltage ? <BatteryCharging size={18}/> : <Cpu size={18}/>}</div><div><b>{sensor.name ?? sensor.descriptor ?? sensor.deviceType ?? `Sensore ${index + 1}`}</b><span>{[sensor.manufacturer, sensor.sourceType, sensor.sensorPosition].filter(Boolean).join(" · ") || "Accessorio FIT"}</span></div><div className={styles.sensorMeta}><b>{sensor.batteryVoltage ? `${formatNumber(sensor.batteryVoltage, 2)} V` : sensor.batteryStatus ?? ""}</b><span>{sensor.softwareVersion ? `FW ${sensor.softwareVersion}` : ""}</span></div></div>) : <div className={styles.emptyDynamics}>Nessun Device Info aggiuntivo disponibile nel FIT.</div>}</div>
        </div>
      </div>
    </section>
  );
}

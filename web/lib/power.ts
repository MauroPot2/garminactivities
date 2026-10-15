import type { ActivityDetail, ActivityRecord } from "@/lib/fit";

export type PowerZone = {
  key: string;
  label: string;
  range: string;
  seconds: number;
  percent: number;
};

export type CadenceBand = {
  key: string;
  label: string;
  seconds: number;
  percent: number;
  avgPower?: number;
};

export type ClimbAnalysis = {
  key: string;
  startKm: number;
  endKm: number;
  lengthKm: number;
  gainM: number;
  avgGrade: number;
  durationSec: number;
  vam?: number;
  avgPower?: number;
  avgHr?: number;
  avgCadence?: number;
  intensityFactor?: number;
};

export type RiderPositionAnalytics = {
  seatedSeconds?: number;
  standingSeconds?: number;
  standingPercent?: number;
  standCount?: number;
  seatedAvgPower?: number;
  standingAvgPower?: number;
  seatedMaxPower?: number;
  standingMaxPower?: number;
  seatedAvgCadence?: number;
  standingAvgCadence?: number;
  seatedMaxCadence?: number;
  standingMaxCadence?: number;
};

export type PowerAnalytics = {
  pedalingAveragePower?: number;
  averageCadencePedaling?: number;
  zeroPowerPercent?: number;
  variabilityIndex?: number;
  efficiencyFactor?: number;
  decouplingPercent?: number;
  averageTorqueNm?: number;
  maxTorqueNm?: number;
  averageLeftBalance?: number;
  averageRightBalance?: number;
  estimatedLeftPower?: number;
  estimatedRightPower?: number;
  leftTorqueEffectiveness?: number;
  rightTorqueEffectiveness?: number;
  leftPedalSmoothness?: number;
  rightPedalSmoothness?: number;
  combinedPedalSmoothness?: number;
  leftPco?: number;
  rightPco?: number;
  leftPowerPhase?: [number, number];
  rightPowerPhase?: [number, number];
  leftPowerPhasePeak?: [number, number];
  rightPowerPhasePeak?: [number, number];
  leftPowerPhaseArc?: number;
  rightPowerPhaseArc?: number;
  leftPowerPhaseCenter?: number;
  rightPowerPhaseCenter?: number;
  leftPowerPhasePeakArc?: number;
  rightPowerPhasePeakArc?: number;
  leftPowerPhasePeakCenter?: number;
  rightPowerPhasePeakCenter?: number;
  zones: PowerZone[];
  cadenceBands: CadenceBand[];
  climbs: ClimbAnalysis[];
  riderPosition: RiderPositionAnalytics;
  ftp?: number;
};

function avg(values: Array<number | undefined>): number | undefined {
  const valid = values.filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  if (!valid.length) return undefined;
  return valid.reduce((sum, value) => sum + value, 0) / valid.length;
}

function avgPair(values: Array<number[] | undefined>, fallback?: number[]): [number, number] | undefined {
  const pairs = values.filter((value): value is number[] => Array.isArray(value) && value.length >= 2);
  if (pairs.length) {
    const start = avg(pairs.map((pair) => pair[0]));
    const end = avg(pairs.map((pair) => pair[1]));
    if (start !== undefined && end !== undefined) return [start, end];
  }
  return fallback && fallback.length >= 2 ? [fallback[0], fallback[1]] : undefined;
}

function sampleSeconds(records: ActivityRecord[], index: number): number {
  const current = records[index]?.timestamp?.getTime();
  const next = records[index + 1]?.timestamp?.getTime();
  if (current !== undefined && next !== undefined) {
    const seconds = (next - current) / 1000;
    if (seconds > 0 && seconds <= 10) return seconds;
  }
  return 1;
}

function torqueNm(power: number, cadence: number): number | undefined {
  if (power <= 0 || cadence <= 0) return undefined;
  const angularVelocity = cadence * (2 * Math.PI / 60);
  return angularVelocity ? power / angularVelocity : undefined;
}

function circularArc(start: number, end: number): number {
  const normalized = ((end - start) % 360 + 360) % 360;
  return normalized === 0 && start !== end ? 360 : normalized;
}

function circularCenter(pair?: [number, number]): number | undefined {
  if (!pair) return undefined;
  return (pair[0] + circularArc(pair[0], pair[1]) / 2) % 360;
}

function computeDecoupling(records: ActivityRecord[]): number | undefined {
  const valid = records.filter((record) =>
    typeof record.power === "number" &&
    typeof record.heartRate === "number" &&
    record.heartRate > 0,
  );
  if (valid.length < 600) return undefined;
  const midpoint = Math.floor(valid.length / 2);
  const first = valid.slice(0, midpoint);
  const second = valid.slice(midpoint);
  const firstPower = avg(first.map((record) => record.power));
  const secondPower = avg(second.map((record) => record.power));
  const firstHr = avg(first.map((record) => record.heartRate));
  const secondHr = avg(second.map((record) => record.heartRate));
  if (!firstPower || !secondPower || !firstHr || !secondHr) return undefined;
  return (1 - (secondPower / secondHr) / (firstPower / firstHr)) * 100;
}

function computeZones(records: ActivityRecord[], ftp?: number): PowerZone[] {
  if (!ftp || ftp <= 0) return [];
  const definitions = [
    { key: "z1", label: "Z1 Recupero", min: 0, max: 0.55, range: `< ${Math.round(ftp * 0.56)} W` },
    { key: "z2", label: "Z2 Endurance", min: 0.55, max: 0.75, range: `${Math.round(ftp * 0.56)}–${Math.round(ftp * 0.75)} W` },
    { key: "z3", label: "Z3 Tempo", min: 0.75, max: 0.90, range: `${Math.round(ftp * 0.76)}–${Math.round(ftp * 0.90)} W` },
    { key: "z4", label: "Z4 Soglia", min: 0.90, max: 1.05, range: `${Math.round(ftp * 0.91)}–${Math.round(ftp * 1.05)} W` },
    { key: "z5", label: "Z5 VO₂", min: 1.05, max: 1.20, range: `${Math.round(ftp * 1.06)}–${Math.round(ftp * 1.20)} W` },
    { key: "z6", label: "Z6 Anaerobico", min: 1.20, max: 1.50, range: `${Math.round(ftp * 1.21)}–${Math.round(ftp * 1.50)} W` },
    { key: "z7", label: "Z7 Neuromuscolare", min: 1.50, max: Infinity, range: `> ${Math.round(ftp * 1.50)} W` },
  ];
  const seconds = new Array(definitions.length).fill(0) as number[];
  let total = 0;

  records.forEach((record, index) => {
    if (typeof record.power !== "number") return;
    const duration = sampleSeconds(records, index);
    const ratio = record.power / ftp;
    const zoneIndex = definitions.findIndex((zone, i) => i === 0 ? ratio < zone.max : ratio >= zone.min && ratio < zone.max);
    const resolved = zoneIndex >= 0 ? zoneIndex : definitions.length - 1;
    seconds[resolved] += duration;
    total += duration;
  });

  return definitions.map((zone, index) => ({
    key: zone.key,
    label: zone.label,
    range: zone.range,
    seconds: Math.round(seconds[index]),
    percent: total > 0 ? (seconds[index] / total) * 100 : 0,
  }));
}

function computeCadenceBands(records: ActivityRecord[]): CadenceBand[] {
  const definitions = [
    { key: "low", label: "< 60 rpm", min: 0, max: 60 },
    { key: "strength", label: "60–74 rpm", min: 60, max: 75 },
    { key: "endurance", label: "75–89 rpm", min: 75, max: 90 },
    { key: "agile", label: "90–104 rpm", min: 90, max: 105 },
    { key: "fast", label: "105+ rpm", min: 105, max: Infinity },
  ];
  const data = definitions.map(() => ({ seconds: 0, weightedPower: 0, powerSeconds: 0 }));
  let total = 0;

  records.forEach((record, index) => {
    if (typeof record.cadence !== "number" || record.cadence <= 0) return;
    const duration = sampleSeconds(records, index);
    const band = definitions.findIndex((definition) => record.cadence! >= definition.min && record.cadence! < definition.max);
    if (band < 0) return;
    data[band].seconds += duration;
    total += duration;
    if (typeof record.power === "number") {
      data[band].weightedPower += record.power * duration;
      data[band].powerSeconds += duration;
    }
  });

  return definitions.map((definition, index) => ({
    key: definition.key,
    label: definition.label,
    seconds: Math.round(data[index].seconds),
    percent: total ? data[index].seconds / total * 100 : 0,
    avgPower: data[index].powerSeconds ? data[index].weightedPower / data[index].powerSeconds : undefined,
  }));
}

function computeRiderPosition(activity: ActivityDetail): RiderPositionAnalytics {
  const standingSeconds = activity.timeStanding;
  const positionTotalSeconds = activity.durationSec > 0 ? activity.durationSec : activity.movingSec;
  const seatedSeconds = standingSeconds !== undefined && positionTotalSeconds >= standingSeconds ? positionTotalSeconds - standingSeconds : undefined;
  return {
    seatedSeconds,
    standingSeconds,
    standingPercent: standingSeconds !== undefined && positionTotalSeconds > 0 ? standingSeconds / positionTotalSeconds * 100 : undefined,
    standCount: activity.standCount,
    seatedAvgPower: activity.avgPowerPosition?.[0],
    standingAvgPower: activity.avgPowerPosition?.[1],
    seatedMaxPower: activity.maxPowerPosition?.[0],
    standingMaxPower: activity.maxPowerPosition?.[1],
    seatedAvgCadence: activity.avgCadencePosition?.[0],
    standingAvgCadence: activity.avgCadencePosition?.[1],
    seatedMaxCadence: activity.maxCadencePosition?.[0],
    standingMaxCadence: activity.maxCadencePosition?.[1],
  };
}

function computeClimbs(records: ActivityRecord[], ftp?: number): ClimbAnalysis[] {
  const points = records
    .filter((record) => typeof record.distance === "number" && typeof record.altitude === "number")
    .map((record) => ({
      distance: record.distance!,
      altitude: record.altitude!,
      timestamp: record.timestamp,
      power: record.power,
      heartRate: record.heartRate,
      cadence: record.cadence,
    }));
  if (points.length < 120) return [];

  const climbing = new Array(points.length).fill(false);
  let anchor = 0;
  for (let i = 1; i < points.length; i += 1) {
    while (anchor + 1 < i && points[i].distance - points[anchor + 1].distance >= 120) anchor += 1;
    const distance = points[i].distance - points[anchor].distance;
    if (distance < 80) continue;
    const grade = (points[i].altitude - points[anchor].altitude) / distance * 100;
    climbing[i] = grade >= 2;
  }

  const candidates: Array<[number, number]> = [];
  let start: number | null = null;
  let lastMarked = -1;
  for (let i = 0; i < climbing.length; i += 1) {
    if (climbing[i]) {
      if (start === null) start = Math.max(0, i - 60);
      lastMarked = i;
      continue;
    }
    if (start !== null && lastMarked >= 0 && points[i].distance - points[lastMarked].distance > 250) {
      candidates.push([start, lastMarked]);
      start = null;
      lastMarked = -1;
    }
  }
  if (start !== null && lastMarked >= 0) candidates.push([start, lastMarked]);

  return candidates
    .map(([startIndex, endIndex], index): ClimbAnalysis | null => {
      const first = points[startIndex];
      const last = points[endIndex];
      const lengthM = last.distance - first.distance;
      const gainM = last.altitude - first.altitude;
      if (lengthM < 500 || gainM < 30) return null;
      const segment = points.slice(startIndex, endIndex + 1);
      const startTime = first.timestamp?.getTime();
      const endTime = last.timestamp?.getTime();
      const durationSec = startTime !== undefined && endTime !== undefined && endTime > startTime ? (endTime - startTime) / 1000 : segment.length;
      const avgPower = avg(segment.map((point) => point.power));
      const avgHr = avg(segment.map((point) => point.heartRate));
      const avgCadence = avg(segment.map((point) => point.cadence).filter((value) => value === undefined || value > 0));
      return {
        key: `climb-${index + 1}`,
        startKm: first.distance / 1000,
        endKm: last.distance / 1000,
        lengthKm: lengthM / 1000,
        gainM,
        avgGrade: gainM / lengthM * 100,
        durationSec,
        vam: durationSec > 0 ? gainM / (durationSec / 3600) : undefined,
        avgPower,
        avgHr,
        avgCadence,
        intensityFactor: ftp && avgPower ? avgPower / ftp : undefined,
      };
    })
    .filter((climb): climb is ClimbAnalysis => Boolean(climb))
    .slice(0, 10);
}

export function computePowerAnalytics(activity: ActivityDetail, ftpOverride?: number): PowerAnalytics {
  const ftp = ftpOverride && ftpOverride > 0 ? ftpOverride : activity.thresholdPower;
  const powerRecords = activity.records.filter((record) => typeof record.power === "number");
  const pedalingPower = powerRecords.filter((record) => (record.power ?? 0) > 0).map((record) => record.power);
  const cadence = activity.records.map((record) => record.cadence).filter((value): value is number => typeof value === "number" && value > 0);
  const torques = activity.records
    .map((record) => typeof record.power === "number" && typeof record.cadence === "number" ? torqueNm(record.power, record.cadence) : undefined)
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));

  const recordBalance = avg(activity.records.map((record) => record.leftRightBalance));
  const leftBalance = recordBalance ?? activity.avgLeftRightBalance;
  const pedalingAveragePower = avg(pedalingPower);
  const avgHr = activity.avgHr ?? avg(activity.records.map((record) => record.heartRate));
  const leftPowerPhase = avgPair(activity.records.map((record) => record.leftPowerPhase), activity.avgLeftPowerPhase);
  const rightPowerPhase = avgPair(activity.records.map((record) => record.rightPowerPhase), activity.avgRightPowerPhase);
  const leftPowerPhasePeak = avgPair(activity.records.map((record) => record.leftPowerPhasePeak), activity.avgLeftPowerPhasePeak);
  const rightPowerPhasePeak = avgPair(activity.records.map((record) => record.rightPowerPhasePeak), activity.avgRightPowerPhasePeak);

  return {
    ftp,
    pedalingAveragePower,
    averageCadencePedaling: avg(cadence),
    zeroPowerPercent: powerRecords.length ? (powerRecords.filter((record) => record.power === 0).length / powerRecords.length) * 100 : undefined,
    variabilityIndex: activity.normalizedPower && activity.avgPower ? activity.normalizedPower / activity.avgPower : undefined,
    efficiencyFactor: activity.normalizedPower && avgHr ? activity.normalizedPower / avgHr : undefined,
    decouplingPercent: computeDecoupling(activity.records),
    averageTorqueNm: avg(torques),
    maxTorqueNm: torques.length ? Math.max(...torques) : undefined,
    averageLeftBalance: leftBalance,
    averageRightBalance: leftBalance !== undefined ? 100 - leftBalance : undefined,
    estimatedLeftPower: leftBalance !== undefined && pedalingAveragePower !== undefined ? pedalingAveragePower * leftBalance / 100 : undefined,
    estimatedRightPower: leftBalance !== undefined && pedalingAveragePower !== undefined ? pedalingAveragePower * (100 - leftBalance) / 100 : undefined,
    leftTorqueEffectiveness: avg(activity.records.map((record) => record.leftTorqueEffectiveness)) ?? activity.avgLeftTorqueEffectiveness,
    rightTorqueEffectiveness: avg(activity.records.map((record) => record.rightTorqueEffectiveness)) ?? activity.avgRightTorqueEffectiveness,
    leftPedalSmoothness: avg(activity.records.map((record) => record.leftPedalSmoothness)) ?? activity.avgLeftPedalSmoothness,
    rightPedalSmoothness: avg(activity.records.map((record) => record.rightPedalSmoothness)) ?? activity.avgRightPedalSmoothness,
    combinedPedalSmoothness: avg(activity.records.map((record) => record.combinedPedalSmoothness)) ?? activity.avgCombinedPedalSmoothness,
    leftPco: avg(activity.records.map((record) => record.leftPco)) ?? activity.avgLeftPco,
    rightPco: avg(activity.records.map((record) => record.rightPco)) ?? activity.avgRightPco,
    leftPowerPhase,
    rightPowerPhase,
    leftPowerPhasePeak,
    rightPowerPhasePeak,
    leftPowerPhaseArc: leftPowerPhase ? circularArc(leftPowerPhase[0], leftPowerPhase[1]) : undefined,
    rightPowerPhaseArc: rightPowerPhase ? circularArc(rightPowerPhase[0], rightPowerPhase[1]) : undefined,
    leftPowerPhaseCenter: circularCenter(leftPowerPhase),
    rightPowerPhaseCenter: circularCenter(rightPowerPhase),
    leftPowerPhasePeakArc: leftPowerPhasePeak ? circularArc(leftPowerPhasePeak[0], leftPowerPhasePeak[1]) : undefined,
    rightPowerPhasePeakArc: rightPowerPhasePeak ? circularArc(rightPowerPhasePeak[0], rightPowerPhasePeak[1]) : undefined,
    leftPowerPhasePeakCenter: circularCenter(leftPowerPhasePeak),
    rightPowerPhasePeakCenter: circularCenter(rightPowerPhasePeak),
    zones: computeZones(activity.records, ftp),
    cadenceBands: computeCadenceBands(activity.records),
    climbs: computeClimbs(activity.records, ftp),
    riderPosition: computeRiderPosition(activity),
  };
}

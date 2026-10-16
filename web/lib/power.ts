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

function circularMean(values: number[]): number | undefined {
  const valid = values.filter((value) => Number.isFinite(value));
  if (!valid.length) return undefined;
  const vectors = valid.reduce((acc, value) => {
    const radians = value * Math.PI / 180;
    acc.sin += Math.sin(radians);
    acc.cos += Math.cos(radians);
    return acc;
  }, { sin: 0, cos: 0 });
  if (Math.abs(vectors.sin) < Number.EPSILON && Math.abs(vectors.cos) < Number.EPSILON) return undefined;
  return (Math.atan2(vectors.sin, vectors.cos) * 180 / Math.PI + 360) % 360;
}

function avgPair(values: Array<number[] | undefined>, fallback?: number[]): [number, number] | undefined {
  const pairs = values.filter((value): value is number[] => Array.isArray(value) && value.length >= 2);
  if (pairs.length) {
    const start = circularMean(pairs.map((pair) => pair[0]));
    const end = circularMean(pairs.map((pair) => pair[1]));
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

function timeWeightedAverage(records: ActivityRecord[], selector: (record: ActivityRecord) => number | undefined): number | undefined {
  let weighted = 0;
  let seconds = 0;
  records.forEach((record, index) => {
    const value = selector(record);
    if (value === undefined || !Number.isFinite(value)) return;
    const duration = sampleSeconds(records, index);
    weighted += value * duration;
    seconds += duration;
  });
  return seconds > 0 ? weighted / seconds : undefined;
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
  const valid = records.filter((record): record is ActivityRecord & { timestamp: Date; power: number; heartRate: number } =>
    record.timestamp instanceof Date &&
    typeof record.power === "number" &&
    typeof record.heartRate === "number" &&
    record.heartRate > 0,
  );
  if (valid.length < 2) return undefined;

  const startMs = valid[0].timestamp.getTime();
  const endMs = valid.at(-1)!.timestamp.getTime();
  const elapsedSec = (endMs - startMs) / 1000;
  if (!Number.isFinite(elapsedSec) || elapsedSec < 600) return undefined;
  const midpointMs = startMs + (endMs - startMs) / 2;

  const weightedHalf = (fromMs: number, toMs: number) => {
    let powerSum = 0;
    let hrSum = 0;
    let secondsSum = 0;

    valid.forEach((record, index) => {
      const sampleStart = record.timestamp.getTime();
      const nextStart = valid[index + 1]?.timestamp.getTime();
      let durationSec = nextStart !== undefined ? (nextStart - sampleStart) / 1000 : 1;
      if (!Number.isFinite(durationSec) || durationSec <= 0 || durationSec > 10) durationSec = 1;
      const sampleEnd = sampleStart + durationSec * 1000;
      const overlapMs = Math.max(0, Math.min(sampleEnd, toMs) - Math.max(sampleStart, fromMs));
      const overlapSec = overlapMs / 1000;
      if (overlapSec <= 0) return;
      powerSum += record.power * overlapSec;
      hrSum += record.heartRate * overlapSec;
      secondsSum += overlapSec;
    });

    return secondsSum > 0 ? { power: powerSum / secondsSum, hr: hrSum / secondsSum } : undefined;
  };

  const first = weightedHalf(startMs, midpointMs);
  const second = weightedHalf(midpointMs, endMs + 1000);
  if (!first || !second || first.power <= 0 || second.power <= 0 || first.hr <= 0 || second.hr <= 0) return undefined;
  return (1 - (second.power / second.hr) / (first.power / first.hr)) * 100;
}

function computeZones(records: ActivityRecord[], ftp?: number): PowerZone[] {
  if (!ftp || ftp <= 0) return [];

  const z1Max = Math.floor(ftp * .55);
  const z2Max = Math.floor(ftp * .75);
  const z3Max = Math.floor(ftp * .90);
  const z4Max = Math.floor(ftp * 1.05);
  const z5Max = Math.floor(ftp * 1.20);
  const z6Max = Math.floor(ftp * 1.50);
  const definitions = [
    { key: "z1", label: "Z1 Recupero", min: 0, max: z1Max, range: `≤ ${z1Max} W` },
    { key: "z2", label: "Z2 Endurance", min: z1Max + 1, max: z2Max, range: `${z1Max + 1}–${z2Max} W` },
    { key: "z3", label: "Z3 Tempo", min: z2Max + 1, max: z3Max, range: `${z2Max + 1}–${z3Max} W` },
    { key: "z4", label: "Z4 Soglia", min: z3Max + 1, max: z4Max, range: `${z3Max + 1}–${z4Max} W` },
    { key: "z5", label: "Z5 VO₂", min: z4Max + 1, max: z5Max, range: `${z4Max + 1}–${z5Max} W` },
    { key: "z6", label: "Z6 Anaerobico", min: z5Max + 1, max: z6Max, range: `${z5Max + 1}–${z6Max} W` },
    { key: "z7", label: "Z7 Neuromuscolare", min: z6Max + 1, max: Infinity, range: `≥ ${z6Max + 1} W` },
  ];
  const seconds = new Array(definitions.length).fill(0) as number[];
  let total = 0;

  records.forEach((record, index) => {
    if (typeof record.power !== "number") return;
    const duration = sampleSeconds(records, index);
    const watts = Math.max(0, Math.round(record.power));
    const zoneIndex = definitions.findIndex((zone) => watts >= zone.min && watts <= zone.max);
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
  const positionTotalSeconds = activity.timerSec !== undefined && activity.timerSec > 0
    ? activity.timerSec
    : activity.movingSec > 0
      ? activity.movingSec
      : activity.durationSec;
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

  const weightedSegmentAverage = (
    segment: typeof points,
    selector: (point: (typeof points)[number]) => number | undefined,
  ): number | undefined => {
    let weighted = 0;
    let seconds = 0;
    segment.forEach((point, index) => {
      const value = selector(point);
      if (value === undefined || !Number.isFinite(value)) return;
      const current = point.timestamp?.getTime();
      const next = segment[index + 1]?.timestamp?.getTime();
      let duration = current !== undefined && next !== undefined ? (next - current) / 1000 : 1;
      if (!Number.isFinite(duration) || duration <= 0 || duration > 10) duration = 1;
      weighted += value * duration;
      seconds += duration;
    });
    return seconds > 0 ? weighted / seconds : undefined;
  };

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
      const avgPower = weightedSegmentAverage(segment, (point) => point.power);
      const avgHr = weightedSegmentAverage(segment, (point) => point.heartRate);
      const avgCadence = weightedSegmentAverage(segment, (point) => typeof point.cadence === "number" && point.cadence > 0 ? point.cadence : undefined);
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
  const torqueValues = activity.records
    .map((record) => typeof record.power === "number" && typeof record.cadence === "number" ? torqueNm(record.power, record.cadence) : undefined)
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));

  const powerTime = activity.records.reduce((acc, record, index) => {
    if (typeof record.power !== "number") return acc;
    const duration = sampleSeconds(activity.records, index);
    acc.total += duration;
    if (record.power === 0) acc.zero += duration;
    return acc;
  }, { total: 0, zero: 0 });

  const recordBalance = timeWeightedAverage(activity.records, (record) => record.leftRightBalance);
  const leftBalance = recordBalance ?? activity.avgLeftRightBalance;
  const pedalingAveragePower = timeWeightedAverage(activity.records, (record) => typeof record.power === "number" && record.power > 0 ? record.power : undefined);
  const averageCadencePedaling = timeWeightedAverage(activity.records, (record) => typeof record.cadence === "number" && record.cadence > 0 ? record.cadence : undefined);
  const averageTorqueNm = timeWeightedAverage(activity.records, (record) => typeof record.power === "number" && typeof record.cadence === "number" ? torqueNm(record.power, record.cadence) : undefined);
  const avgHr = activity.avgHr ?? timeWeightedAverage(activity.records, (record) => record.heartRate);
  const leftPowerPhase = avgPair(activity.records.map((record) => record.leftPowerPhase), activity.avgLeftPowerPhase);
  const rightPowerPhase = avgPair(activity.records.map((record) => record.rightPowerPhase), activity.avgRightPowerPhase);
  const leftPowerPhasePeak = avgPair(activity.records.map((record) => record.leftPowerPhasePeak), activity.avgLeftPowerPhasePeak);
  const rightPowerPhasePeak = avgPair(activity.records.map((record) => record.rightPowerPhasePeak), activity.avgRightPowerPhasePeak);

  return {
    ftp,
    pedalingAveragePower,
    averageCadencePedaling,
    zeroPowerPercent: powerTime.total > 0 ? powerTime.zero / powerTime.total * 100 : undefined,
    variabilityIndex: activity.normalizedPower && activity.avgPower ? activity.normalizedPower / activity.avgPower : undefined,
    efficiencyFactor: activity.normalizedPower && avgHr ? activity.normalizedPower / avgHr : undefined,
    decouplingPercent: computeDecoupling(activity.records),
    averageTorqueNm,
    maxTorqueNm: torqueValues.length ? Math.max(...torqueValues) : undefined,
    averageLeftBalance: leftBalance,
    averageRightBalance: leftBalance !== undefined ? 100 - leftBalance : undefined,
    estimatedLeftPower: leftBalance !== undefined && pedalingAveragePower !== undefined ? pedalingAveragePower * leftBalance / 100 : undefined,
    estimatedRightPower: leftBalance !== undefined && pedalingAveragePower !== undefined ? pedalingAveragePower * (100 - leftBalance) / 100 : undefined,
    leftTorqueEffectiveness: timeWeightedAverage(activity.records, (record) => record.leftTorqueEffectiveness) ?? activity.avgLeftTorqueEffectiveness,
    rightTorqueEffectiveness: timeWeightedAverage(activity.records, (record) => record.rightTorqueEffectiveness) ?? activity.avgRightTorqueEffectiveness,
    leftPedalSmoothness: timeWeightedAverage(activity.records, (record) => record.leftPedalSmoothness) ?? activity.avgLeftPedalSmoothness,
    rightPedalSmoothness: timeWeightedAverage(activity.records, (record) => record.rightPedalSmoothness) ?? activity.avgRightPedalSmoothness,
    combinedPedalSmoothness: timeWeightedAverage(activity.records, (record) => record.combinedPedalSmoothness) ?? activity.avgCombinedPedalSmoothness,
    leftPco: timeWeightedAverage(activity.records, (record) => record.leftPco) ?? activity.avgLeftPco,
    rightPco: timeWeightedAverage(activity.records, (record) => record.rightPco) ?? activity.avgRightPco,
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

import type { ActivityDetail, ActivityRecord } from "@/lib/fit";

export type PowerZone = {
  key: string;
  label: string;
  range: string;
  seconds: number;
  percent: number;
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
  zones: PowerZone[];
  ftp?: number;
};

function avg(values: Array<number | undefined>): number | undefined {
  const valid = values.filter((value): value is number => typeof value === "number" && Number.isFinite(value));
  if (!valid.length) return undefined;
  return valid.reduce((sum, value) => sum + value, 0) / valid.length;
}

function avgPair(values: Array<number[] | undefined>): [number, number] | undefined {
  const pairs = values.filter((value): value is number[] => Array.isArray(value) && value.length >= 2);
  if (!pairs.length) return undefined;
  const start = avg(pairs.map((pair) => pair[0]));
  const end = avg(pairs.map((pair) => pair[1]));
  return start !== undefined && end !== undefined ? [start, end] : undefined;
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
  if (!angularVelocity) return undefined;
  return power / angularVelocity;
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
  const firstRatio = firstPower / firstHr;
  const secondRatio = secondPower / secondHr;
  return (1 - secondRatio / firstRatio) * 100;
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
    const zoneIndex = definitions.findIndex((zone, i) =>
      i === 0 ? ratio < zone.max : ratio >= zone.min && ratio < zone.max,
    );
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

export function computePowerAnalytics(activity: ActivityDetail): PowerAnalytics {
  const powerRecords = activity.records.filter((record) => typeof record.power === "number");
  const pedalingPower = powerRecords.filter((record) => (record.power ?? 0) > 0).map((record) => record.power);
  const cadence = activity.records.map((record) => record.cadence).filter((value): value is number => typeof value === "number" && value > 0);
  const torques = activity.records
    .map((record) => typeof record.power === "number" && typeof record.cadence === "number" ? torqueNm(record.power, record.cadence) : undefined)
    .filter((value): value is number => typeof value === "number" && Number.isFinite(value));

  const recordBalance = avg(activity.records.map((record) => record.leftRightBalance));
  const leftBalance = recordBalance ?? activity.avgLeftRightBalance;
  const avgHr = activity.avgHr ?? avg(activity.records.map((record) => record.heartRate));

  return {
    ftp: activity.thresholdPower,
    pedalingAveragePower: avg(pedalingPower),
    averageCadencePedaling: avg(cadence),
    zeroPowerPercent: powerRecords.length ? (powerRecords.filter((record) => record.power === 0).length / powerRecords.length) * 100 : undefined,
    variabilityIndex: activity.normalizedPower && activity.avgPower ? activity.normalizedPower / activity.avgPower : undefined,
    efficiencyFactor: activity.normalizedPower && avgHr ? activity.normalizedPower / avgHr : undefined,
    decouplingPercent: computeDecoupling(activity.records),
    averageTorqueNm: avg(torques),
    maxTorqueNm: torques.length ? Math.max(...torques) : undefined,
    averageLeftBalance: leftBalance,
    averageRightBalance: leftBalance !== undefined ? 100 - leftBalance : undefined,
    leftTorqueEffectiveness: avg(activity.records.map((record) => record.leftTorqueEffectiveness)) ?? activity.avgLeftTorqueEffectiveness,
    rightTorqueEffectiveness: avg(activity.records.map((record) => record.rightTorqueEffectiveness)) ?? activity.avgRightTorqueEffectiveness,
    leftPedalSmoothness: avg(activity.records.map((record) => record.leftPedalSmoothness)) ?? activity.avgLeftPedalSmoothness,
    rightPedalSmoothness: avg(activity.records.map((record) => record.rightPedalSmoothness)) ?? activity.avgRightPedalSmoothness,
    combinedPedalSmoothness: avg(activity.records.map((record) => record.combinedPedalSmoothness)) ?? activity.avgCombinedPedalSmoothness,
    leftPco: avg(activity.records.map((record) => record.leftPco)),
    rightPco: avg(activity.records.map((record) => record.rightPco)),
    leftPowerPhase: avgPair(activity.records.map((record) => record.leftPowerPhase)),
    rightPowerPhase: avgPair(activity.records.map((record) => record.rightPowerPhase)),
    leftPowerPhasePeak: avgPair(activity.records.map((record) => record.leftPowerPhasePeak)),
    rightPowerPhasePeak: avgPair(activity.records.map((record) => record.rightPowerPhasePeak)),
    zones: computeZones(activity.records, activity.thresholdPower),
  };
}

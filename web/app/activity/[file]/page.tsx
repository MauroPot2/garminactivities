import Link from "next/link";
import { ArrowLeft, Bike, Flame, Gauge, HeartPulse, Mountain, RotateCcw, Timer, Zap } from "lucide-react";
import { PowerLab } from "@/components/PowerLab";
import { RideExplorer, type ExplorerRecord } from "@/components/RideExplorer";
import { RideJournal } from "@/components/RideJournal";
import { getActivity } from "@/lib/fit";
import { formatDate, formatDuration, formatNumber } from "@/lib/format";
import { getJournalEntry } from "@/lib/journal";
import { getFtpForDate, readSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function ActivityDetailPage({ params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const activity = getActivity(file);
  const settings = readSettings();
  const ftpOverride = getFtpForDate(activity.date, settings);
  const journal = getJournalEntry(activity.file);
  const explorerRecords: ExplorerRecord[] = activity.records.map((record) => ({
    timestamp: record.timestamp?.toISOString(),
    lat: record.lat,
    lon: record.lon,
    distance: record.distance,
    power: record.power,
    heartRate: record.heartRate,
    cadence: record.cadence,
    altitude: record.altitude,
    speed: record.speed,
    grade: record.grade,
  }));

  return (
    <div className="pageWrap detailPage">
      <div className="detailBack"><Link href="/"><ArrowLeft size={17}/>Tutte le attività</Link></div>
      <header className="activityHeader">
        <div className="activityHeaderIcon"><Bike size={27}/></div>
        <div className="activityHeading"><div className="eyebrow">ATTIVITÀ GARMIN</div><h1>Uscita in bici</h1><p>{formatDate(activity.date, true)} · {activity.device ?? "Dispositivo Garmin"}</p></div>
        <div className="activityHeadline"><strong>{formatNumber(activity.distanceKm, 1)}</strong><span>km</span></div>
      </header>

      <section className="detailMetricGrid detailMetricGridPro">
        <div><span><Timer size={15}/>Tempo in movimento</span><b>{formatDuration(activity.movingSec)}</b></div>
        <div><span><Mountain size={15}/>Dislivello</span><b>{formatNumber(activity.ascentM)} m</b></div>
        <div><span><Zap size={15}/>Potenza media</span><b>{formatNumber(activity.avgPower)} W</b></div>
        <div><span><Gauge size={15}/>Potenza NP</span><b>{formatNumber(activity.normalizedPower)} W</b></div>
        <div><span><HeartPulse size={15}/>FC media</span><b>{formatNumber(activity.avgHr)} bpm</b></div>
        <div><span><RotateCcw size={15}/>Cadenza pedalando</span><b>{formatNumber(activity.avgCadence)} rpm</b></div>
        <div><span><Gauge size={15}/>Velocità media</span><b>{activity.avgSpeed !== undefined ? `${formatNumber(activity.avgSpeed * 3.6, 1)} km/h` : "—"}</b></div>
        <div><span><Flame size={15}/>Lavoro</span><b>{formatNumber(activity.workKj)} kJ</b></div>
      </section>

      <section className="rideExplorerSection">
        <div className="panelHeader rideExplorerHeader"><div><span className="sectionLabel">RIDE EXPLORER</span><h2>Mappa e telemetria sincronizzate</h2></div><span className="countPill">{activity.records.length.toLocaleString("it-IT")} campioni FIT</span></div>
        <RideExplorer records={explorerRecords}/>
      </section>

      <PowerLab activity={activity} ftpOverride={ftpOverride} weightKg={settings.weightKg}/>
      <RideJournal file={activity.file} initial={journal}/>
    </div>
  );
}

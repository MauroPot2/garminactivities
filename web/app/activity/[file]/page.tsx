import Link from "next/link";
import { ArrowLeft, Bike, Flame, Gauge, HeartPulse, Mountain, Timer, Zap } from "lucide-react";
import { RouteMap, SeriesChart } from "@/components/DetailCharts";
import { getActivity } from "@/lib/fit";
import { formatDate, formatDuration, formatNumber } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ActivityDetailPage({ params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const activity = getActivity(file);
  return (
    <div className="pageWrap detailPage">
      <div className="detailBack"><Link href="/"><ArrowLeft size={17}/>Tutte le attività</Link></div>
      <header className="activityHeader">
        <div className="activityHeaderIcon"><Bike size={27}/></div>
        <div className="activityHeading"><div className="eyebrow">ATTIVITÀ GARMIN</div><h1>Uscita in bici</h1><p>{formatDate(activity.date, true)} · {activity.device ?? "Dispositivo Garmin"}</p></div>
        <div className="activityHeadline"><strong>{formatNumber(activity.distanceKm, 1)}</strong><span>km</span></div>
      </header>

      <section className="detailMetricGrid">
        <div><span><Timer size={15}/>Tempo</span><b>{formatDuration(activity.movingSec)}</b></div>
        <div><span><Mountain size={15}/>Dislivello</span><b>{formatNumber(activity.ascentM)} m</b></div>
        <div><span><Zap size={15}/>Potenza media</span><b>{formatNumber(activity.avgPower)} W</b></div>
        <div><span><Gauge size={15}/>Potenza NP</span><b>{formatNumber(activity.normalizedPower)} W</b></div>
        <div><span><HeartPulse size={15}/>FC media</span><b>{formatNumber(activity.avgHr)} bpm</b></div>
        <div><span><Flame size={15}/>Lavoro</span><b>{formatNumber(activity.workKj)} kJ</b></div>
      </section>

      <section className="panel routePanel">
        <div className="panelHeader"><div><span className="sectionLabel">PERCORSO</span><h2>Traccia dell’uscita</h2></div><span className="countPill">{activity.records.length.toLocaleString("it-IT")} campioni</span></div>
        <RouteMap records={activity.records}/>
      </section>

      <section className="chartsGrid">
        <SeriesChart records={activity.records} field="power" label="Potenza" unit="W" tone="violet"/>
        <SeriesChart records={activity.records} field="heartRate" label="Frequenza cardiaca" unit="bpm" tone="pink"/>
        <SeriesChart records={activity.records} field="cadence" label="Cadenza" unit="rpm" tone="orange"/>
        <SeriesChart records={activity.records} field="altitude" label="Altitudine" unit="m" tone="cyan"/>
      </section>

      <section className="panel powerPanel">
        <div className="panelHeader"><div><span className="sectionLabel">POWER CURVE</span><h2>Migliori potenze</h2></div></div>
        <div className="powerCurve">
          {activity.powerCurve.map((point) => <div key={point.label}><span>{point.label}</span><b>{point.watts ? `${point.watts} W` : "—"}</b></div>)}
        </div>
      </section>
    </div>
  );
}

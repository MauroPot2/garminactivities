import { Activity, ArrowUpRight, Bike, Flame, HeartPulse, Mountain, Timer, TrendingUp, Zap } from "lucide-react";
import { ActivityRow } from "@/components/ActivityRow";
import { MetricCard } from "@/components/MetricCard";
import { MiniChart } from "@/components/MiniChart";
import { getActivities, getDashboardStats } from "@/lib/fit";
import { compact, formatDate, formatDuration, formatNumber } from "@/lib/format";

export const dynamic = "force-dynamic";

export default function Dashboard() {
  const activities = getActivities(60);
  const stats = getDashboardStats(activities);
  const latest = activities[0];
  const chartValues = activities.slice(0, 10).reverse().map((a) => a.distanceKm);

  return (
    <div className="pageWrap">
      <header className="topbar">
        <div>
          <div className="eyebrow">TRAINING OVERVIEW</div>
          <h1>La tua bici, <span>misurata bene.</span></h1>
          <p>Dati FIT reali, trend e allenamenti Garmin. Tutto locale sul tuo Mac.</p>
        </div>
        <div className="topActions">
          <div className="syncPill"><span className="syncDot"/>FIT locali</div>
          <a className="primaryButton" href="/workouts"><Activity size={17}/>Crea allenamento</a>
        </div>
      </header>

      <section className="metricGrid">
        <MetricCard label="Distanza · 7 giorni" value={formatNumber(stats.weekDistance, 1)} unit=" km" icon={Bike} hint={`${stats.ridesThisMonth} uscite negli ultimi 30 giorni`} />
        <MetricCard label="Tempo in sella" value={formatDuration(stats.weekDuration)} icon={Timer} hint={`${formatNumber(stats.monthDistance, 0)} km questo mese`} />
        <MetricCard label="Dislivello" value={compact(stats.weekAscent)} unit=" m" icon={Mountain} hint="ultimi 7 giorni" />
        <MetricCard label="Lavoro" value={compact(stats.weekWork)} unit=" kJ" icon={Flame} hint="energia meccanica registrata" />
      </section>

      <section className="dashboardGrid">
        <div className="panel latestPanel">
          <div className="panelHeader">
            <div><span className="sectionLabel">ULTIMA USCITA</span><h2>{latest ? formatDate(latest.date, true) : "Nessuna attività"}</h2></div>
            {latest && <a className="textLink" href={`/activity/${encodeURIComponent(latest.file)}`}>Analizza <ArrowUpRight size={15}/></a>}
          </div>
          {latest ? (
            <>
              <div className="latestHero">
                <div><strong>{formatNumber(latest.distanceKm, 1)}</strong><span>km</span></div>
                <div className="latestRouteGhost"><Bike size={34}/><div className="routeLine"/></div>
              </div>
              <div className="latestMetrics">
                <div><span><Timer size={15}/>Tempo</span><b>{formatDuration(latest.movingSec)}</b></div>
                <div><span><Zap size={15}/>NP</span><b>{formatNumber(latest.normalizedPower)} W</b></div>
                <div><span><HeartPulse size={15}/>FC media</span><b>{formatNumber(latest.avgHr)} bpm</b></div>
                <div><span><Mountain size={15}/>D+</span><b>{formatNumber(latest.ascentM)} m</b></div>
              </div>
            </>
          ) : <div className="emptyState">Copia un file .FIT nel repository e ricarica la pagina.</div>}
        </div>

        <div className="panel trendPanel">
          <div className="panelHeader"><div><span className="sectionLabel">VOLUME</span><h2>Ultime uscite</h2></div><TrendingUp size={20}/></div>
          <div className="trendValue"><strong>{formatNumber(stats.monthDistance, 0)}</strong><span>km / 30 giorni</span></div>
          <MiniChart values={chartValues} height={118}/>
          <div className="chartFooter"><span>meno recente</span><span>oggi</span></div>
        </div>
      </section>

      <section className="panel activitiesPanel" id="attivita">
        <div className="panelHeader">
          <div><span className="sectionLabel">ARCHIVIO FIT</span><h2>Attività recenti</h2></div>
          <div className="countPill">{activities.length} caricate</div>
        </div>
        <div className="activityList">
          {activities.slice(0, 14).map((activity) => <ActivityRow activity={activity} key={activity.file}/>) }
          {!activities.length && <div className="emptyState">Non ho trovato file .fit nella cartella del repository.</div>}
        </div>
      </section>
    </div>
  );
}

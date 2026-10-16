import Link from "next/link";
import { Activity, ArrowRight, BatteryMedium, Dumbbell, Flame, Gauge, HeartPulse, Route, Sparkles, Target, TrendingUp, Zap } from "lucide-react";
import { getActivities } from "@/lib/fit";
import { formatDate, formatNumber } from "@/lib/format";
import { getJournalEntries } from "@/lib/journal";
import { getCurrentFtp, readSettings } from "@/lib/settings";
import { buildLoadModel } from "@/lib/training";
import styles from "./coach.module.css";

export const dynamic = "force-dynamic";

type TrainingBand = {
  key: string;
  label: string;
  goal: string;
  percent: string;
  watts: string;
  duration: string;
  detail: string;
  cadence?: string;
  href: string;
  state: string;
  icon: typeof Activity;
};

function targetRange(ftp: number | undefined, minPercent: number, maxPercent: number) {
  if (!ftp) return undefined;
  return [Math.round(ftp * minPercent), Math.round(ftp * maxPercent)] as const;
}

function workoutHref(slug: string, range?: readonly [number, number]) {
  return range ? `/workouts?preset=${slug}&targetMin=${range[0]}&targetMax=${range[1]}` : `/workouts?preset=${slug}`;
}

export default function CoachPage() {
  const activities = getActivities(180);
  const settings = readSettings();
  const currentFtp = getCurrentFtp(settings);
  const model = buildLoadModel(activities, settings, 90);
  const journal = new Map(getJournalEntries().map((entry) => [entry.file, entry]));
  const latest = activities[0];
  const latestJournal = latest ? journal.get(latest.file) : undefined;
  const highRpe = (latestJournal?.rpe ?? 0) >= 7;
  const cramps = latestJournal?.cramps === true;
  const highFatigue = model.latest.form < -12;
  const veryFresh = model.latest.form > 12;
  const moderateFatigue = model.latest.form < -5;
  const qualityLast14 = model.activityLoads.filter((load) => {
    const ageDays = (Date.now() - load.date.getTime()) / 86_400_000;
    return ageDays >= 0 && ageDays <= 14 && (load.intensityFactor ?? 0) >= .85;
  }).length;
  const daysSinceLastRide = latest ? Math.max(0, Math.floor((Date.now() - latest.date.getTime()) / 86_400_000)) : undefined;
  const blockedQuality = highRpe || cramps || highFatigue;

  let title = "Endurance controllata";
  let preset = "endurance";
  let duration = "60–90 min";
  let reason = "Il carico recente è gestibile: priorità alla continuità aerobica e alla qualità della pedalata.";
  let intensity = "RPE 2–3 · ritmo conversazionale";
  let nextRange = targetRange(currentFtp, .60, .72);
  let focusIndex = 1;

  if (highRpe || cramps) {
    title = "Recupero prima di aggiungere qualità";
    preset = "recovery";
    duration = "45–60 min";
    intensity = "RPE 1–2 · molto facile";
    nextRange = targetRange(currentFtp, .50, .60);
    focusIndex = 0;
    reason = cramps ? "L'ultima attività è stata annotata con crampi: il prossimo passo resta facile finché le sensazioni non tornano normali." : "L'ultima uscita ha RPE elevato: il Coach riduce il carico successivo.";
  } else if (highFatigue) {
    title = "Scarico attivo";
    preset = "recovery";
    duration = "45–60 min";
    intensity = "RPE 1–2";
    nextRange = targetRange(currentFtp, .50, .60);
    focusIndex = 0;
    reason = "La fatica a breve termine è nettamente superiore alla fitness del modello: conviene assorbire il carico.";
  } else if (!currentFtp) {
    title = "Costruisci la base e imposta la FTP";
    preset = "endurance";
    duration = "60–90 min";
    intensity = "RPE 2–3";
    nextRange = undefined;
    focusIndex = 1;
    reason = "Manca una FTP valida: posso guidarti con RPE e carico, ma per personalizzare forza, soglia e VO₂ serve una FTP nel Rider Profile.";
  } else if (veryFresh && model.last7 > 0 && qualityLast14 === 0) {
    title = "FTP controllata · 3×10'";
    preset = "threshold";
    duration = "circa 65 min";
    nextRange = targetRange(currentFtp, .90, .95);
    intensity = `${nextRange![0]}–${nextRange![1]} W · 90–95% FTP`;
    focusIndex = 3;
    reason = "Sei fresco e nelle ultime due settimane non risultano sedute ad alta intensità: inserisco qualità senza partire subito dal VO₂.";
  } else if (!moderateFatigue && qualityLast14 < 2 && model.last7 > 0) {
    title = "Forza resistente · 4×6'";
    preset = "strength";
    duration = "circa 60 min";
    nextRange = targetRange(currentFtp, .75, .85);
    intensity = `${nextRange![0]}–${nextRange![1]} W · 55–65 rpm`;
    focusIndex = 2;
    reason = "Il carico è sotto controllo: prima della soglia piena, il Coach propone forza resistente a bassa cadenza e coppia controllata.";
  }

  const workoutHrefValue = workoutHref(preset, nextRange);
  const ftpWkg = currentFtp && settings.weightKg ? currentFtp / settings.weightKg : undefined;

  const recovery = targetRange(currentFtp, .50, .60);
  const endurance = targetRange(currentFtp, .60, .72);
  const strength = targetRange(currentFtp, .75, .85);
  const threshold = targetRange(currentFtp, .90, .95);
  const vo2 = targetRange(currentFtp, 1.10, 1.20);

  const bands: TrainingBand[] = [
    { key: "recovery", label: "Recupero", goal: "Assorbire il carico", percent: "50–60% FTP", watts: recovery ? `${recovery[0]}–${recovery[1]} W` : "FTP richiesta", duration: "45–60 min", detail: "Pedalata molto facile. Usala dopo giornate dure o quando Form/RPE indicano fatica.", href: currentFtp ? workoutHref("recovery", recovery) : "/settings", state: blockedQuality ? "CONSIGLIATO ORA" : "quando serve", icon: HeartPulse },
    { key: "endurance", label: "Base aerobica", goal: "Costruire continuità", percent: "60–72% FTP", watts: endurance ? `${endurance[0]}–${endurance[1]} W` : "RPE 2–3", duration: "75–120 min", detail: "È la fascia di volume. Deve restare sostenibile e ripetibile, non diventare una gara ogni uscita.", href: currentFtp ? workoutHref("endurance", endurance) : workoutHref("endurance"), state: focusIndex === 1 ? "FOCUS ATTUALE" : "fondamentale", icon: Route },
    { key: "strength", label: "Forza resistente", goal: "Coppia e controllo", percent: "75–85% FTP", watts: strength ? `${strength[0]}–${strength[1]} W` : "FTP richiesta", duration: "4×6 min", detail: "Blocchi a 55–65 rpm, seduto e senza forzare articolazioni o tecnica. Recupero agile tra i blocchi.", cadence: "55–65 rpm", href: currentFtp ? workoutHref("strength", strength) : "/settings", state: focusIndex === 2 ? "PROSSIMO PASSO" : "1×/settimana", icon: Dumbbell },
    { key: "threshold", label: "FTP / Soglia", goal: "Alzare la potenza sostenibile", percent: "90–95% FTP", watts: threshold ? `${threshold[0]}–${threshold[1]} W` : "FTP richiesta", duration: "3×10 min", detail: "Qualità controllata vicino alla soglia. Inseriscila quando Form non è negativo e il recupero è normale.", href: currentFtp ? workoutHref("threshold", threshold) : "/settings", state: focusIndex === 3 ? "FOCUS ATTUALE" : blockedQuality ? "rimanda" : "quando fresco", icon: Target },
    { key: "vo2", label: "VO₂", goal: "Potenza aerobica alta", percent: "110–120% FTP", watts: vo2 ? `${vo2[0]}–${vo2[1]} W` : "FTP richiesta", duration: "5×3 min", detail: "È il lavoro più costoso. Il Coach lo considera solo con recupero buono e poco lavoro intenso recente.", href: currentFtp ? workoutHref("vo2", vo2) : "/settings", state: blockedQuality || moderateFatigue || qualityLast14 >= 2 ? "NON ORA" : "opzionale", icon: Flame },
  ];

  const path = [
    { label: "Recupera", note: "Form, RPE, sensazioni" },
    { label: "Base", note: "volume sostenibile" },
    { label: "Forza", note: "coppia a bassa cadenza" },
    { label: "FTP", note: "soglia controllata" },
    { label: "VO₂", note: "solo da fresco" },
  ];

  return <div className="pageWrap coachPage">
    <header className="topbar"><div><div className="eyebrow">COACH MODE</div><h1>Un passo alla volta. <span>Guidato dai dati.</span></h1><p>Il Coach usa FIT, carico, FTP storica e Ride Journal per proporti il prossimo passo e una linea di progressione. Le scelte restano trasparenti e modificabili.</p></div></header>

    <section className={`${styles.coachHero} panel`}>
      <div className={styles.coachOrb}><Sparkles size={30}/></div>
      <div className={styles.coachHeroCopy}><span className="sectionLabel">PROSSIMO PASSO</span><h2>{title}</h2><p>{reason}</p><div className={styles.coachTags}><span><Activity size={14}/>{duration}</span><span><HeartPulse size={14}/>{intensity}</span></div></div>
      <Link className={`primaryButton ${styles.coachCta}`} href={workoutHrefValue}>Prepara allenamento<ArrowRight size={16}/></Link>
    </section>

    <section className={styles.coachSignals}>
      <div className={`panel ${styles.coachSignal}`}><BatteryMedium/><span>Form</span><strong>{model.latest.form>0?"+":""}{formatNumber(model.latest.form,1)}</strong><small>CTL − ATL</small></div>
      <div className={`panel ${styles.coachSignal}`}><Zap/><span>Carico 7 giorni</span><strong>{formatNumber(model.last7,0)}</strong><small>{model.ramp>0?"+":""}{formatNumber(model.ramp,0)}% vs 7 gg prima</small></div>
      <div className={`panel ${styles.coachSignal}`}><Gauge/><span>FTP attuale</span><strong>{currentFtp ?? "—"}<small>{currentFtp ? " W" : ""}</small></strong><small>{ftpWkg ? `${formatNumber(ftpWkg,2)} W/kg` : "Rider Profile"}</small></div>
      <div className={`panel ${styles.coachSignal}`}><Activity/><span>Qualità 14 giorni</span><strong>{qualityLast14}</strong><small>sedute IF ≥ 0,85</small></div>
      <div className={`panel ${styles.coachSignal}`}><HeartPulse/><span>Ultima RPE</span><strong>{latestJournal?.rpe ?? "—"}<small>{latestJournal?.rpe ? "/10" : ""}</small></strong><small>{latestJournal?.cramps ? "crampi annotati" : "Ride Journal"}</small></div>
      <div className={`panel ${styles.coachSignal}`}><TrendingUp/><span>Ultima uscita</span><strong>{daysSinceLastRide ?? "—"}<small>{daysSinceLastRide !== undefined ? " gg fa" : ""}</small></strong><small>{latest ? `${formatDate(latest.date)} · ${formatNumber(latest.normalizedPower,0)} W NP` : "nessuna attività"}</small></div>
    </section>

    <section className={`panel ${styles.coachPathPanel}`}>
      <div className="panelHeader"><div><span className="sectionLabel">LINEA DA SEGUIRE</span><h2>Progressione adattiva</h2></div><span className={styles.coachPathHint}>Il punto evidenziato cambia con i nuovi FIT</span></div>
      <div className={styles.coachPath}>
        {path.map((step, index) => <div className={`${styles.coachPathStep} ${index === focusIndex ? styles.isCurrent : ""} ${index < focusIndex ? styles.isDone : ""}`} key={step.label}><div className={styles.coachPathDot}>{index + 1}</div><div><strong>{step.label}</strong><span>{step.note}</span></div></div>)}
      </div>
    </section>

    <section className={styles.coachBandSection}>
      <div className={styles.coachBandHeading}><div><span className="sectionLabel">ALLENAMENTI PER FASCIA</span><h2>Scegli il lavoro, con watt già scalati sulla tua FTP</h2></div>{!currentFtp && <Link href="/settings" className="textLink">Imposta FTP<ArrowRight size={14}/></Link>}</div>
      <div className={styles.coachBands}>
        {bands.map((band) => {
          const Icon = band.icon;
          return <Link href={band.href} className={`${styles.coachBand} panel ${band.state === "NON ORA" ? styles.isMuted : ""}`} key={band.key}>
            <div className={styles.coachBandTop}><div className={styles.coachBandIcon}><Icon size={19}/></div><span className={styles.coachBandState}>{band.state}</span></div>
            <h3>{band.label}</h3><p>{band.goal}</p>
            <div className={styles.coachBandTarget}><strong>{band.watts}</strong><span>{band.percent}</span></div>
            <div className={styles.coachBandMeta}><span>{band.duration}</span>{band.cadence && <span>{band.cadence}</span>}</div>
            <small>{band.detail}</small>
            <div className={styles.coachBandAction}>Apri workout <ArrowRight size={14}/></div>
          </Link>;
        })}
      </div>
    </section>

    <section className={`panel ${styles.coachLogic}`}><div className="panelHeader"><div><span className="sectionLabel">PERCHÉ</span><h2>Logica visibile, non una scatola nera</h2></div></div><div className={styles.coachLogicGrid}><div><b>1</b><span>RPE e note possono bloccare la qualità</span></div><div><b>2</b><span>ATL/CTL decidono quanto carico è assorbibile</span></div><div><b>3</b><span>FTP e peso personalizzano watt e W/kg</span></div><div><b>4</b><span>Le sedute intense recenti limitano FTP e VO₂</span></div></div></section>
  </div>;
}

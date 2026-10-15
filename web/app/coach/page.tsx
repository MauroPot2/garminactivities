import Link from "next/link";
import { Activity, ArrowRight, BatteryMedium, HeartPulse, Sparkles, Zap } from "lucide-react";
import { getActivities } from "@/lib/fit";
import { formatDate, formatNumber } from "@/lib/format";
import { getJournalEntries } from "@/lib/journal";
import { readSettings } from "@/lib/settings";
import { buildLoadModel } from "@/lib/training";

export const dynamic = "force-dynamic";

export default function CoachPage() {
  const activities = getActivities(180);
  const settings = readSettings();
  const model = buildLoadModel(activities, settings, 90);
  const journal = new Map(getJournalEntries().map((entry) => [entry.file, entry]));
  const latest = activities[0];
  const latestJournal = latest ? journal.get(latest.file) : undefined;
  const highRpe = (latestJournal?.rpe ?? 0) >= 7;
  const cramps = latestJournal?.cramps === true;
  const highFatigue = model.latest.form < -12;
  const veryFresh = model.latest.form > 12;

  let title = "Endurance controllata";
  let preset = "endurance";
  let duration = "60–90 min";
  let reason = "Il carico recente è gestibile: priorità alla continuità aerobica e alla qualità della pedalata.";
  let intensity = "RPE 2–3 · ritmo conversazionale";

  if (highRpe || cramps) {
    title = "Recupero prima di aggiungere qualità";
    preset = "recovery";
    duration = "45–60 min";
    intensity = "RPE 1–2 · molto facile";
    reason = cramps ? "L'ultima attività è stata annotata con crampi: meglio verificare il recupero muscolare prima di inserire lavori strutturati." : "L'ultima uscita ha RPE elevato: il Coach riduce il carico successivo.";
  } else if (highFatigue) {
    title = "Scarico attivo";
    preset = "recovery";
    duration = "45–60 min";
    intensity = "RPE 1–2";
    reason = "La fatica a breve termine è nettamente superiore alla fitness del modello: conviene assorbire il carico.";
  } else if (veryFresh && model.last7 > 0) {
    title = "2×15' controllato";
    preset = "controlled";
    duration = "circa 60 min";
    intensity = "150–160 W nei blocchi, solo se le sensazioni sono normali";
    reason = "Il modello mostra buona freschezza. È un momento adatto per reintrodurre lavoro costante senza cercare ancora un test massimale.";
  }

  return <div className="pageWrap coachPage">
    <header className="topbar"><div><div className="eyebrow">COACH MODE</div><h1>Dati dentro, <span>decisione fuori.</span></h1><p>Coach locale e trasparente: usa FIT, carico, FTP storica e Ride Journal. Non sostituisce una valutazione medica e non interpreta sintomi importanti.</p></div></header>

    <section className="coachHero panel">
      <div className="coachOrb"><Sparkles size={30}/></div>
      <div className="coachHeroCopy"><span className="sectionLabel">PROSSIMA SEDUTA SUGGERITA</span><h2>{title}</h2><p>{reason}</p><div className="coachTags"><span><Activity size={14}/>{duration}</span><span><HeartPulse size={14}/>{intensity}</span></div></div>
      <Link className="primaryButton coachCta" href={`/workouts?preset=${preset}`}>Apri nel Workout Studio<ArrowRight size={16}/></Link>
    </section>

    <section className="coachSignals">
      <div className="panel coachSignal"><BatteryMedium/><span>Form</span><strong>{model.latest.form>0?"+":""}{formatNumber(model.latest.form,1)}</strong><small>CTL − ATL</small></div>
      <div className="panel coachSignal"><Zap/><span>Carico 7 giorni</span><strong>{formatNumber(model.last7,0)}</strong><small>TSS / stima</small></div>
      <div className="panel coachSignal"><Activity/><span>Ultima RPE</span><strong>{latestJournal?.rpe ?? "—"}<small>{latestJournal?.rpe ? "/10" : ""}</small></strong><small>{latestJournal?.cramps ? "crampi annotati" : "Ride Journal"}</small></div>
      <div className="panel coachSignal"><HeartPulse/><span>Ultima uscita</span><strong>{latest ? formatNumber(latest.normalizedPower,0) : "—"}<small>{latest ? " W NP" : ""}</small></strong><small>{latest ? formatDate(latest.date) : "nessuna attività"}</small></div>
    </section>

    <section className="panel coachLogic"><div className="panelHeader"><div><span className="sectionLabel">PERCHÉ</span><h2>Logica visibile, non una scatola nera</h2></div></div><div className="coachLogicGrid"><div><b>1</b><span>Controllo RPE e note del Ride Journal</span></div><div><b>2</b><span>Confronto fatigue ATL con fitness CTL</span></div><div><b>3</b><span>Uso la FTP valida alla data, se impostata</span></div><div><b>4</b><span>Scelgo un carico conservativo e modificabile</span></div></div></section>
  </div>;
}

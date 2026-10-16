"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowDownToLine, ChevronDown, Copy, Dumbbell, FolderOpen, GripVertical, Plus, RotateCcw, Save, Sparkles, Timer, Trash2, Zap } from "lucide-react";

type Intensity = "warmup" | "active" | "rest" | "cooldown";
type WorkoutStep = { id: string; name: string; minutes: number; targetMin?: number; targetMax?: number; intensity: Intensity };
type Draft = { name: string; steps: WorkoutStep[] };
type Preset = { slug: string; label: string; hint: string; steps: WorkoutStep[] };

const MAX_STEPS = 50;
const DRAFT_KEY = "velolab-workout-draft-v1";

const starter: WorkoutStep[] = [
  { id: "warm", name: "Riscaldamento", minutes: 15, targetMin: 105, targetMax: 125, intensity: "warmup" },
  { id: "block1", name: "Endurance controllata", minutes: 20, targetMin: 130, targetMax: 145, intensity: "active" },
  { id: "easy", name: "Recupero agile", minutes: 5, targetMin: 90, targetMax: 110, intensity: "rest" },
  { id: "block2", name: "Endurance controllata", minutes: 20, targetMin: 130, targetMax: 145, intensity: "active" },
  { id: "cool", name: "Defaticamento", minutes: 10, targetMin: 85, targetMax: 105, intensity: "cooldown" },
];

const presets: Preset[] = [
  { slug: "recovery", label: "Recupero 60'", hint: "facile e continuo", steps: [{ id: "r1", name: "Pedalata facile", minutes: 60, targetMin: 95, targetMax: 120, intensity: "active" }] },
  { slug: "endurance", label: "Endurance 90'", hint: "base aerobica", steps: [{ id: "e1", name: "Warm up", minutes: 15, targetMin: 95, targetMax: 120, intensity: "warmup" }, { id: "e2", name: "Endurance", minutes: 60, targetMin: 125, targetMax: 145, intensity: "active" }, { id: "e3", name: "Cool down", minutes: 15, targetMin: 85, targetMax: 105, intensity: "cooldown" }] },
  { slug: "controlled", label: "2×15 controllato", hint: "ritorno al lavoro", steps: [{ id: "c1", name: "Warm up", minutes: 15, targetMin: 95, targetMax: 120, intensity: "warmup" }, { id: "c2", name: "Blocco 1", minutes: 15, targetMin: 150, targetMax: 160, intensity: "active" }, { id: "c3", name: "Recupero", minutes: 7, targetMin: 90, targetMax: 115, intensity: "rest" }, { id: "c4", name: "Blocco 2", minutes: 15, targetMin: 150, targetMax: 160, intensity: "active" }, { id: "c5", name: "Cool down", minutes: 10, targetMin: 85, targetMax: 105, intensity: "cooldown" }] },
  { slug: "strength", label: "Forza resistente 4×6'", hint: "55–65 rpm · coppia controllata", steps: [{ id: "s0", name: "Warm up", minutes: 15, targetMin: 95, targetMax: 120, intensity: "warmup" }, ...Array.from({ length: 4 }).flatMap((_, index) => [{ id: `s${index}-on`, name: `Forza ${index + 1} · 55–65 rpm`, minutes: 6, targetMin: 150, targetMax: 170, intensity: "active" as Intensity }, ...(index < 3 ? [{ id: `s${index}-off`, name: "Recupero agile", minutes: 4, targetMin: 90, targetMax: 110, intensity: "rest" as Intensity }] : [])]), { id: "s-end", name: "Cool down", minutes: 10, targetMin: 85, targetMax: 105, intensity: "cooldown" }] },
  { slug: "threshold", label: "FTP 3×10'", hint: "lavoro di soglia controllato", steps: [{ id: "t0", name: "Warm up", minutes: 15, targetMin: 95, targetMax: 120, intensity: "warmup" }, ...Array.from({ length: 3 }).flatMap((_, index) => [{ id: `t${index}-on`, name: `Soglia ${index + 1}`, minutes: 10, targetMin: 180, targetMax: 190, intensity: "active" as Intensity }, ...(index < 2 ? [{ id: `t${index}-off`, name: "Recupero", minutes: 5, targetMin: 90, targetMax: 110, intensity: "rest" as Intensity }] : [])]), { id: "t-end", name: "Cool down", minutes: 10, targetMin: 85, targetMax: 105, intensity: "cooldown" }] },
  { slug: "vo2", label: "VO₂ 5×3'", hint: "qualità breve · recupero completo", steps: [{ id: "v0", name: "Warm up", minutes: 20, targetMin: 95, targetMax: 125, intensity: "warmup" }, ...Array.from({ length: 5 }).flatMap((_, index) => [{ id: `v${index}-on`, name: `VO₂ ${index + 1}`, minutes: 3, targetMin: 220, targetMax: 240, intensity: "active" as Intensity }, ...(index < 4 ? [{ id: `v${index}-off`, name: "Recupero", minutes: 3, targetMin: 85, targetMax: 105, intensity: "rest" as Intensity }] : [])]), { id: "v-end", name: "Cool down", minutes: 10, targetMin: 85, targetMax: 105, intensity: "cooldown" }] },
  { slug: "cadence", label: "Agilità 6×30\"", hint: "cadenza, non sprint", steps: [{ id: "a0", name: "Warm up", minutes: 15, targetMin: 95, targetMax: 120, intensity: "warmup" }, ...Array.from({ length: 6 }).flatMap((_, index) => [{ id: `a${index}-on`, name: `Agilità ${index + 1}`, minutes: 0.5, targetMin: 105, targetMax: 135, intensity: "active" as Intensity }, { id: `a${index}-off`, name: "Recupero", minutes: 2, targetMin: 85, targetMax: 110, intensity: "rest" as Intensity }]), { id: "a-end", name: "Cool down", minutes: 10, targetMin: 85, targetMax: 105, intensity: "cooldown" }] },
];

function uid() { return Math.random().toString(36).slice(2, 9); }
function safeFilename(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "workout"; }

export default function WorkoutsPage() {
  const [name, setName] = useState("Endurance controllata");
  const [steps, setSteps] = useState<WorkoutStep[]>(starter);
  const [dragged, setDragged] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");
  const totalMinutes = useMemo(() => steps.reduce((sum, step) => sum + Number(step.minutes || 0), 0), [steps]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("preset");
    if (!slug) return;
    const preset = presets.find((item) => item.slug === slug);
    if (!preset) return;

    const requestedMinParam = params.get("targetMin");
    const requestedMaxParam = params.get("targetMax");
    const requestedMin = requestedMinParam === null ? Number.NaN : Number(requestedMinParam);
    const requestedMax = requestedMaxParam === null ? Number.NaN : Number(requestedMaxParam);
    const hasCoachTarget = requestedMinParam !== null && requestedMaxParam !== null && Number.isFinite(requestedMin) && Number.isFinite(requestedMax) && requestedMin >= 0 && requestedMax >= requestedMin && requestedMax <= 3000;
    const loadedSteps = preset.steps.map((step) => ({
      ...step,
      id: uid(),
      ...(hasCoachTarget && step.intensity === "active" ? { targetMin: Math.round(requestedMin), targetMax: Math.round(requestedMax) } : {}),
    }));

    setName(preset.label);
    setSteps(loadedSteps);
    setMessage(hasCoachTarget ? `Preset del Coach caricato con target personalizzato ${Math.round(requestedMin)}–${Math.round(requestedMax)} W.` : "Preset del Coach caricato: puoi modificarlo prima di esportarlo.");
  }, []);

  const update = (id: string, patch: Partial<WorkoutStep>) => setSteps((current) => current.map((step) => step.id === id ? { ...step, ...patch } : step));
  const remove = (id: string) => setSteps((current) => current.filter((step) => step.id !== id));
  const duplicate = (step: WorkoutStep) => setSteps((current) => {
    if (current.length >= MAX_STEPS) { setMessage(`Limite Garmin: ${MAX_STEPS} blocchi.`); return current; }
    const index = current.findIndex((item) => item.id === step.id);
    const copy = { ...step, id: uid(), name: `${step.name} copia` };
    return [...current.slice(0, index + 1), copy, ...current.slice(index + 1)];
  });
  const addStep = () => setSteps((current) => {
    if (current.length >= MAX_STEPS) { setMessage(`Limite Garmin: ${MAX_STEPS} blocchi.`); return current; }
    return [...current, { id: uid(), name: "Nuovo blocco", minutes: 10, targetMin: 110, targetMax: 130, intensity: "active" }];
  });

  const onDrop = (target: number) => {
    if (dragged === null || dragged === target) return setDragged(null);
    setSteps((current) => { const next = [...current]; const [moved] = next.splice(dragged, 1); next.splice(target, 0, moved); return next; });
    setDragged(null);
  };

  const saveDraft = () => {
    const draft: Draft = { name, steps };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    setMessage("Bozza salvata sul Mac.");
  };

  const restoreDraft = () => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return setMessage("Nessuna bozza salvata.");
      const draft = JSON.parse(raw) as Draft;
      if (!Array.isArray(draft.steps) || !draft.steps.length) throw new Error();
      setName(draft.name || "Allenamento");
      setSteps(draft.steps.slice(0, MAX_STEPS).map((step) => ({ ...step, id: step.id || uid() })));
      setMessage("Bozza ripristinata.");
    } catch {
      setMessage("La bozza salvata non è valida.");
    }
  };

  const exportFit = async () => {
    setMessage("");
    setExporting(true);
    try {
      if (steps.length > MAX_STEPS) throw new Error(`Riduci l'allenamento a ${MAX_STEPS} blocchi.`);
      const invalidDuration = steps.findIndex((step) => !Number.isFinite(step.minutes) || step.minutes <= 0 || step.minutes > 300);
      if (invalidDuration >= 0) throw new Error(`Controlla la durata del blocco ${invalidDuration + 1}.`);
      const incompleteTarget = steps.findIndex((step) => (step.targetMin === undefined) !== (step.targetMax === undefined));
      if (incompleteTarget >= 0) throw new Error(`Completa entrambi i target watt nel blocco ${incompleteTarget + 1}, oppure lasciali entrambi vuoti.`);
      const invertedTarget = steps.findIndex((step) => step.targetMin !== undefined && step.targetMax !== undefined && step.targetMin > step.targetMax);
      if (invertedTarget >= 0) throw new Error(`Il target watt minimo supera il massimo nel blocco ${invertedTarget + 1}.`);

      const response = await fetch("/api/workouts/export", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, steps }) });
      if (!response.ok) throw new Error(await response.text());
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${safeFilename(name)}.fit`;
      document.body.appendChild(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
      setMessage("FIT creato. Copialo in GARMIN/NewFiles.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Impossibile generare il FIT");
    } finally { setExporting(false); }
  };

  return (
    <div className="pageWrap workoutPage">
      <header className="topbar workoutTopbar">
        <div><div className="eyebrow">WORKOUT STUDIO</div><h1>Costruisci. <span>Pedala.</span></h1><p>Crea workout Garmin precisi, riordina i blocchi e conserva una bozza locale sul Mac.</p></div>
        <div className="topActions">
          <button className="secondaryButton" onClick={restoreDraft}><FolderOpen size={16}/>Ripristina</button>
          <button className="secondaryButton" onClick={saveDraft}><Save size={16}/>Salva bozza</button>
          <button className="primaryButton" onClick={exportFit} disabled={!steps.length || exporting}><ArrowDownToLine size={17}/>{exporting ? "Creo il FIT…" : "Scarica per Garmin"}</button>
        </div>
      </header>
      {message && <div className="statusBanner">{message}</div>}

      <section className="workoutStudio">
        <div className="builderPanel panel">
          <div className="workoutNameRow">
            <div><span className="sectionLabel">NOME ALLENAMENTO</span><input className="workoutName" value={name} onChange={(event) => setName(event.target.value)} maxLength={40}/></div>
            <div className="durationBadge"><Timer size={17}/><strong>{totalMinutes.toLocaleString("it-IT", { maximumFractionDigits: 1 })}</strong><span>min · {steps.length}/{MAX_STEPS} blocchi</span></div>
          </div>

          <div className="timeline">
            {steps.map((step, index) => (
              <div className={`workoutStep step-${step.intensity} ${dragged === index ? "isDragging" : ""}`} key={step.id} draggable onDragStart={() => setDragged(index)} onDragOver={(event) => event.preventDefault()} onDrop={() => onDrop(index)}>
                <div className="dragHandle" title="Trascina"><GripVertical size={19}/></div>
                <div className="stepIndex">{String(index + 1).padStart(2, "0")}</div>
                <div className="stepFields">
                  <input className="stepName" value={step.name} onChange={(event) => update(step.id, { name: event.target.value })}/>
                  <div className="stepSub"><span><Zap size={13}/>{step.targetMin ?? "—"}–{step.targetMax ?? "—"} W</span><span>{step.intensity}</span></div>
                </div>
                <label className="compactInput"><span>min</span><input type="number" min="0.1" step="0.5" max="300" value={step.minutes} onChange={(event) => update(step.id, { minutes: Number(event.target.value) })}/></label>
                <label className="compactInput powerInput"><span>W min</span><input type="number" min="0" max="2000" value={step.targetMin ?? ""} onChange={(event) => update(step.id, { targetMin: event.target.value ? Number(event.target.value) : undefined })}/></label>
                <label className="compactInput powerInput"><span>W max</span><input type="number" min="0" max="2000" value={step.targetMax ?? ""} onChange={(event) => update(step.id, { targetMax: event.target.value ? Number(event.target.value) : undefined })}/></label>
                <label className="intensitySelect"><select value={step.intensity} onChange={(event) => update(step.id, { intensity: event.target.value as Intensity })}><option value="warmup">Warm up</option><option value="active">Lavoro</option><option value="rest">Recupero</option><option value="cooldown">Cool down</option></select><ChevronDown size={13}/></label>
                <div className="stepActions"><button onClick={() => duplicate(step)} title="Duplica" disabled={steps.length >= MAX_STEPS}><Copy size={15}/></button><button onClick={() => remove(step.id)} title="Elimina"><Trash2 size={15}/></button></div>
              </div>
            ))}
          </div>
          <button className="addStep" onClick={addStep} disabled={steps.length >= MAX_STEPS}><Plus size={17}/>{steps.length >= MAX_STEPS ? "Limite di 50 blocchi raggiunto" : "Aggiungi blocco"}</button>
        </div>

        <aside className="workoutAside">
          <div className="panel workoutPreview">
            <div className="panelHeader"><div><span className="sectionLabel">ANTEPRIMA</span><h2>{name || "Allenamento"}</h2></div><Dumbbell size={19}/></div>
            <div className="blockPreview">{steps.map((step) => <div key={step.id} className={`previewBlock step-${step.intensity}`} style={{ flex: Math.max(.5, step.minutes) }} title={`${step.name}: ${step.minutes} min`}><span>{step.minutes}'</span></div>)}</div>
            <div className="previewLegend"><span><i className="dotWarm"/>Warm up</span><span><i className="dotActive"/>Lavoro</span><span><i className="dotRest"/>Recupero</span></div>
            <div className="garminReady"><div className="garminIcon"><Sparkles size={17}/></div><div><b>Garmin ready</b><span>Workout FIT · ciclismo · target potenza</span></div></div>
          </div>

          <div className="panel presetPanel">
            <div className="panelHeader"><div><span className="sectionLabel">PARTI VELOCE</span><h2>Preset</h2></div><RotateCcw size={18}/></div>
            {presets.map((preset) => <button className="presetButton" key={preset.slug} onClick={() => { setName(preset.label); setSteps(preset.steps.map((step) => ({ ...step, id: uid() }))); setMessage(""); }}><span>{preset.label}<small className="presetHint">{preset.hint}</small></span><small>{preset.steps.reduce((sum, step) => sum + step.minutes, 0).toLocaleString("it-IT", { maximumFractionDigits: 1 })} min</small></button>)}
          </div>

          <div className="usbHint"><ArrowDownToLine size={18}/><div><b>Edge 530 via USB</b><span>Dopo il download copia il .FIT nella cartella GARMIN/NewFiles del dispositivo.</span></div></div>
        </aside>
      </section>
    </div>
  );
}

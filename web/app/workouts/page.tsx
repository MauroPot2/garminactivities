"use client";

import { useMemo, useState } from "react";
import { ArrowDownToLine, ChevronDown, Copy, Dumbbell, GripVertical, Plus, RotateCcw, Sparkles, Timer, Trash2, Zap } from "lucide-react";

type Intensity = "warmup" | "active" | "rest" | "cooldown";
type WorkoutStep = { id: string; name: string; minutes: number; targetMin?: number; targetMax?: number; intensity: Intensity };

const starter: WorkoutStep[] = [
  { id: "warm", name: "Riscaldamento", minutes: 15, targetMin: 105, targetMax: 125, intensity: "warmup" },
  { id: "block1", name: "Endurance controllata", minutes: 20, targetMin: 130, targetMax: 145, intensity: "active" },
  { id: "easy", name: "Recupero agile", minutes: 5, targetMin: 90, targetMax: 110, intensity: "rest" },
  { id: "block2", name: "Endurance controllata", minutes: 20, targetMin: 130, targetMax: 145, intensity: "active" },
  { id: "cool", name: "Defaticamento", minutes: 10, targetMin: 85, targetMax: 105, intensity: "cooldown" },
];

const presets = [
  { label: "Recupero 60'", steps: [{ id: "r1", name: "Pedalata facile", minutes: 60, targetMin: 95, targetMax: 120, intensity: "active" as Intensity }] },
  { label: "Endurance 90'", steps: [{ id: "e1", name: "Warm up", minutes: 15, targetMin: 95, targetMax: 120, intensity: "warmup" as Intensity }, { id: "e2", name: "Endurance", minutes: 60, targetMin: 125, targetMax: 145, intensity: "active" as Intensity }, { id: "e3", name: "Cool down", minutes: 15, targetMin: 85, targetMax: 105, intensity: "cooldown" as Intensity }] },
];

function uid() { return Math.random().toString(36).slice(2, 9); }

export default function WorkoutsPage() {
  const [name, setName] = useState("Endurance controllata");
  const [steps, setSteps] = useState<WorkoutStep[]>(starter);
  const [dragged, setDragged] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const totalMinutes = useMemo(() => steps.reduce((sum, s) => sum + Number(s.minutes || 0), 0), [steps]);

  const update = (id: string, patch: Partial<WorkoutStep>) => setSteps((current) => current.map((step) => step.id === id ? { ...step, ...patch } : step));
  const remove = (id: string) => setSteps((current) => current.filter((step) => step.id !== id));
  const duplicate = (step: WorkoutStep) => setSteps((current) => { const i = current.findIndex((s) => s.id === step.id); const copy = { ...step, id: uid(), name: `${step.name} copia` }; return [...current.slice(0, i + 1), copy, ...current.slice(i + 1)]; });
  const addStep = () => setSteps((current) => [...current, { id: uid(), name: "Nuovo blocco", minutes: 10, targetMin: 110, targetMax: 130, intensity: "active" }]);

  const onDrop = (target: number) => {
    if (dragged === null || dragged === target) return setDragged(null);
    setSteps((current) => { const next = [...current]; const [moved] = next.splice(dragged, 1); next.splice(target, 0, moved); return next; });
    setDragged(null);
  };

  const exportFit = async () => {
    setExporting(true);
    try {
      const response = await fetch("/api/workouts/export", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, steps }) });
      if (!response.ok) throw new Error(await response.text());
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.toLowerCase().replace(/[^a-z0-9]+/gi, "_")}.fit`;
      document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Impossibile generare il FIT");
    } finally { setExporting(false); }
  };

  return (
    <div className="pageWrap workoutPage">
      <header className="topbar workoutTopbar">
        <div><div className="eyebrow">WORKOUT STUDIO</div><h1>Costruisci. <span>Pedala.</span></h1><p>Crea il workout a blocchi e scaricalo direttamente in formato FIT per Garmin.</p></div>
        <button className="primaryButton" onClick={exportFit} disabled={!steps.length || exporting}><ArrowDownToLine size={17}/>{exporting ? "Creo il FIT…" : "Scarica per Garmin"}</button>
      </header>

      <section className="workoutStudio">
        <div className="builderPanel panel">
          <div className="workoutNameRow">
            <div><span className="sectionLabel">NOME ALLENAMENTO</span><input className="workoutName" value={name} onChange={(e) => setName(e.target.value)} maxLength={40}/></div>
            <div className="durationBadge"><Timer size={17}/><strong>{totalMinutes}</strong><span>min</span></div>
          </div>

          <div className="timeline">
            {steps.map((step, index) => (
              <div className={`workoutStep step-${step.intensity} ${dragged === index ? "isDragging" : ""}`} key={step.id} draggable onDragStart={() => setDragged(index)} onDragOver={(e) => e.preventDefault()} onDrop={() => onDrop(index)}>
                <div className="dragHandle" title="Trascina"><GripVertical size={19}/></div>
                <div className="stepIndex">{String(index + 1).padStart(2, "0")}</div>
                <div className="stepFields">
                  <input className="stepName" value={step.name} onChange={(e) => update(step.id, { name: e.target.value })}/>
                  <div className="stepSub"><span><Zap size={13}/>{step.targetMin ?? "—"}–{step.targetMax ?? "—"} W</span><span>{step.intensity}</span></div>
                </div>
                <label className="compactInput"><span>min</span><input type="number" min="1" max="300" value={step.minutes} onChange={(e) => update(step.id, { minutes: Number(e.target.value) })}/></label>
                <label className="compactInput powerInput"><span>W min</span><input type="number" min="0" max="2000" value={step.targetMin ?? ""} onChange={(e) => update(step.id, { targetMin: e.target.value ? Number(e.target.value) : undefined })}/></label>
                <label className="compactInput powerInput"><span>W max</span><input type="number" min="0" max="2000" value={step.targetMax ?? ""} onChange={(e) => update(step.id, { targetMax: e.target.value ? Number(e.target.value) : undefined })}/></label>
                <label className="intensitySelect"><select value={step.intensity} onChange={(e) => update(step.id, { intensity: e.target.value as Intensity })}><option value="warmup">Warm up</option><option value="active">Lavoro</option><option value="rest">Recupero</option><option value="cooldown">Cool down</option></select><ChevronDown size={13}/></label>
                <div className="stepActions"><button onClick={() => duplicate(step)} title="Duplica"><Copy size={15}/></button><button onClick={() => remove(step.id)} title="Elimina"><Trash2 size={15}/></button></div>
              </div>
            ))}
          </div>
          <button className="addStep" onClick={addStep}><Plus size={17}/>Aggiungi blocco</button>
        </div>

        <aside className="workoutAside">
          <div className="panel workoutPreview">
            <div className="panelHeader"><div><span className="sectionLabel">ANTEPRIMA</span><h2>{name || "Allenamento"}</h2></div><Dumbbell size={19}/></div>
            <div className="blockPreview">{steps.map((step) => <div key={step.id} className={`previewBlock step-${step.intensity}`} style={{ flex: Math.max(1, step.minutes) }} title={`${step.name}: ${step.minutes} min`}><span>{step.minutes}'</span></div>)}</div>
            <div className="previewLegend"><span><i className="dotWarm"/>Warm up</span><span><i className="dotActive"/>Lavoro</span><span><i className="dotRest"/>Recupero</span></div>
            <div className="garminReady"><div className="garminIcon"><Sparkles size={17}/></div><div><b>Garmin ready</b><span>Workout FIT · ciclismo · target potenza</span></div></div>
          </div>

          <div className="panel presetPanel">
            <div className="panelHeader"><div><span className="sectionLabel">PARTI VELOCE</span><h2>Preset</h2></div><RotateCcw size={18}/></div>
            {presets.map((preset) => <button className="presetButton" key={preset.label} onClick={() => { setName(preset.label); setSteps(preset.steps.map((s) => ({ ...s, id: uid() }))); }}><span>{preset.label}</span><small>{preset.steps.reduce((a, s) => a + s.minutes, 0)} min</small></button>)}
          </div>

          <div className="usbHint"><ArrowDownToLine size={18}/><div><b>Edge 530 via USB</b><span>Dopo il download copia il .FIT nella cartella GARMIN/NewFiles del dispositivo.</span></div></div>
        </aside>
      </section>
    </div>
  );
}

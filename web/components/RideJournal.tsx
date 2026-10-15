"use client";

import { useState } from "react";
import { Coffee, Droplets, Save, Sparkles, Utensils } from "lucide-react";
import type { RideJournalEntry } from "@/lib/journal";

export function RideJournal({ file, initial }: { file: string; initial?: RideJournalEntry }) {
  const [entry, setEntry] = useState<Partial<RideJournalEntry>>({
    rpe: initial?.rpe,
    carbsG: initial?.carbsG,
    fluidsMl: initial?.fluidsMl,
    caffeine: initial?.caffeine ?? false,
    cramps: initial?.cramps ?? false,
    crampsNote: initial?.crampsNote ?? "",
    notes: initial?.notes ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const save = async () => {
    setSaving(true); setMessage("");
    try {
      const response = await fetch("/api/journal", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ file, ...entry }) });
      if (!response.ok) throw new Error(await response.text());
      const saved = await response.json() as RideJournalEntry;
      setEntry(saved);
      setMessage("Diario aggiornato.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Salvataggio non riuscito");
    } finally { setSaving(false); }
  };

  return (
    <section className="panel journalPanel">
      <div className="panelHeader">
        <div><span className="sectionLabel">RIDE JOURNAL</span><h2>Come è andata davvero?</h2></div>
        <Sparkles size={19}/>
      </div>
      <p className="journalIntro">Aggiungi ciò che il Garmin non può sapere: sforzo percepito, carburante, liquidi e sintomi. Questi dati rendono il Coach molto più utile.</p>

      <div className="journalGrid">
        <div className="journalRpe">
          <span>RPE · sforzo percepito</span>
          <div className="rpeScale">
            {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => <button key={value} className={entry.rpe === value ? "isSelected" : ""} onClick={() => setEntry((current) => ({ ...current, rpe: value }))}>{value}</button>)}
          </div>
          <small>1 facilissimo · 10 massimale</small>
        </div>

        <label className="journalField"><span><Utensils size={15}/>Carboidrati durante</span><div className="unitInput"><input type="number" min="0" max="1000" value={entry.carbsG ?? ""} onChange={(event) => setEntry((current) => ({ ...current, carbsG: event.target.value ? Number(event.target.value) : undefined }))}/><b>g</b></div></label>
        <label className="journalField"><span><Droplets size={15}/>Liquidi durante</span><div className="unitInput"><input type="number" min="0" max="10000" step="50" value={entry.fluidsMl ?? ""} onChange={(event) => setEntry((current) => ({ ...current, fluidsMl: event.target.value ? Number(event.target.value) : undefined }))}/><b>ml</b></div></label>

        <button className={`journalToggle ${entry.caffeine ? "isOn" : ""}`} onClick={() => setEntry((current) => ({ ...current, caffeine: !current.caffeine }))}><Coffee size={16}/><span>Caffeina</span><b>{entry.caffeine ? "Sì" : "No"}</b></button>
        <button className={`journalToggle crampsToggle ${entry.cramps ? "isOn" : ""}`} onClick={() => setEntry((current) => ({ ...current, cramps: !current.cramps }))}><span>⚡</span><span>Crampi</span><b>{entry.cramps ? "Sì" : "No"}</b></button>
      </div>

      {entry.cramps && <label className="journalText"><span>Dove / quando sono comparsi i crampi?</span><input value={entry.crampsNote ?? ""} onChange={(event) => setEntry((current) => ({ ...current, crampsNote: event.target.value }))} placeholder="Es. entrambi i quadricipiti negli ultimi 2 km"/></label>}
      <label className="journalText"><span>Note</span><textarea value={entry.notes ?? ""} onChange={(event) => setEntry((current) => ({ ...current, notes: event.target.value }))} placeholder="Sensazioni, sonno, meteo, alimentazione prima dell'uscita…" rows={3}/></label>

      <div className="journalFooter"><span>{message}</span><button className="primaryButton" onClick={save} disabled={saving}><Save size={16}/>{saving ? "Salvo…" : "Salva diario"}</button></div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { Gauge, HeartPulse, Plus, Save, Scale, Trash2 } from "lucide-react";

type FtpEntry = { date: string; watts: number };
type Settings = { ftpHistory: FtpEntry[]; weightKg?: number; maxHeartRate?: number; thresholdHeartRate?: number };

const empty: Settings = { ftpHistory: [] };

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setSettings(data))
      .catch(() => setMessage("Impossibile leggere le impostazioni locali."))
      .finally(() => setLoading(false));
  }, []);

  const currentFtp = useMemo(() => settings.ftpHistory.at(-1)?.watts, [settings.ftpHistory]);

  const updateEntry = (index: number, patch: Partial<FtpEntry>) => setSettings((current) => ({
    ...current,
    ftpHistory: current.ftpHistory.map((entry, entryIndex) => entryIndex === index ? { ...entry, ...patch } : entry),
  }));

  const addEntry = () => setSettings((current) => ({
    ...current,
    ftpHistory: [...current.ftpHistory, { date: new Date().toISOString().slice(0, 10), watts: current.ftpHistory.at(-1)?.watts ?? 200 }],
  }));

  const removeEntry = (index: number) => setSettings((current) => ({ ...current, ftpHistory: current.ftpHistory.filter((_, entryIndex) => entryIndex !== index) }));

  const save = async () => {
    setSaving(true); setMessage("");
    try {
      const response = await fetch("/api/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
      if (!response.ok) throw new Error(await response.text());
      setSettings(await response.json());
      setMessage("Impostazioni salvate localmente.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Salvataggio non riuscito");
    } finally { setSaving(false); }
  };

  return (
    <div className="pageWrap settingsPage">
      <header className="topbar">
        <div><div className="eyebrow">RIDER PROFILE</div><h1>I tuoi riferimenti, <span>nel tempo.</span></h1><p>FTP storica, peso e soglie cardiache restano solo sul tuo Mac e vengono usati per analizzare correttamente ogni attività.</p></div>
        <button className="primaryButton" onClick={save} disabled={loading || saving}><Save size={17}/>{saving ? "Salvo…" : "Salva impostazioni"}</button>
      </header>
      {message && <div className="statusBanner">{message}</div>}

      <section className="settingsGrid">
        <div className="panel settingsCard">
          <div className="settingsCardHeader"><div className="settingsIcon"><Gauge size={20}/></div><div><span className="sectionLabel">POWER</span><h2>FTP storica</h2><p>Ogni uscita usa l'ultimo valore valido alla data dell'attività. Il valore nel FIT resta visibile come confronto.</p></div><div className="settingsHeroValue">{currentFtp ? `${currentFtp} W` : "—"}<small>attuale</small></div></div>
          <div className="ftpHistory">
            {settings.ftpHistory.map((entry, index) => (
              <div className="ftpHistoryRow" key={`${entry.date}-${index}`}>
                <label><span>Dal giorno</span><input type="date" value={entry.date} onChange={(event) => updateEntry(index, { date: event.target.value })}/></label>
                <label><span>FTP</span><div className="unitInput"><input type="number" min="50" max="600" value={entry.watts} onChange={(event) => updateEntry(index, { watts: Number(event.target.value) })}/><b>W</b></div></label>
                <button className="iconButton" onClick={() => removeEntry(index)} aria-label="Elimina FTP"><Trash2 size={16}/></button>
              </div>
            ))}
            {!settings.ftpHistory.length && <div className="settingsEmpty">Nessun override impostato: VeloLab userà la FTP registrata nei singoli FIT.</div>}
          </div>
          <button className="addStep settingsAdd" onClick={addEntry}><Plus size={17}/>Aggiungi cambio FTP</button>
        </div>

        <div className="settingsSide">
          <div className="panel settingsCard compactSettings">
            <div className="settingsCardHeader"><div className="settingsIcon"><Scale size={20}/></div><div><span className="sectionLabel">CORPO</span><h2>Peso</h2></div></div>
            <label className="bigSettingInput"><span>Peso attuale</span><div className="unitInput"><input type="number" step="0.1" min="35" max="250" value={settings.weightKg ?? ""} onChange={(event) => setSettings((current) => ({ ...current, weightKg: event.target.value ? Number(event.target.value) : undefined }))}/><b>kg</b></div></label>
            <p className="settingsNote">Serve per W/kg e analisi salite. Non viene inviato fuori dal localhost.</p>
          </div>

          <div className="panel settingsCard compactSettings">
            <div className="settingsCardHeader"><div className="settingsIcon"><HeartPulse size={20}/></div><div><span className="sectionLabel">CARDIO</span><h2>Soglie cardiache</h2></div></div>
            <div className="dualSettingInputs">
              <label className="bigSettingInput"><span>FC max</span><div className="unitInput"><input type="number" min="100" max="240" value={settings.maxHeartRate ?? ""} onChange={(event) => setSettings((current) => ({ ...current, maxHeartRate: event.target.value ? Number(event.target.value) : undefined }))}/><b>bpm</b></div></label>
              <label className="bigSettingInput"><span>FC soglia</span><div className="unitInput"><input type="number" min="90" max="230" value={settings.thresholdHeartRate ?? ""} onChange={(event) => setSettings((current) => ({ ...current, thresholdHeartRate: event.target.value ? Number(event.target.value) : undefined }))}/><b>bpm</b></div></label>
            </div>
            <p className="settingsNote">Lascia vuoto finché non abbiamo un dato affidabile: VeloLab non inventa le zone cardio.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

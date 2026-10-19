# VeloLab 🚴

**VeloLab** è un performance lab locale costruito direttamente sui file FIT Garmin. L'obiettivo non è clonare il social di Strava, ma creare uno strumento personale per analizzare bene allenamento, potenza, tecnica di pedalata e carico e trasformare i dati nel prossimo workout Garmin.

## Avvio rapido

```bash
git checkout feat/local-training-dashboard
cd web
npm install
npm run dev
```

Apri **http://localhost:3000**.

I `.fit` restano la fonte originale e non vengono modificati. VeloLab li legge dal repository padre. FTP storica, profilo e Ride Journal vengono salvati soltanto sul Mac dentro `web/.velolab/`, cartella esclusa da Git.

## Moduli

### Dashboard
- riepilogo 7/30 giorni
- ultima attività e archivio FIT
- km, tempo, dislivello e lavoro meccanico
- shortcut verso Performance, Coach, Compare e Rider Profile

### Ride Explorer
- mappa reale OpenStreetMap/CARTO
- traccia GPS FIT
- cursore sincronizzato grafico ↔ mappa
- telemetria nel punto selezionato: tempo, distanza, watt, FC, rpm, velocità, quota e pendenza
- grafici potenza, frequenza cardiaca, cadenza e altitudine

### Power Lab
Quando i campi esistono nel FIT:
- power curve 1 s → 60 min
- potenza media, NP, potenza pedalando e coasting
- Variability Index, Efficiency Factor e Pw:Hr drift
- torque da watt + cadenza
- W/kg con peso configurato
- zone di potenza con FTP storica
- distribuzione della cadenza senza falsare la media con gli 0 rpm
- Power × Cadence scatter
- Climb Lab con D+, pendenza, VAM, watt, FC e rpm
- seduto vs in piedi
- L/R balance
- Torque Effectiveness
- Pedal Smoothness
- Platform Center Offset
- Power Phase e Peak Power Phase
- inventario sensori e stato hardware quando disponibile

### Garmin Ride Metrics
- velocità e quota
- Training Effect, TSS, IF ed exercise load se presenti
- respirazione e temperatura se registrate
- calorie, lavoro e dati di idratazione disponibili nel FIT

### Performance
- TSS Garmin oppure stima VeloLab da durata, NP e FTP
- CTL 42 giorni
- ATL 7 giorni
- Form/TSB
- andamento del carico e confronto con la settimana precedente

### Compare Lab
Confronto diretto fra due attività per durata, dislivello, potenza, NP, FC, cadenza e power curve.

### Rider Profile
- FTP storica per data
- peso
- FC massima opzionale
- FC di soglia opzionale

VeloLab non inventa le zone cardio quando i riferimenti non sono disponibili.

### Ride Journal
Per integrare ciò che il Garmin non conosce:
- RPE 1–10
- carboidrati
- liquidi
- caffeina
- crampi e nota specifica
- note libere

### Coach Mode
Coach locale, trasparente e modificabile basato su FIT + Ride Journal + carico. Un RPE elevato, crampi annotati o una fatica alta spingono il sistema verso una proposta più conservativa. Il suggerimento può essere aperto direttamente nel Workout Studio.

### Workout Studio
- builder drag & drop
- target watt e durata per step
- blocchi anche sotto il minuto
- preset Recovery, Endurance, 2×15 controllato e Agilità
- bozza locale salva/ripristina
- massimo 50 step gestito sia UI sia API
- export vero `.fit` tramite Garmin FIT SDK
- copia su Edge 530 in `GARMIN/NewFiles`

## Privacy e robustezza

- FIT originali immutati
- dati personali extra locali
- accesso ai file FIT confinato al repository con controllo `realpath`/`path.relative`
- nessun backend cloud necessario
- Next.js + TypeScript
- GitHub Actions con build automatica

## Struttura

```text
garminactivities/
├── *.fit / cartelle FIT
├── web/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── .velolab/      # dati locali, ignorati da git
└── README.md
```

Il codice dell'app è in [`web/`](web/README.md).

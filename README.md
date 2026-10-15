# VeloLab 🚴

Un training lab locale costruito sopra i file FIT del mio Garmin: dashboard, analisi delle attività, power curve e Workout Studio con export `.fit` per Edge 530.

## Avvio rapido

```bash
git checkout feat/local-training-dashboard
cd web
npm install
npm run dev
```

Poi apri **http://localhost:3000**.

L'app legge direttamente i `.fit` presenti nel repository padre: i file originali restano intatti e non vengono caricati su servizi esterni.

## MVP attuale

- dashboard premium e responsive
- riepilogo 7/30 giorni
- archivio attività FIT
- dettaglio uscita con traccia GPS
- grafici potenza, frequenza cardiaca, cadenza e quota
- power curve 5s → 60m
- Workout Studio drag & drop
- target watt per blocco
- export FIT tramite SDK ufficiale Garmin
- flusso USB per `GARMIN/NewFiles`

Il codice dell'app è in [`web/`](web/README.md).

## Direzione

Il progetto è pensato come uno **Strava privato orientato all'allenamento**, non al social: confronto uscite, progressione, FTP storico, carico, salite, alimentazione/RPE e generazione del prossimo microciclo saranno i prossimi moduli.

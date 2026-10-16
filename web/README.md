# VeloLab — local Garmin training dashboard

Dashboard locale costruita sui file `.fit` del repository. Legge direttamente le attività Garmin, mostra metriche e serie temporali e include un Workout Studio che esporta workout `.fit` compatibili con Garmin.

## Avvio

```bash
cd web
npm install
npm run dev
```

Apri `http://localhost:3000`.

L'app cerca automaticamente i file `.fit` nel repository padre, quindi non devi spostarli o importarli.

## Funzioni MVP

- dashboard settimanale/mensile
- elenco attività FIT
- dettaglio attività con potenza, FC, cadenza, quota e traccia GPS
- power curve 5s / 30s / 1m / 5m / 10m / 20m / 60m
- Workout Studio drag & drop
- target di potenza per ogni blocco
- export workout con SDK FIT ufficiale Garmin

## Edge 530

Per il flusso USB: genera il workout dal Workout Studio, collega Edge 530 e copia il file `.fit` scaricato nella cartella `GARMIN/NewFiles` del dispositivo. Dopo lo scollegamento sicuro, il dispositivo importa il file.

## Struttura

Il codice web resta dentro `web/`; i file FIT originali rimangono immutati e rappresentano la fonte dati. La lettura è server-side e locale: nessuna attività viene caricata su servizi esterni dall'app.

## Note metriche

VeloLab privilegia i valori memorizzati dal dispositivo. Quando la Normalized Power non è presente nel FIT, viene calcolata una stima dai record di potenza. Le curve di potenza assumono campionamento circa 1 Hz, tipico delle attività Edge configurate con registrazione a 1 secondo.

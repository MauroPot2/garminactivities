# GarminActivities Connect IQ — Edge 530

Prima versione sperimentale di un Data Field fullscreen per Garmin Edge 530.

## Cosa mostra

- potenza corrente
- zona di potenza (7 zone)
- frequenza cardiaca
- cadenza
- velocità
- distanza
- tempo attività

La UI è disegnata direttamente con `Toybox.Graphics` e pensata per una pagina dati a campo singolo (fullscreen) sull'Edge 530.

## FTP

Per la prima prova l'FTP è impostata a `200 W` in:

`source/DashboardView.mc`

```monkeyc
const FTP = 200;
```

Modifica questo valore prima della build se vuoi zone coerenti con la tua FTP attuale.

## Requisiti macOS

1. Installa Garmin Connect IQ SDK Manager.
2. Installa un SDK Connect IQ compatibile.
3. Scarica il device Edge 530 nel SDK Manager.
4. Genera una developer key locale.

Non serve pubblicare nulla sul Connect IQ Store.

## Build da terminale

Dalla cartella `connectiq/`:

```bash
export PATH="$(connect-iq-sdk-manager sdk current-path --bin):$PATH"
monkeyc -d edge530 -f monkey.jungle -o bin/GarminActivities.prg -y /percorso/alla/developer_key.der
```

## Test nel simulatore

Avvia il simulatore:

```bash
simulator
```

Poi, in un altro terminale:

```bash
monkeydo bin/GarminActivities.prg edge530
```

## Test sul Garmin Edge 530 senza Connect IQ Store

1. Compila `GarminActivities.prg`.
2. Collega Edge 530 al Mac via USB.
3. Copia il file `.prg` nella cartella `GARMIN/APPS/` del dispositivo.
4. Espelli il Garmin in sicurezza e riavvialo se necessario.
5. Apri il profilo attività bici.
6. Aggiungi una nuova schermata dati con **1 campo**.
7. Seleziona il campo Connect IQ **GarminActivities**.

Il Data Field usa solo `Activity.Info`, quindi non richiede permessi aggiuntivi per questa V1.

# VeloLab

Applicazione locale per analizzare attività ciclistiche registrate in formato Garmin FIT. Il progetto conserva i file originali e utilizza un'interfaccia web per esplorare allenamenti, metriche e pianificazione delle uscite.

## Funzionalità

- Archivio delle attività e riepiloghi su periodi di 7 e 30 giorni
- Esplorazione della traccia GPS con grafici sincronizzati
- Analisi di potenza, frequenza cardiaca, cadenza, dislivello e altre misure disponibili nei FIT
- Curve di potenza, distribuzione delle zone e indicatori di carico allenante
- Confronto di due attività
- Profilo atleta e annotazioni nel Ride Journal
- Composizione ed esportazione di allenamenti FIT per dispositivi compatibili

Non tutte le attività contengono gli stessi campi: gli indicatori dipendono dai sensori e dalle informazioni effettivamente registrate.

## Stack

Next.js, React, TypeScript, Leaflet e Garmin FIT SDK. Il codice dell'interfaccia si trova in `web/`.

## Avvio locale

~~~bash
cd web
npm install
npm run dev
~~~

Aprire `http://localhost:3000`.

I file `.fit` presenti nel repository principale vengono letti come sorgenti dati. Impostazioni e note aggiuntive sono conservate localmente in `web/.velolab/`, cartella esclusa dal versionamento.

## Verifiche

~~~bash
cd web
npm run build
~~~

## Privacy e limiti

Le tracce FIT possono contenere dati sensibili, come posizione, orari e metriche fisiologiche: verificare con attenzione la visibilità del repository prima di condividerlo o pubblicarne gli archivi. VeloLab non richiede un backend cloud per l'analisi locale.

Le metriche derivate e i suggerimenti di allenamento sono strumenti di supporto, non valutazioni mediche o sostitutivi di un preparatore.

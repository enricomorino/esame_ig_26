## Scelte architetturali
- SPA con React Router v7, layout persistente con `NavBar` e area `main` (route: `/`, `/kb`, `/kb/:id`, `/ticket/new`), così da evitare ricariche e mantenere i contatori globali sempre visibili.
- Stato globale con Context + `useReducer` (`src/state/AppState.tsx`) per bookmark e ticket: riduce boilerplate rispetto a RTK, mantiene serializzabilità e purezza del reducer, e permette dispatch centralizzato da più pagine.
- API layer separato in `src/api/dummyjson.ts` con fetch nativo per lista, ricerca e dettaglio: isola gli endpoint, semplifica il mocking e evita duplicare query string nei componenti.
- Componenti riusabili (`NavBar`, `Pagination`, `ArticleCard`, `FormField`): evitano ripetizione di markup/stili, rendono le pagine più concentrate sulla logica (loading/error, form state, query state).
- Stili CSS modulari per pagina/componente con griglie responsivi: senza UI library per rispettare il vincolo e avere controllo su spacing/contrast; layout scuro uniforme per coerenza visiva.

## Scelte tecniche tra alternative
1. Stato globale: Context+`useReducer` vs Redux Toolkit. Scelto Context per semplicità e zero dipendenze aggiuntive; RTK avrebbe portato middleware e slice ma non necessario per due entità e un solo reducer.
2. Ricerca: cooldown sul pulsante (400 ms) dopo click vs debounce su onChange. Scelto cooldown per aderire al requisito di disabilitare il pulsante e avere controllo esplicito sul momento di invio; debounce onChange avrebbe fatto partire chiamate durante la digitazione e complicato la pagina corrente.
3. Stili: CSS modulare per file vs CSS-in-JS. Scelti file CSS separati per componenti/pagine per restare vicini a Vite vanilla, evitare runtime CSS-in-JS e mantenere chiara la separazione markup/stile; CSS-in-JS avrebbe dato theming dinamico ma con più overhead e dipendenze.

## Bug incontrato e fix
- Bug: layout centrato e spaziatura errata dovuti agli stili Vite di default (`#root` centrato, bottoni scuri). Fix: riscritti `App.css` e `index.css` rimuovendo gli stili di template e definendo layout personalizzato.

## Test manuali eseguiti
- Navigazione tramite NavBar tra Home, KB list, dettaglio e form ticket.
- Lista KB: caricamento iniziale, paginazione Prev/Next, indicatore pagina, gestione errore simulando offline, lista vuota dopo ricerca senza risultati.
- Ricerca KB: inserimento termine, click “Cerca” blocca il pulsante ~0.4s, caricamento risultati e reset pagina a 1.
- Bookmark: toggle da lista e dettaglio, contatori e sezione bookmark in Home aggiornati, link a dettaglio funzionante.
- Dettaglio articolo: recupero per id, pulsante Torna, aggiunta/rimozione bookmark.
- Form ticket: validazioni titoli <5/descrizioni <20/email invalida con messaggi, submit valido crea ticket, redirezione a Home con messaggio di successo e presenza del nuovo ticket in “Ultimi ticket”; campo articolo opzionale popolato dai bookmark.

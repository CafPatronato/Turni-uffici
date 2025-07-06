import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/daygrid/main.css";

export default function App() {
  const vincoliFissi = [
    "Orario: 09:00 - 13:00 e 14:00 - 18:00 dal lunedì al venerdì",
    "Alessandra sempre fissa a Corsico",
    "Giuseppe mercoledì e venerdì pomeriggio a Corsico",
    "Rossella mercoledì e venerdì pomeriggio a Cesano Boscone",
    "Giuseppe martedì e giovedì pomeriggio a Cesano Boscone",
    "Rossella martedì e giovedì pomeriggio a Corsico"
  ];

  const [vincoliVariabili, setVincoliVariabili] = useState([]);
  const [nuovoVincolo, setNuovoVincolo] = useState("");

  const [turni, setTurni] = useState([
    { giorno: "Lunedì", sede: "Corsico", orario: "09:00 - 13:00 / 14:00 - 18:00" },
    { giorno: "Martedì", sede: "Cesano Boscone", orario: "09:00 - 13:00 / 14:00 - 18:00" },
    { giorno: "Mercoledì", sede: "Corsico", orario: "09:00 - 13:00 / 14:00 - 18:00" },
    { giorno: "Giovedì", sede: "Corsico", orario: "09:00 - 13:00 / 14:00 - 18:00" },
    { giorno: "Venerdì", sede: "Corsico", orario: "09:00 - 13:00 / 14:00 - 18:00" }
  ]);

  const [criticita, setCriticita] = useState([
    "Lunedì non coperto",
    "Due giorni di seguito a Cesano Boscone",
    "Un solo giorno a Cesano Boscone"
  ]);

  const aggiungiVincolo = () => {
    if (nuovoVincolo.trim() !== "") {
      setVincoliVariabili([...vincoliVariabili, nuovoVincolo]);
      setNuovoVincolo("");
    }
  };

  const modificaTurno = (index, campo, valore) => {
    const nuoviTurni = [...turni];
    nuoviTurni[index][campo] = valore;
    setTurni(nuoviTurni);
  };

  const eventiCalendario = turni.map((turno) => {
    const giorni = {
      "Lunedì": 1,
      "Martedì": 2,
      "Mercoledì": 3,
      "Giovedì": 4,
      "Venerdì": 5
    };

    const giornoIndex = giorni[turno.giorno];
    const date = new Date();
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + giornoIndex));
    const startMorning = new Date(startOfWeek);
    startMorning.setHours(9, 0);
    const endMorning = new Date(startOfWeek);
    endMorning.setHours(13, 0);
    const startAfternoon = new Date(startOfWeek);
    startAfternoon.setHours(14, 0);
    const endAfternoon = new Date(startOfWeek);
    endAfternoon.setHours(18, 0);

    return [
      {
        title: `${turno.sede} - Mattina`,
        start: startMorning,
        end: endMorning,
        allDay: false
      },
      {
        title: `${turno.sede} - Pomeriggio`,
        start: startAfternoon,
        end: endAfternoon,
        allDay: false
      }
    ];
  }).flat();

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Planner Automatico</h1>
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          <h2>Vincoli Fissi</h2>
          <ul>{vincoliFissi.map((v, idx) => <li key={idx}>{v}</li>)}</ul>
          <h3 style={{ marginTop: "1rem" }}>Vincoli Variabili</h3>
          <ul>{vincoliVariabili.map((v, idx) => <li key={idx}>{v}</li>)}</ul>
          <input
            type="text"
            placeholder="Aggiungi un nuovo vincolo"
            value={nuovoVincolo}
            onChange={(e) => setNuovoVincolo(e.target.value)}
            style={{ padding: "0.5rem", width: "100%", marginTop: "1rem" }}
          />
          <button onClick={aggiungiVincolo} style={{ marginTop: "0.5rem" }}>
            Aggiungi vincolo
          </button>
        </div>
        <div>
          <h2>Calendario</h2>
          {turni.map((t, idx) => (
            <div key={idx} style={{ marginBottom: "1rem" }}>
              <strong>{t.giorno}:</strong>
              <div>
                <label>Sede:</label>
                <input
                  type="text"
                  value={t.sede}
                  onChange={(e) => modificaTurno(idx, "sede", e.target.value)}
                  style={{ marginLeft: "0.5rem", padding: "0.25rem" }}
                />
              </div>
              <div>
                <label>Orario:</label>
                <input
                  type="text"
                  value={t.orario}
                  onChange={(e) => modificaTurno(idx, "orario", e.target.value)}
                  style={{ marginLeft: "0.5rem", padding: "0.25rem" }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2>Criticità</h2>
          <ul>{criticita.map((c, idx) => <li key={idx}>{c}</li>)}</ul>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <h2>Visualizzazione Stile Google Calendar</h2>
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
          initialView="timeGridWeek"
          allDaySlot={false}
          slotMinTime="08:00:00"
          slotMaxTime="19:00:00"
          events={eventiCalendario}
          height="auto"
        />
      </div>
    </div>
  );
}

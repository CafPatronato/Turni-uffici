import { useState } from "react";

export default function App() {
  const [vincoli, setVincoli] = useState([
    "Mercoledì e Venerdì sempre a Corsico",
    "Mai due giorni consecutivi nella stessa sede",
    "Minimo 2 giorni a settimana in ciascuna sede",
  ]);

  const [turni, setTurni] = useState([
    { giorno: "Lunedì", sede: "", orario: "" },
    { giorno: "Martedì", sede: "Cesano Boscone", orario: "9:00 - 16:00" },
    { giorno: "Mercoledì", sede: "Corsico", orario: "9:00 - 16:00" },
    { giorno: "Giovedì", sede: "Corsico", orario: "9:00 - 16:00" },
    { giorno: "Venerdì", sede: "Corsico", orario: "9:00 - 16:00" },
    { giorno: "Sabato", sede: "", orario: "" },
  ]);

  const [criticita, setCriticita] = useState([
    "Lunedì non coperto",
    "Due giorni di seguito a Cesano Boscone",
    "Un solo giorno a Cesano Boscone",
  ]);

  const generaOrario = () => {
    alert("Funzione di generazione turni in sviluppo.");
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Planner Automatico</h1>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h2>Vincoli</h2>
          <ul>
            {vincoli.map((v, idx) => <li key={idx}>{v}</li>)}
          </ul>
        </div>
        <div>
          <h2>Calendario</h2>
          {turni.map((t, idx) => (
            <div key={idx} style={{ marginBottom: '0.5rem' }}>
              <strong>{t.giorno}:</strong> {t.sede} {t.orario}
            </div>
          ))}
          <button onClick={generaOrario} style={{ marginTop: '1rem' }}>
            Genera Orario
          </button>
        </div>
        <div>
          <h2>Criticità</h2>
          <ul>
            {criticita.map((c, idx) => <li key={idx}>{c}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

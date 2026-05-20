import { useEffect, useState } from "react";
import { getNextEvents, getPastEvents } from "../services/api";
import { LEAGUES } from "../utils/leagues";
import LeagueList from "../components/LeagueList";
import MatchList from "../components/MatchList";

function Matches() {
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES[0]);
  const [tab, setTab] = useState("next");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      setLoading(true);
      try {
        const data =
          tab === "next"
            ? await getNextEvents(selectedLeague.id)
            : await getPastEvents(selectedLeague.id);
        if (!cancelled) {
          setEvents(data);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEvents();
    return () => {
      cancelled = true;
    };
  }, [selectedLeague, tab]);

  return (
    <main className="page">
      <h1>Matcher</h1>

      <section className="section">
        <div className="section-head">
          <h2>{selectedLeague.name}</h2>
          <div className="section-controls">
            <LeagueList
              selectedLeague={selectedLeague}
              onSelectLeague={setSelectedLeague}
            />
            <div className="tabs">
              <button
                className={tab === "next" ? "tab tab--active" : "tab"}
                onClick={() => setTab("next")}
              >
                Kommande
              </button>
              <button
                className={tab === "past" ? "tab tab--active" : "tab"}
                onClick={() => setTab("past")}
              >
                Senaste
              </button>
            </div>
          </div>
        </div>

        {loading && <p className="muted">Hämtar matcher…</p>}

        {!loading && (
          <MatchList
            events={events}
            emptyMessage={
              tab === "next"
                ? "Inga kommande matcher."
                : "Inga tidigare matcher."
            }
          />
        )}
      </section>
    </main>
  );
}

export default Matches;
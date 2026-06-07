import { useEffect, useState } from "react";
import {
  getWorldCupMatches,
  getWorldCupStandings,
} from "../services/worldCupApi";

function TeamWithFlag({ team }) {
  return (
    <div className="team-with-flag">
      {team.crest && (
        <img
          src={team.crest}
          alt={team.name}
          width="24"
          height="24"
        />
      )}

      <span>{team.name}</span>
    </div>
  );
}

function WorldCup() {
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWorldCupData() {
      setLoading(true);
      setError("");

      try {
        const matchesData = await getWorldCupMatches();
        const standingsData = await getWorldCupStandings();

        setMatches(matchesData);
        setStandings(standingsData);
      } catch (error) {
        console.error(error);
        setError("Kunde inte hämta World Cup-data.");
      } finally {
        setLoading(false);
      }
    }

    loadWorldCupData();
  }, []);

  return (
    <main className="page">
      <h1>World Cup 2026</h1>

      {loading && <p className="muted">Hämtar World Cup-data…</p>}

      {error && <p className="muted">{error}</p>}

      {!loading && !error && (
        <>
          <section className="section">
            <h2>Grupper / tabeller</h2>

            {standings.length === 0 ? (
              <p className="muted">Ingen tabell-data tillgänglig ännu.</p>
            ) : (
              <div className="worldcup-grid">
                {standings.map((group) => (
                  <div key={group.group} className="worldcup-group">
                    <h3>{group.group}</h3>

                    <table className="standings">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Land</th>
                          <th>S</th>
                          <th>V</th>
                          <th>O</th>
                          <th>F</th>
                          <th>P</th>
                        </tr>
                      </thead>

                      <tbody>
                        {group.table.map((team) => (
                          <tr key={team.team.id}>
                            <td className="num">{team.position}</td>

                            <td className="team-cell">
                              <TeamWithFlag team={team.team} />
                            </td>

                            <td className="num">{team.playedGames}</td>
                            <td className="num">{team.won}</td>
                            <td className="num">{team.draw}</td>
                            <td className="num">{team.lost}</td>
                            <td className="num strong">{team.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="section">
            <h2>Matcher</h2>

            {matches.length === 0 ? (
              <p className="muted">Inga matcher tillgängliga ännu.</p>
            ) : (
              <div className="match-list">
                {matches.slice(0, 20).map((match) => (
                  <article key={match.id} className="match-card">
                    <p className="match-date">
                      {new Date(match.utcDate).toLocaleString("sv-SE")}
                    </p>

                    <div className="match-teams">
                      <TeamWithFlag team={match.homeTeam} />

                      <strong>
                        {match.score.fullTime.home ?? "-"} -{" "}
                        {match.score.fullTime.away ?? "-"}
                      </strong>

                      <TeamWithFlag team={match.awayTeam} />
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default WorldCup;
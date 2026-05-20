import { useEffect, useState } from "react";
import { getLeagueTable, searchTeams } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import { LEAGUES, DEFAULT_SEASON } from "../utils/leagues";
import LeagueList from "../components/LeagueList";
import TeamCard from "../components/TeamCard";

function Home() {
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES[0]);
  const [table, setTable] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState([]);
  const [searching, setSearching] = useState(false);

  const {
    isLeagueFavorite,
    isTeamFavorite,
    toggleLeague,
    toggleTeam,
  } = useFavorites();

  useEffect(() => {
    let cancelled = false;

    async function loadTable() {
      setLoadingTable(true);
      try {
        const data = await getLeagueTable(selectedLeague.id, DEFAULT_SEASON);
        if (!cancelled) {
          setTable(data);
        }
      } finally {
        if (!cancelled) {
          setLoadingTable(false);
        }
      }
    }

    loadTable();
    return () => {
      cancelled = true;
    };
  }, [selectedLeague]);

  async function handleSearch(event) {
    event.preventDefault();
    if (!search.trim()) return;
    setSearching(true);
    try {
      const result = await searchTeams(search);
      setTeams(result);
    } finally {
      setSearching(false);
    }
  }

  const leagueIsFav = isLeagueFavorite(selectedLeague.id);

  return (
    <main className="page">
      <h1>Football Match Tracker</h1>

      <section className="section">
        <div className="section-head">
          <h2>{selectedLeague.name}</h2>
          <div className="section-controls">
            <LeagueList
              selectedLeague={selectedLeague}
              onSelectLeague={setSelectedLeague}
            />
            <button
              className={`fav-btn ${leagueIsFav ? "fav-btn--active" : ""}`}
              onClick={() => toggleLeague(selectedLeague.id)}
              aria-label={leagueIsFav ? "Ta bort favoritliga" : "Favorisera liga"}
            >
              {leagueIsFav ? "★" : "☆"}
            </button>
          </div>
        </div>

        {loadingTable && <p className="muted">Hämtar tabell…</p>}

        {!loadingTable && table.length === 0 && (
          <p className="muted">Ingen tabelldata tillgänglig.</p>
        )}

        {!loadingTable && table.length > 0 && (
          <table className="standings">
            <thead>
              <tr>
                <th>#</th>
                <th>Lag</th>
                <th>S</th>
                <th>V</th>
                <th>O</th>
                <th>F</th>
                <th>P</th>
                <th aria-label="Favorit"></th>
              </tr>
            </thead>
            <tbody>
              {table.map((team) => (
                <tr key={team.idTeam}>
                  <td className="num">{team.intRank}</td>
                  <td className="team-cell">
                    {team.strBadge && (
                      <img
                        src={team.strBadge}
                        alt=""
                        width="22"
                        height="22"
                      />
                    )}
                    <span>{team.strTeam}</span>
                  </td>
                  <td className="num">{team.intPlayed}</td>
                  <td className="num">{team.intWin}</td>
                  <td className="num">{team.intDraw}</td>
                  <td className="num">{team.intLoss}</td>
                  <td className="num strong">{team.intPoints}</td>
                  <td>
                    <button
                      className={`fav-btn ${
                        isTeamFavorite(team.idTeam) ? "fav-btn--active" : ""
                      }`}
                      onClick={() => toggleTeam(team.idTeam)}
                      aria-label={`Favorisera ${team.strTeam}`}
                    >
                      {isTeamFavorite(team.idTeam) ? "★" : "☆"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="section">
        <h2>Sök lag</h2>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Sök efter lag..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit" disabled={searching}>
            {searching ? "Söker…" : "Sök"}
          </button>
        </form>

        {teams.length > 0 && (
          <div className="team-grid">
            {teams.map((team) => (
              <TeamCard key={team.idTeam} team={team} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
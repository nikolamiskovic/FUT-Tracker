import { useEffect, useState } from "react";
import {
  getLeagueTable,
  getTeamsByLeague,
  searchPlayers,
} from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import { LEAGUES, DEFAULT_SEASON } from "../utils/leagues";
import LeagueList from "../components/LeagueList";
import TeamCard from "../components/TeamCard";
import PlayerCard from "../components/PlayerCard";

function Home() {
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES[0]);
  const [table, setTable] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [leagueTeams, setLeagueTeams] = useState([]);
  const [searching, setSearching] = useState(false);

  const { isLeagueFavorite, isTeamFavorite, toggleLeague, toggleTeam } =
    useFavorites();

  useEffect(() => {
    let cancelled = false;

    async function loadLeagueData() {
      setLoadingTable(true);

      try {
        const tableData = await getLeagueTable(
          selectedLeague.id,
          DEFAULT_SEASON
        );

        const teamsData = await getTeamsByLeague(selectedLeague.apiName);

        if (!cancelled) {
          setTable(tableData);
          setLeagueTeams(teamsData);
          setTeams([]);
          setPlayers([]);
          setSearch("");
        }
      } catch (error) {
        console.error("Kunde inte hämta ligadata:", error);

        if (!cancelled) {
          setTable([]);
          setLeagueTeams([]);
          setTeams([]);
          setPlayers([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingTable(false);
        }
      }
    }

    loadLeagueData();

    return () => {
      cancelled = true;
    };
  }, [selectedLeague]);

  async function handleSearch(event) {
    event.preventDefault();

    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      setTeams([]);
      setPlayers([]);
      return;
    }

    setSearching(true);

    try {
      const filteredTeams = table.filter((team) =>
        team.strTeam?.toLowerCase().includes(searchValue)
      );

      const playerResults = await searchPlayers(search);

      const footballPlayers = playerResults.filter(
        (player) => player.strSport === "Soccer"
      );

      setTeams(filteredTeams);
      setPlayers(footballPlayers);
    } catch (error) {
      console.error("Kunde inte söka:", error);
      setPlayers([]);
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
              type="button"
              className={`fav-btn ${leagueIsFav ? "fav-btn--active" : ""}`}
              onClick={() => toggleLeague(selectedLeague.id)}
              aria-label={
                leagueIsFav ? "Ta bort favoritliga" : "Favorisera liga"
              }
            >
              {leagueIsFav ? "★" : "☆"}
            </button>
          </div>
        </div>

        {loadingTable && <p className="muted">Hämtar ligadata…</p>}

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
                <tr key={team.idTeam || team.strTeam}>
                  <td className="num">{team.intRank}</td>

                  <td className="team-cell">
                    {(team.strBadge || team.strTeamBadge) && (
                      <img
                        src={team.strBadge || team.strTeamBadge}
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
                      type="button"
                      className={`fav-btn ${
                        isTeamFavorite(team.idTeam) ? "fav-btn--active" : ""
                      }`}
                      onClick={() => toggleTeam(team)}
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
        <h2>Sök lag eller spelare</h2>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Sök efter lag eller spelare..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button type="submit" disabled={searching}>
            {searching ? "Söker…" : "Sök"}
          </button>
        </form>

        {teams.length > 0 && (
          <>
            <h3>Lag</h3>
            <div className="team-grid">
              {teams.map((team) => (
                <TeamCard key={team.idTeam || team.strTeam} team={team} />
              ))}
            </div>
          </>
        )}

        {players.length > 0 && (
          <>
            <h3>Spelare</h3>
            <div className="team-grid">
              {players.map((player) => (
                <PlayerCard key={player.idPlayer} player={player} />
              ))}
            </div>
          </>
        )}

        {!searching &&
          search.trim() &&
          teams.length === 0 &&
          players.length === 0 && (
            <p className="muted">Inga lag eller spelare hittades.</p>
          )}
      </section>
    </main>
  );
}

export default Home;
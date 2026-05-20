import { useEffect, useState } from "react";
import { getLeagueTable, searchTeams } from "../services/api";
import TeamCard from "../components/TeamCard";

const LEAGUES = [
  { id: "4328", name: "Premier League" },
  { id: "4335", name: "La Liga" },
  { id: "4331", name: "Bundesliga" },
  { id: "4332", name: "Serie A" },
  { id: "4334", name: "Ligue 1" },
];

function Home() {
  const [selectedLeague, setSelectedLeague] = useState(LEAGUES[0]);
  const [table, setTable] = useState([]);
  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function loadTable() {
      const data = await getLeagueTable(selectedLeague.id, "2024-2025");
      setTable(data);
    }

    loadTable();
  }, [selectedLeague]);

  async function handleSearch(event) {
    event.preventDefault();

    const result = await searchTeams(search);
    setTeams(result);
  }

  return (
    <main>
      <h1>Football Match Tracker</h1>

      <section>
        <h2>Välj liga</h2>

        {LEAGUES.map((league) => (
          <button
            key={league.id}
            onClick={() => setSelectedLeague(league)}
          >
            {league.name}
          </button>
        ))}
      </section>

      <section>
        <h2>{selectedLeague.name} Table</h2>

        <table>
          <thead>
            <tr>
              <th>Placering</th>
              <th>Lag</th>
              <th>Matcher</th>
              <th>Vinster</th>
              <th>Oavgjorda</th>
              <th>Förluster</th>
              <th>Poäng</th>
            </tr>
          </thead>

          <tbody>
            {table.map((team) => (
              <tr key={team.idTeam}>
                <td>{team.intRank}</td>
                <td>{team.strTeam}</td>
                <td>{team.intPlayed}</td>
                <td>{team.intWin}</td>
                <td>{team.intDraw}</td>
                <td>{team.intLoss}</td>
                <td>{team.intPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Sök lag</h2>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Sök efter lag..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <button type="submit">Sök</button>
        </form>

        {teams.map((team) => (
          <TeamCard key={team.idTeam} team={team} />
        ))}
      </section>
    </main>
  );
}

export default Home;
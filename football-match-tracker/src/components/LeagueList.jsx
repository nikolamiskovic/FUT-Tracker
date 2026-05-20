import { LEAGUES } from "../utils/leagues";

function LeagueList({ selectedLeague, onSelectLeague }) {
  function handleChange(event) {
    const league = LEAGUES.find((l) => l.id === event.target.value);
    if (league) {
      onSelectLeague(league);
    }
  }

  return (
    <select
      className="league-select"
      value={selectedLeague.id}
      onChange={handleChange}
    >
      {LEAGUES.map((league) => (
        <option key={league.id} value={league.id}>
          {league.name}
        </option>
      ))}
    </select>
  );
}

export default LeagueList;
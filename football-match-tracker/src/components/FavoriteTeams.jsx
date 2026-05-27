import { useFavorites } from "../context/FavoritesContext";
import TeamCard from "./TeamCard";

function FavoriteTeams() {
  const { favoriteTeams } = useFavorites();

  if (favoriteTeams.length === 0) {
    return <p className="muted">Inga favoritlag ännu.</p>;
  }

  return (
    <div className="team-grid">
      {favoriteTeams.map((team) => (
        <TeamCard key={team.idTeam} team={team} />
      ))}
    </div>
  );
}

export default FavoriteTeams;
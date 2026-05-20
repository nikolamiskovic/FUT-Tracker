import { useFavorites } from "../context/FavoritesContext";

function TeamCard({ team }) {
  const { isTeamFavorite, toggleTeam } = useFavorites();
  const isFavorite = isTeamFavorite(team.idTeam);

  function handleFavoriteClick() {
    toggleTeam(team.idTeam);
  }

  return (
    <div className="team-card">
      <button
        className={`fav-btn ${isFavorite ? "fav-btn--active" : ""}`}
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? "Ta bort favorit" : "Lägg till favorit"}
      >
        {isFavorite ? "★" : "☆"}
      </button>
      {team.strTeamBadge ? (
        <img
          src={team.strTeamBadge}
          alt={team.strTeam}
          width="100"
          height="100"
        />
      ) : (
        <div className="team-card-placeholder" />
      )}
      <h3>{team.strTeam}</h3>
      <p>{team.strLeague}</p>
      <p>{team.strCountry}</p>
    </div>
  );
}

export default TeamCard;
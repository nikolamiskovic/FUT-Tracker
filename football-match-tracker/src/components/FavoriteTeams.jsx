import { useEffect, useState } from "react";
import { getTeam } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import TeamCard from "./TeamCard";

function FavoriteTeams() {
  const { favoriteTeams } = useFavorites();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadTeams() {
      if (favoriteTeams.length === 0) {
        setTeams([]);
        return;
      }
      setLoading(true);
      try {
        const results = await Promise.all(
          favoriteTeams.map((id) => getTeam(id))
        );
        if (!cancelled) {
          setTeams(results.filter(Boolean));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTeams();
    return () => {
      cancelled = true;
    };
  }, [favoriteTeams]);

  if (favoriteTeams.length === 0) {
    return <p className="muted">Inga favoritlag ännu.</p>;
  }

  if (loading) {
    return <p className="muted">Laddar lag…</p>;
  }

  return (
    <div className="team-grid">
      {teams.map((team) => (
        <TeamCard key={team.idTeam} team={team} />
      ))}
    </div>
  );
}

export default FavoriteTeams;
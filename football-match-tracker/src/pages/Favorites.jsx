import { useEffect, useState } from "react";
import { getLeague } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import FavoriteTeams from "../components/FavoriteTeams";

function Favorites() {
  const { favoriteLeagues, toggleLeague } = useFavorites();
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadLeagues() {
      if (favoriteLeagues.length === 0) {
        setLeagues([]);
        return;
      }
      setLoading(true);
      try {
        const results = await Promise.all(
          favoriteLeagues.map((id) => getLeague(id))
        );
        if (!cancelled) {
          setLeagues(results.filter(Boolean));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadLeagues();
    return () => {
      cancelled = true;
    };
  }, [favoriteLeagues]);

  const hasAnyFavorites =
    favoriteLeagues.length > 0 || leagues.length > 0;

  return (
    <main className="page">
      <h1>Favoriter</h1>

      {!hasAnyFavorites && favoriteLeagues.length === 0 && (
        <p className="muted">
          Du har inga favoriter ännu. Tryck på stjärnan vid en liga eller ett
          lag för att spara det här.
        </p>
      )}

      <section className="section">
        <h2>Ligor</h2>
        {favoriteLeagues.length === 0 ? (
          <p className="muted">Inga favoritligor ännu.</p>
        ) : loading ? (
          <p className="muted">Laddar ligor…</p>
        ) : (
          <ul className="favorite-leagues">
            {leagues.map((league) => (
              <li key={league.idLeague} className="favorite-league-row">
                {league.strBadge && (
                  <img
                    src={league.strBadge}
                    alt=""
                    width="32"
                    height="32"
                  />
                )}
                <span>{league.strLeague}</span>
                <button
                  className="fav-btn fav-btn--active"
                  onClick={() => toggleLeague(league.idLeague)}
                  aria-label="Ta bort favoritliga"
                >
                  ★
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="section">
        <h2>Lag</h2>
        <FavoriteTeams />
      </section>
    </main>
  );
}

export default Favorites;
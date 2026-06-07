import { createContext, useContext, useEffect, useState } from "react";

const LEAGUES_KEY = "fut.favorites.leagues";
const TEAMS_KEY = "fut.favorites.teams";

function readFromStorage(key) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoriteLeagues, setFavoriteLeagues] = useState(() =>
    readFromStorage(LEAGUES_KEY)
  );

  const [favoriteTeams, setFavoriteTeams] = useState(() =>
    readFromStorage(TEAMS_KEY)
  );

  useEffect(() => {
    localStorage.setItem(LEAGUES_KEY, JSON.stringify(favoriteLeagues));
  }, [favoriteLeagues]);

  useEffect(() => {
    localStorage.setItem(TEAMS_KEY, JSON.stringify(favoriteTeams));
  }, [favoriteTeams]);

  function toggleLeague(leagueId) {
    setFavoriteLeagues((prev) =>
      prev.includes(leagueId)
        ? prev.filter((id) => id !== leagueId)
        : [...prev, leagueId]
    );
  }

  function toggleTeam(team) {
    setFavoriteTeams((prev) =>
      prev.some((savedTeam) => savedTeam.idTeam === team.idTeam)
        ? prev.filter((savedTeam) => savedTeam.idTeam !== team.idTeam)
        : [...prev, team]
    );
  }

  const value = {
    favoriteLeagues,
    favoriteTeams,
    isLeagueFavorite: (id) => favoriteLeagues.includes(id),
    isTeamFavorite: (id) =>
      favoriteTeams.some((team) => team.idTeam === id),
    toggleLeague,
    toggleTeam,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites måste användas inuti FavoritesProvider");
  }

  return context;
}
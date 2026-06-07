import { cachedFetch } from "../utils/cache";

const BASE = "https://www.thesportsdb.com/api/v1/json/3";

async function fetchJson(path) {
  const response = await fetch(`${BASE}${path}`);

  if (!response.ok) {
    throw new Error(`API-fel: ${response.status}`);
  }

  return response.json();
}

export async function getLeagueTable(leagueId, season) {
  return cachedFetch(
    `table-${leagueId}-${season}`,
    async () => {
      const data = await fetchJson(
        `/lookuptable.php?l=${leagueId}&s=${season}`
      );

      return data.table ?? [];
    },
    10 * 60 * 1000
  );
}

export async function getTeamsByLeague(leagueName) {
  return cachedFetch(
    `teams-${leagueName}`,
    async () => {
      const data = await fetchJson(
        `/search_all_teams.php?l=${encodeURIComponent(leagueName)}`
      );

      return data.teams ?? [];
    },
    10 * 60 * 1000
  );
}

export async function getNextEvents(leagueId) {
  return cachedFetch(
    `next-${leagueId}`,
    async () => {
      const data = await fetchJson(`/eventsnextleague.php?id=${leagueId}`);
      return data.events ?? [];
    },
    2 * 60 * 1000
  );
}

export async function getPastEvents(leagueId) {
  return cachedFetch(
    `past-${leagueId}`,
    async () => {
      const data = await fetchJson(`/eventspastleague.php?id=${leagueId}`);
      return data.events ?? [];
    },
    2 * 60 * 1000
  );
}

export async function getLeague(leagueId) {
  return cachedFetch(
    `league-${leagueId}`,
    async () => {
      const data = await fetchJson(`/lookupleague.php?id=${leagueId}`);
      return data.leagues?.[0] ?? null;
    },
    10 * 60 * 1000
  );
}

export async function searchPlayers(playerName) {
  if (!playerName.trim()) return [];

  return cachedFetch(
    `players-${playerName.toLowerCase()}`,
    async () => {
      const data = await fetchJson(
        `/searchplayers.php?p=${encodeURIComponent(playerName)}`
      );

      return data.player ?? [];
    },
    10 * 60 * 1000
  );
}
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
  return cachedFetch(`table-${leagueId}-${season}`, async () => {
    const data = await fetchJson(`/lookuptable.php?l=${leagueId}&s=${season}`);
    return data.table ?? [];
  });
}

export async function searchTeams(query) {
  if (!query.trim()) return [];
  return cachedFetch(`search-${query.toLowerCase()}`, async () => {
    const data = await fetchJson(`/searchteams.php?t=${encodeURIComponent(query)}`);
    return data.teams ?? [];
  });
}

export async function getNextEvents(leagueId) {
  return cachedFetch(`next-${leagueId}`, async () => {
    const data = await fetchJson(`/eventsnextleague.php?id=${leagueId}`);
    return data.events ?? [];
  }, 2 * 60 * 1000);
}

export async function getPastEvents(leagueId) {
  return cachedFetch(`past-${leagueId}`, async () => {
    const data = await fetchJson(`/eventspastleague.php?id=${leagueId}`);
    return data.events ?? [];
  }, 2 * 60 * 1000);
}

export async function getTeam(teamId) {
  return cachedFetch(`team-${teamId}`, async () => {
    const data = await fetchJson(`/lookupteam.php?id=${teamId}`);
    return data.teams?.[0] ?? null;
  });
}

export async function getLeague(leagueId) {
  return cachedFetch(`league-${leagueId}`, async () => {
    const data = await fetchJson(`/lookupleague.php?id=${leagueId}`);
    return data.leagues?.[0] ?? null;
  });
}
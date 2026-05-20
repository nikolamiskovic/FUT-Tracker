const BASE = "https://www.thesportsdb.com/api/v1/json/3";

async function fetchJson(path) {
  const response = await fetch(`${BASE}${path}`);
  if (!response.ok) {
    throw new Error(`API-fel: ${response.status}`);
  }
  return response.json();
}

// Hämta ligatabell för en specifik säsong
export async function getLeagueTable(leagueId, season) {
  const data = await fetchJson(`/lookuptable.php?l=${leagueId}&s=${season}`);
  return data.table ?? [];
}

// Sök efter lag på namn
export async function searchTeams(query) {
  if (!query.trim()) return [];
  const data = await fetchJson(`/searchteams.php?t=${encodeURIComponent(query)}`);
  return data.teams ?? [];
}

// Kommande matcher i en liga (max 15)
export async function getNextEvents(leagueId) {
  const data = await fetchJson(`/eventsnextleague.php?id=${leagueId}`);
  return data.events ?? [];
}

// Senaste matcher i en liga (max 15)
export async function getPastEvents(leagueId) {
  const data = await fetchJson(`/eventspastleague.php?id=${leagueId}`);
  return data.events ?? [];
}

// Hämta detaljer för ett specifikt lag
export async function getTeam(teamId) {
  const data = await fetchJson(`/lookupteam.php?id=${teamId}`);
  return data.teams?.[0] ?? null;
}

// Hämta detaljer för en specifik liga
export async function getLeague(leagueId) {
  const data = await fetchJson(`/lookupleague.php?id=${leagueId}`);
  return data.leagues?.[0] ?? null;
}
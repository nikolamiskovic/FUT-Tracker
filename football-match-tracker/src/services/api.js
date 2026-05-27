import { cachedFetch } from "../utils/cache";

const BASE = "https://www.thesportsdb.com/api/v1/json/3";

const TOP_LEAGUES = [
  "English Premier League",
  "Spanish La Liga",
  "German Bundesliga",
  "Italian Serie A",
  "French Ligue 1",
];

async function fetchJson(path) {
  const response = await fetch(`${BASE}${path}`);

  if (!response.ok) {
    throw new Error(`API-fel: ${response.status}`);
  }

  return response.json();
}

// Cachar ALLA topplag i 10 minuter
async function getAllTopLeagueTeams() {
  return cachedFetch(
    "all-top-league-teams",
    async () => {
      let allTeams = [];

      for (const league of TOP_LEAGUES) {
        const data = await fetchJson(
          `/search_all_teams.php?l=${encodeURIComponent(league)}`
        );

        allTeams = [...allTeams, ...(data.teams ?? [])];
      }

      return allTeams;
    },
    10 * 60 * 1000
  );
}

export async function getLeagueTable(leagueId, season) {
  return cachedFetch(`table-${leagueId}-${season}`, async () => {
    const data = await fetchJson(
      `/lookuptable.php?l=${leagueId}&s=${season}`
    );

    return data.table ?? [];
  });
}

export async function searchTeams(query) {
  if (!query.trim()) return [];

  const normalizedQuery = query.trim().toLowerCase();

  const allTeams = await getAllTopLeagueTeams();

  return allTeams.filter((team) =>
    team.strTeam.toLowerCase().includes(normalizedQuery)
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
      const data = await fetchJson(
        `/eventsnextleague.php?id=${leagueId}`
      );

      return data.events ?? [];
    },
    2 * 60 * 1000
  );
}

export async function getPastEvents(leagueId) {
  return cachedFetch(
    `past-${leagueId}`,
    async () => {
      const data = await fetchJson(
        `/eventspastleague.php?id=${leagueId}`
      );

      return data.events ?? [];
    },
    2 * 60 * 1000
  );
}

export async function getTeam(teamId) {
  return cachedFetch(`team-fixed-${teamId}`, async () => {
    const allTeams = await getAllTopLeagueTeams();

    return (
      allTeams.find((team) => team.idTeam === teamId) ?? null
    );
  });
}

export async function getLeague(leagueId) {
  return cachedFetch(`league-${leagueId}`, async () => {
    const data = await fetchJson(
      `/lookupleague.php?id=${leagueId}`
    );

    return data.leagues?.[0] ?? null;
  });
}
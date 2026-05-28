import { cachedFetch } from "../utils/cache";

const BASE = "/api/football-data";

async function fetchWorldCup(path) {
  const response = await fetch(`${BASE}${path}`);

  if (!response.ok) {
    throw new Error(`Football Data API error: ${response.status}`);
  }

  return response.json();
}

export async function getWorldCupMatches() {
  return cachedFetch(
    "worldcup-matches",
    async () => {
      const data = await fetchWorldCup("/competitions/WC/matches");
      return data.matches ?? [];
    },
    10 * 60 * 1000
  );
}

export async function getWorldCupStandings() {
  return cachedFetch(
    "worldcup-standings",
    async () => {
      const data = await fetchWorldCup("/competitions/WC/standings");
      return data.standings ?? [];
    },
    10 * 60 * 1000
  );
}
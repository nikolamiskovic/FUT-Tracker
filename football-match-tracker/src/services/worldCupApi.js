const BASE = "/api/football-data";

async function fetchWorldCup(path) {
  const response = await fetch(`${BASE}${path}`);

  if (!response.ok) {
    throw new Error(`Football Data API error: ${response.status}`);
  }

  return response.json();
}

export async function getWorldCupMatches() {
  const data = await fetchWorldCup("/competitions/WC/matches");
  return data.matches ?? [];
}

export async function getWorldCupStandings() {
  const data = await fetchWorldCup("/competitions/WC/standings");
  return data.standings ?? [];
}
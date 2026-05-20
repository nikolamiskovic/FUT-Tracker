const BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";

// Sök efter ett lag
export async function searchTeams(teamName) {
  const response = await fetch(`${BASE_URL}/searchteams.php?t=${teamName}`);
  const data = await response.json();

  return data.teams || [];
}

// Hämta alla lag i en liga
export async function getTeamsByLeague(leagueName) {
  const response = await fetch(
    `${BASE_URL}/search_all_teams.php?l=${leagueName}`
  );
  const data = await response.json();

  return data.teams || [];
}

// Hämta ligatabell
export async function getLeagueTable(leagueId, season) {
  const response = await fetch(
    `${BASE_URL}/lookuptable.php?l=${leagueId}&s=${season}`
  );
  const data = await response.json();

  return data.table || [];
}

// Hämta kommande matcher i en liga
export async function getNextMatchesByLeague(leagueId) {
  const response = await fetch(
    `${BASE_URL}/eventsnextleague.php?id=${leagueId}`
  );
  const data = await response.json();

  return data.events || [];
}

// Hämta tidigare matcher i en liga
export async function getPastMatchesByLeague(leagueId) {
  const response = await fetch(
    `${BASE_URL}/eventspastleague.php?id=${leagueId}`
  );
  const data = await response.json();

  return data.events || [];
}

// Hämta detaljer om ett lag via id
export async function getTeamDetails(teamId) {
  const response = await fetch(`${BASE_URL}/lookupteam.php?id=${teamId}`);
  const data = await response.json();

  return data.teams ? data.teams[0] : null;
}

// Hämta kommande matcher för ett specifikt lag
export async function getNextMatchesByTeam(teamId) {
  const response = await fetch(`${BASE_URL}/eventsnext.php?id=${teamId}`);
  const data = await response.json();

  return data.events || [];
}

// Hämta tidigare matcher för ett specifikt lag
export async function getPastMatchesByTeam(teamId) {
  const response = await fetch(`${BASE_URL}/eventslast.php?id=${teamId}`);
  const data = await response.json();

  return data.results || [];
}

// Sök efter liga
export async function searchLeague(leagueName) {
  const response = await fetch(`${BASE_URL}/search_all_leagues.php?s=Soccer`);
  const data = await response.json();

  const leagues = data.countries || [];

  return leagues.filter((league) =>
    league.strLeague.toLowerCase().includes(leagueName.toLowerCase())
  );
}
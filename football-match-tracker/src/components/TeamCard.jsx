function TeamCard({ team }) {
    return (
      <div className="team-card">
        <img
          src={team.strTeamBadge}
          alt={team.strTeam}
          width="100"
        />
  
        <h2>{team.strTeam}</h2>
  
        <p>{team.strLeague}</p>
  
        <p>{team.strCountry}</p>
      </div>
    );
  }
  
  export default TeamCard;
function formatMatchDate(dateString, timeString) {
    if (!dateString) return "";
    const time = timeString ?? "00:00:00";
    const date = new Date(`${dateString}T${time}`);
    return date.toLocaleString("sv-SE", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  
  function MatchCard({ event }) {
    const isPlayed =
      event.intHomeScore !== null && event.intHomeScore !== undefined;
  
    return (
      <article className="match-card">
        <div className="match-date">
          {formatMatchDate(event.dateEvent, event.strTime)}
        </div>
        <div className="match-teams">
          <div className="match-side">
            {event.strHomeTeamBadge && (
              <img
                src={event.strHomeTeamBadge}
                alt={event.strHomeTeam}
                width="28"
                height="28"
              />
            )}
            <span>{event.strHomeTeam}</span>
          </div>
          <div className="match-score">
            {isPlayed
              ? `${event.intHomeScore} – ${event.intAwayScore}`
              : "vs"}
          </div>
          <div className="match-side match-side--away">
            <span>{event.strAwayTeam}</span>
            {event.strAwayTeamBadge && (
              <img
                src={event.strAwayTeamBadge}
                alt={event.strAwayTeam}
                width="28"
                height="28"
              />
            )}
          </div>
        </div>
      </article>
    );
  }
  
  function MatchList({ events, emptyMessage = "Inga matcher att visa." }) {
    if (!events || events.length === 0) {
      return <p className="muted">{emptyMessage}</p>;
    }
  
    return (
      <div className="match-list">
        {events.map((event) => (
          <MatchCard key={event.idEvent} event={event} />
        ))}
      </div>
    );
  }
  
  export default MatchList;
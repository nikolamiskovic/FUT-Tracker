import { useState } from "react";

function PlayerCard({ player }) {
  const [imageError, setImageError] = useState(false);

  return (
<div className="team-card player-card">      {!imageError && player.strCutout && (
        <img
          src={player.strCutout}
          alt={player.strPlayer}
          onError={() => setImageError(true)}
        />
      )}

      <h3>{player.strPlayer}</h3>

      <p>{player.strTeam}</p>

      <p>{player.strNationality}</p>

      <p>{player.strPosition}</p>
    </div>
  );
}

export default PlayerCard;
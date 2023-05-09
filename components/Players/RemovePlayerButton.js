import React from "react";
import useRemovePlayer from "@/hooks/useRemovePlayer";

const RemovePlayerButton = ({ playerId }) => {
  const { removePlayerFromTeam } = useRemovePlayer();

  const handleRemovePlayer = () => {
    removePlayerFromTeam(playerId);
  };

  return (
    <button onClick={handleRemovePlayer} className="remove-player-button">
      Remove Player
    </button>
  );
};

export default RemovePlayerButton;
import React from "react";
import useDraftActions from "../hooks/useDraftAction"

const LiveActionBox = () => {
  const { draftActions, loading, error } = useDraftActions();

  return (
    <div>
      <h2>Live Draft Actions</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {draftActions.map((action, index) => (
          <li key={index}>
            {action.drafter} drafted {action.playerName} at {action.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveActionBox;
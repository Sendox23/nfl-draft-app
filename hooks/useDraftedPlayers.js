import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off, set } from "firebase/database";

export const useDraftedPlayers = () => {
  const [draftedPlayers, setDraftedPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const draftedPlayersRef = ref(db, "drafted_players");
    const unsubscribe = onValue(
      draftedPlayersRef,
      (snapshot) => {
        const players = snapshot.val() ? Object.values(snapshot.val()) : [];
        setDraftedPlayers(players);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );
  
    return () => {
      off(draftedPlayersRef, "value", unsubscribe);
    };
  }, []);
  
  const addDraftedPlayer = async (player) => {
    const db = getDatabase();
    try {
      await set(ref(db, `drafted_players/${player.PlayerID}`), player);
    } catch (err) {
      setError(err);
    }
  };

  return { draftedPlayers, loading, error, addDraftedPlayer };
};
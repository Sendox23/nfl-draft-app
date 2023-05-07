import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { database } from "../api/firebase";
import { getDatabase, ref, set, onValue, off } from "firebase/database";
import { useDraftedPlayers } from "./useDraftedPlayers";

export const useUserTeam = () => {
  const { user } = useAuth();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { draftedPlayers, addDraftedPlayer } = useDraftedPlayers();

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const teamRef = ref(database, `teams/${user.uid}`);
        const snapshot = await onValue(teamRef, (snapshot) => {
          if (snapshot.exists()) {
            setTeam(snapshot.val().players || []);
          } else {
            set(ref(database, `teams/${user.uid}/players`), []);
          }
          setLoading(false);
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const addPlayerToTeam = async (player) => {
    const db = getDatabase();
    try {
      await set(ref(db, `users/${user.uid}/team/${player.PlayerID}`), player);
      setTeam((prevTeam) => [...prevTeam, player]);
      addDraftedPlayer(player.PlayerID);
    } catch (err) {
      setError(err);
    }
  };

  return { team, loading, error, addPlayerToTeam };
};

export default useUserTeam;

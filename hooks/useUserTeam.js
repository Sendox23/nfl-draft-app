import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off, set,push } from "firebase/database";
import { useAuth } from "./useAuth";

const useUserTeam = (uid) => {
  const { user } = useAuth();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const fetchData = async () => {
      try {
        const targetUid = uid || user.uid;
        const userTeamRef = ref(db, `user_teams/${targetUid}`);
        const unsubscribe = onValue(
          userTeamRef,
          (snapshot) => {
            const players = snapshot.val() ? Object.values(snapshot.val()) : [];
            setTeam(players);
            setLoading(false);
          },
          (error) => {
            setError(error);
            setLoading(false);
          }
        );

        return () => {
          off(userTeamRef, "value", unsubscribe);
        };
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, uid]);
  
  const addPlayerToTeam = async (player) => {
    const db = getDatabase();
    try {
      await set(ref(db, `user_teams/${user.uid}/${player.PlayerID}`), player);
      // Add the draft action entry
      const draftAction = {
        playerName: player.Name,
        drafter: user.displayName,
        timestamp: new Date().toISOString(),
      };
      // Use push() to generate a unique key based on the timestamp
      await set(push(ref(db, `draft_actions`)), draftAction);
      setTeam((prevState) => [...prevState, player]);
    } catch (error) {
      setError(error.message);
    }
  };

  return { team, loading, error, addPlayerToTeam };
};

export default useUserTeam;
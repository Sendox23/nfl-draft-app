import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

const useUserTeam = (uid) => {
  const { user } = useAuth();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const targetUid = uid || user.uid;
        const response = await fetch(`/api/my-team/${targetUid}`);
        if (!response.ok) {
          throw new Error("Error fetching user's team data");
        }
        const data = await response.json();
        setTeam(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, uid]);

  const addPlayerToTeam = async (player) => {
    try {
      const response = await fetch(`/api/my-team/${user.uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(player),
      });
      if (!response.ok) {
        throw new Error("Error adding player to user's team");
      }
      setTeam((prevState) => [...prevState, player]);
    } catch (error) {
      setError(error.message);
    }
  };

  return { team, loading, error, addPlayerToTeam };
};

export default useUserTeam;
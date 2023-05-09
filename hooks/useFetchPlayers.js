import { useState, useEffect } from "react";

const useFetchPlayers = (playerIds) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `https://api.sportsdata.io/v3/nfl/scores/json/Players?key=${process.env.NEXT_PUBLIC_FOOTBALL_API_KEY}`;

        if (playerIds && playerIds.length > 0) {
          apiUrl += `&ids=${playerIds.join(",")}`;
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Error fetching players data");
        }
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [playerIds]);

  return { players, loading, error };
};

export default useFetchPlayers
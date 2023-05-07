import { useState, useEffect } from 'react';

const useFetchTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`https://api.sportsdata.io/v3/nfl/scores/json/AllTeams?key=${process.env.SPORTS_DATA_API_KEY}`);
        const data = await response.json();
        setTeams(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return { teams, loading, error };
};

export default useFetchTeams;
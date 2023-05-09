import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import PlayerCard from "@/components/Players/PlayerCard";
import { teamColors } from "../../resources/NFL_TEAM_COLORS";
import useUserTeam from "@/hooks/useUserTeam";
import { useAuth } from "@/hooks/useAuth";

const MyTeam = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { user } = useAuth();
  const { team, loading, error } = useUserTeam(uid);

  if (loading) {
    return <div>Loading your team...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <Layout>
      <h1>My Team: {user.uid}</h1>
      <p>This is the team page for the user with UID: {user.uid}</p>
      <div>
        {team.map((player) => {
          return (
            <div key={player.PlayerID}>
              <PlayerCard player={player} colors={teamColors} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default MyTeam;
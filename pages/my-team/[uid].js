import { useRouter } from "next/router";
import Layout from "@/components/Layout/Layout";
import PlayerCard from "@/components/Players/PlayerCard";
import { teamColors } from "../../resources/NFL_TEAM_COLORS";
import useUserTeam from "@/hooks/useUserTeam";
import { useAuth } from "@/hooks/useAuth";
import RemovePlayerButton from "@/components/Players/RemovePlayerButton";
import styles from "./myTeam.module.css";

const MyTeam = () => {
  const router = useRouter();
  const { uid } = router.query;
  const { user } = useAuth();
  const { team, loading, error } = useUserTeam(uid);
  console.log(user);
  if (loading) {
    return <div>Loading your team...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Layout>
      <div className={styles.myTeam}>
        <h1>My Team: {user.displayName}</h1>
        <p>This is the team page for the user with UID: {user.uid}</p>
        {["QB", "RB", "WR", "TE"].map((position) => (
          <div key={position} className={styles.positionSection}>
            <h2>{position === "QB" ? "Quarterbacks" : position === "RB" ? "Running Backs" : position === "WR" ? "Wide Receivers" : "Tight Ends"}</h2>
            <div className={styles.playersGrid}>
              {team
                .filter((player) => player.Position === position)
                .map((player) => (
                  <div key={player.PlayerID} className={styles.playerWrapper}>
                    <PlayerCard player={player} colors={teamColors} />
                    <RemovePlayerButton playerId={player.PlayerID} />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default MyTeam;

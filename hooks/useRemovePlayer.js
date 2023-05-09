import { getDatabase, ref, remove } from "firebase/database";
import { useAuth } from "./useAuth";

const useRemovePlayer = () => {
  const { user } = useAuth();

  const removePlayerFromTeam = async (playerId) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      const db = getDatabase();
      await remove(ref(db, `user_teams/${user.uid}/${playerId}`));
    } catch (error) {
      console.error("Error removing player from user's team:", error);
    }
  };

  return { removePlayerFromTeam };
};

export default useRemovePlayer;
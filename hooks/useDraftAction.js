import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";

export const useDraftActions = () => {
    const [draftActions, setDraftActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const db = getDatabase();
      const draftActionsRef = ref(db, "draft_actions");
      const unsubscribe = onValue(
        draftActionsRef,
        (snapshot) => {
          const actions = snapshot.val() ? Object.values(snapshot.val()) : [];
          // Sort actions by timestamp
          actions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
          setDraftActions(actions);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  
      return () => {
        off(draftActionsRef, "value", unsubscribe);
      };
    }, []);
  
    return { draftActions, loading, error };
  };

export default useDraftActions;
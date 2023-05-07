import React from "react";

import PlayersList from "../components/Players/PlayersList";
import Layout from "@/components/Layout/Layout";
import { withAuth } from "@/components/Auth/withAuth";
const AvailablePlayers = () => {
  return (
    <Layout>

        <PlayersList />

    </Layout>
  );
};

export default withAuth(AvailablePlayers);

import React from "react";

import PlayersList from "../components/Players/PlayersList";
import Layout from "@/components/Layout/Layout";
import { withAuth } from "@/components/Auth/withAuth";
import LiveActionBox from "@/components/ActionBox";
const AvailablePlayers = () => {
  return (
    <Layout>
      <LiveActionBox />
        <PlayersList />

    </Layout>
  );
};

export default withAuth(AvailablePlayers);

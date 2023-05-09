import React, { useMemo } from "react";
import PlayerCard from "./PlayerCard";
import styles from "./PlayersList.module.css";
import useFetchPlayers from "../../hooks/useFetchPlayers";
import useFetchTeams from "../../hooks/useFetchTeams";
import { nflTeamColors } from "@/resources/NFL_TEAM_COLORS";
import { useFiltersState } from "../../hooks/useFilterState";
import useUserTeam from "../../hooks/useUserTeam";
import { useDraftedPlayers } from "../../hooks/useDraftedPlayers";
import PositionFilter from "./PositionFilter";
import TeamFilter from "./TeamFilter";

const PlayersList = () => {
  const { players, loading, error } = useFetchPlayers();
  const { teams: allTeams } = useFetchTeams();
  const { team, addPlayerToTeam } = useUserTeam();
  const {
    selectedPositions,
    setSelectedPositions,
    filterTeam,
    setFilterTeam,
    searchTerm,
    setSearchTerm,
    showFreeAgents,
    setShowFreeAgents,
  } = useFiltersState();
  const { draftedPlayers } = useDraftedPlayers();

  const filterPlayers = (player) => {
    const isFreeAgent = player.Team === null;
    const includedPositions = ["QB", "RB", "WR", "TE"];
    const isIncludedPosition = includedPositions.includes(player.Position);
    const isDrafted = team.some(
      (teamPlayer) => teamPlayer.PlayerID === player.PlayerID
    );
    const isDraftedGlobally = draftedPlayers.includes(player.PlayerID);

    return (
      (selectedPositions.length === 0 ||
        selectedPositions.includes(player.Position)) &&
      (!filterTeam || player.Team === filterTeam) &&
      (searchTerm === "" ||
        player.Name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      isIncludedPosition &&
      (showFreeAgents ? true : !isFreeAgent) &&
      !isDrafted &&
      !isDraftedGlobally
    );
  };

  const filteredPlayers = useMemo(
    () => players.filter(filterPlayers),
    [
      players,
      selectedPositions,
      filterTeam,
      searchTerm,
      showFreeAgents,
      team,
      draftedPlayers,
    ]
  );


  const getTeamColors = (teamKey) => {
    return nflTeamColors.find((team) => team.name === teamKey)?.colors;
  };

  const handleDraftClick = (player) => {
    addPlayerToTeam(player);
  };

  const handlePositionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPositions((prevPositions) => [...prevPositions, value]);
    } else {
      setSelectedPositions((prevPositions) =>
        prevPositions.filter((position) => position !== value)
      );
    }
  };

  const resetFilters = () => {
    setSelectedPositions([]);
    setFilterTeam("");
    setSearchTerm("");
    setShowFreeAgents(false);
  };

  if (loading) {
    return <div>Loading players...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.playersList}>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search players"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <PositionFilter
          selectedPositions={selectedPositions}
          handlePositionChange={handlePositionChange}
        />
        <TeamFilter
          allTeams={allTeams}
          filterTeam={filterTeam}
          setFilterTeam={setFilterTeam}
        />
        <label>
          <input
            type="checkbox"
            checked={showFreeAgents}
            onChange={(e) => setShowFreeAgents(e.target.checked)}
          />
          Show Free Agents
        </label>
        <button className={styles.resetFilterButton} onClick={resetFilters}>
          Reset Filters
        </button>
      </div>
      <div className={styles.playersGrid}>
        {filteredPlayers.map((player) => {
          const teamColors = getTeamColors(player.Team);
          return (
            <div key={player.PlayerID}>
              <PlayerCard player={player} colors={teamColors} />
              <button
                className={styles.draftButton}
                onClick={() => handleDraftClick(player)}
              >
                Draft
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayersList;
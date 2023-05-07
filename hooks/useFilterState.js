import { useState } from "react";

export const useFiltersState = () => {
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [filterTeam, setFilterTeam] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFreeAgents, setShowFreeAgents] = useState(false);

  return {
    selectedPositions,
    setSelectedPositions,
    filterTeam,
    setFilterTeam,
    searchTerm,
    setSearchTerm,
    showFreeAgents,
    setShowFreeAgents,
  };
};
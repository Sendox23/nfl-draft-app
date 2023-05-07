import React from "react";

const TeamFilter = ({ allTeams, filterTeam, setFilterTeam }) => {
  const filteredTeams = allTeams.filter(
    (team) => !["AFC", "NFC", "PHO", "LARAID", "LARAMS"].includes(team.Key)
  );

  return (
    <>
      <label htmlFor="team-filter">Filter by team:</label>
      <select
        id="team-filter"
        value={filterTeam}
        onChange={(e) => setFilterTeam(e.target.value)}
      >
        <option value="">All teams</option>
        {filteredTeams.map((team) => (
          <option key={team.Key} value={team.Key}>
            {team.Key}-{team.Name}
          </option>
        ))}
      </select>
    </>
  );
};

export default TeamFilter;
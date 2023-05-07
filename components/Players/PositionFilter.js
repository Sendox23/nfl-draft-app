import React from "react";

const PositionFilter = ({  handlePositionChange }) => {
  const positionOptions = ["QB", "RB", "WR", "TE"];

  return (
    <div>
      <span>Filter by position:</span>
      {positionOptions.map((position) => (
        <label key={position}>
          <input
            type="checkbox"
            value={position}
            onChange={handlePositionChange}
          />
          {position}
        </label>
      ))}
    </div>
  );
};

export default PositionFilter;
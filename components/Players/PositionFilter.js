import React from "react";

const PositionFilter = ({  handlePositionChange }) => {
  const positionOptions = ["QB", "RB", "WR", "TE"];

  return (
    <div>

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
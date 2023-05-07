import React from 'react';

import styles from './PlayerCard.module.css';

const generateGradientBackground = (colors) => {
  if (!colors || colors.length === 0) {
    return '#FFFFFF';
  }

  const gradient = colors
    .map(
      (color, index) =>
        `${color} ${(index * (100 / colors.length))}%, ${color} ${
          (index + 1) * (100 / colors.length)
        }%`
    )
    .join(', ');
  return `linear-gradient(to right, ${gradient})`;
};

// Destructure the player prop for better readability
const PlayerCard = ({  player: {  Name, Position, CurrentTeam, PhotoUrl }, colors }) => {
  const teamGradient = generateGradientBackground(colors);

  return (
    <div className={styles.card} style={{ background: teamGradient }}>
      <img src={PhotoUrl} alt={`${Name}'s photo`} />
      <div className={styles.textContainer}>
        <h3>{Name}</h3>
        <p>Position: {Position}</p>
        {CurrentTeam ? (
          <p>Team: {CurrentTeam}</p>
        ) : (
          <p>Team: Free Agent</p>
        )}  
      </div>
    </div>
  );
};

export default PlayerCard;
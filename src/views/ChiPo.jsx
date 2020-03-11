import React from 'react';

const ChiPo = ({game, playerHand}) => {
  let requiredHandType;

  if (game.handType === 'start') {
    requiredHandType = 'Include 3♦';
  } else if (game.handType === 'single') {
    requiredHandType = 'Single';
  } else if (game.handType === 'double') {
    requiredHandType = 'Double';
  } else if (game.handType === 'fiveCard') {
    requiredHandType = 'Five Card';
  } else {
    requiredHandType = 'Single, Double, or Five Card';
  }

  let previousHand = 'None';

  if (game.lastHand.length > 0) {
    previousHand = game.lastHand.join(' ');
  }

  return (
    <div>
      <h3>
        Previous Hand: {previousHand}
      </h3>
      <h3>
        Required Hand Type: {requiredHandType}
      </h3>
      {playerHand.map((card, index) => {
        return (
          <div key={index} >
            <input type="radio" />{card}
          </div>
        );
      })}
    </div>
  );
}

export default ChiPo;
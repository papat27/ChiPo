import React from "react";
import StartPrompt from "./views/StartPrompt.jsx";
import Disconnected from "./views/Disconnected.jsx";
import Lobby from './views/Lobby.jsx';
import ChiPo from './views/ChiPo.jsx';
// import ChooseCategory from "./views/ChooseCategory";
// import DrawView from "./views/DrawView";
// import GuessView from "./views/GuessView";
// import GameEnd from "./views/GameEnd";

const Routes = ({
  game,
  emit,
  disconnected,
  joinError,
  setJoinError,
  playerHand
}) => {
  if (!game) {
    return (
      <StartPrompt
        startSocket={emit.start}
        joinError={joinError}
        setJoinError={setJoinError}
      />
    );
  } else if (disconnected) {
    return <Disconnected />;
  } else if (game.state === 'waitingForPlayers') {
    return <Lobby users={game.users} handleStart={emit.startGame} />
  } else if (game.state === 'playing') {
    return <ChiPo game={game} playerHand={playerHand} />
  }
}

export default Routes;
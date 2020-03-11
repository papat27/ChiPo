import React, {useState, useEffect} from 'react';
import Routes from './Routes.jsx';
import socketIOClient from 'socket.io-client';
const socket = socketIOClient(window.location.href);

const App = () => {

  const [game, setGame] = useState(null);
  const [disconnected, setDisconnected] = useState(false);
  const [joinError, setJoinError] = useState(null);

  const emit = {
    start: (e, name, option, room) => {
      e.preventDefault();
      setJoinError(null);
      if (name === "") {
        setJoinError("Please enter your name to join.");
      } else {
        if (option !== "create") {
          socket.emit("joinRoom", { name, room });
        } else {
          socket.emit("createRoom", name);
        }
        socket.on("gameDetails", (game) => {
          console.log(game);
          setGame(game);
        });
        socket.on("notARoom", () => setJoinError("That is not a valid room."));
        socket.on("maxPlayersReached", () => setJoinError("Maximum Players Reached"))
        socket.on("disconnect", () => {
          setDisconnected(true);
        });
      }
    },
    startGame: () => {
      socket.emit('startGame', game.room)
    }
  }

  let playerHand;

  if (game) {
    let userIDs = Object.keys(game.users);
    for (let userID of userIDs) {
      if (userID === socket.id) {
        playerHand = game.users[userID].currentHand;
      }
    }
  }

  console.log(playerHand);
 
  return (
    <div>
      {game && game.room !== null ? (
        <div id="room-display">
          <h2>Your Room: {game.room}</h2>
        </div>
      ) : (
        <></>
      )}
      <div id="dynamic-area">
        <Routes
          game={game}
          emit={emit}
          disconnected={disconnected}
          joinError={joinError}
          setJoinError={setJoinError}
          playerHand={playerHand}
        />
      </div>
    </div>
  );
}
 
export default App;
let games = {};
let users = {};
const alphabet = 'abcdefghijklmnopqrstuvwy';

const getRandomNumber = (n) => {
  return Math.floor(n * Math.random());
}

const getRandomString = (n) => {
  return (
    Array(n).fill(null).map(() => {
      return alphabet[getRandomNumber(alphabet.length)];
    }).join("")
  );
};

const orderedDeck = function() {
  const suits = [ '♥', '♣', '♠', '♦' ];
  const values = [ 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K' ];
  var deck = [];

  suits.forEach(function(suit) {
    values.forEach(function(value) {
      deck.push(value + suit);
    });
  });

  return deck;
};

const shuffleDeck = function(deck) {
  let shuffledDeck = [];
  let indexTracker = {};

  let getRandomIndex = function() {
    let index = Math.floor(Math.random() * 52);

    if (!indexTracker[index]) {
      return index;
    } else {
      return getRandomIndex();
    }
  }

  for (let i = 0; i < deck.length; i++) {
    let shuffledDeckIndex = getRandomIndex();
    shuffledDeck[shuffledDeckIndex] = deck[i];
    indexTracker[shuffledDeckIndex] = deck[i];
  }

  return shuffledDeck;
};

module.exports = (socket, io) => {

  socket.on('createRoom', (name) => {
    let room = (getRandomString(3)).toUpperCase();
    
    while (games[room]) {
      room = (getRandomString(3)).toUpperCase();
    }

    users[socket.id] = { 
      name, 
      owner: true, 
      id: socket.id, 
      room, 
      currentHand: [],
      chosenHand: []
    }

    games[room] = {
      room,
      users: { [socket.id]: users[socket.id] },
      state: "waitingForPlayers",
      currentTurn: null,
      lastHand: [],
      handType: 'start',
      fiveCardType: null,
      lastPlayer: null
    };

    socket.join(room)
    io.in(room).emit('gameDetails', games[room]);
  });

  socket.on('joinRoom', ({ name, room }) => {
    room = room.toUpperCase()
    if (games[room]) {
      if (Object.keys(games[room].users).length < 4) {
          users[socket.id] = { 
            name, 
            owner: false, 
            id: socket.id, 
            room, 
            currentHand: [],
            chosenHand: []
          };
    
          games[room].users[socket.id] = users[socket.id];
          
          socket.join(room)
          io.in(room).emit('gameDetails', games[room]);
      } else {
        io.emit('maxPlayersReached');
      }
    } else {
      io.emit('notARoom')
    }
  });

  socket.on('disconnect', function () {
    if (users[socket.id]) {
      const { room } = users[socket.id]
      delete users[socket.id]
      if (games[room]) {
        if (Object.keys(games[room].users).length < 1) {
          delete games[room]
        } else {
          delete games[room].users[socket.id]
          io.in(room).emit('gameDetails', games[room]);
        }
      }
    }
  });

  socket.on('startGame', (room) => {
    let deck = shuffleDeck(orderedDeck());
    let userIDs = Object.keys(games[room].users);
    let count = 0;
    for (let card of deck) {
      if (count === 4) {
        count = 0;
      }
      games[room].users[userIDs[count++]].currentHand.push(card);
    }
    userIDs.forEach((userID) => {
      games[room].users[userID].currentHand.sort();
      let playersHand = games[room].users[userID].currentHand;

      for (let card of playersHand) {
        if (card === '3♦') {
          games[room].currentTurn = games[room].users[userID]; 
        }
      }
    })

    games[room].state = 'playing';
    io.in(room).emit('gameDetails', games[room]);
  })
}
import React from 'react';
import UserList from './components/UserList.jsx';

const Lobby = ({ users, handleStart }) => {
  // console.log(users[socket.id]);
  const handleClick = (e) => {
    handleStart();
  }

  return (
    <div>
      <UserList users={users} />
      { (Object.keys(users).length === 4) ? (<button onClick={handleClick}>Start game</button>) : null}
    </div>
  )
}

export default Lobby;
import React from "react";

const UserList = ({ users }) => {
  const numPlayers = Object.keys(users).length;
  return (
    <>
      <h2>
        {numPlayers} Player{numPlayers > 1 ? <>s</> : <></>} Online
      </h2>
      <div id="user-list">
        {Object.keys(users).map((id) => {
          return (
            <p className="username" key={id}>
              {users[id].name}
            </p>
          );
        })}
      </div>
    </>
  );
};
export default UserList;
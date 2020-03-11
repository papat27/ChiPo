import React, { useState, useEffect } from "react";

const StartPrompt = ({ startSocket, joinError, setJoinError }) => {
  const [name, setName] = useState("");
  const [joiningRoom, setJoiningRoom] = useState(null);

  useEffect(() => {
    setJoinError(null);
  }, [name]);
  return (
    <>
      <form
        className="prompt"
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
      >
        <h2>Your Name:</h2>
        <div>
          <input
            type="text"
            className="textbox"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          {joiningRoom === null ? (
            <div>
              <input
                type="button"
                value="Join Room"
                onClick={() => setJoiningRoom("")}
              />
            </div>
          ) : (
            <div>
              <div>
                <h2>Room ID:</h2>
              </div>
              <div>
                <input
                  type="text"
                  className="textbox"
                  value={joiningRoom}
                  onChange={(e) => setJoiningRoom(e.target.value.toUpperCase())}
                />
              </div>
              <div>
                <input
                  type="button"
                  value={`Join ${joiningRoom}`}
                  onClick={(e) => startSocket(e, name, "join", joiningRoom)}
                />
              </div>
            </div>
          )}
          <div>
            <input
              type="button"
              value="Create Room"
              onClick={(e) => {
                startSocket(e, name, "create");
              }}
            />
          </div>
          {joinError ? (
            <div className="error-message">
              <label>{joinError}</label>
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
    </>
  );
};

export default StartPrompt;
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
const io = require("socket.io-client");

const GameDashboard = () => {
  const router = useRouter();
  const { code } = router.query;
  const [id, setId] = useState("");
  const [players, setPlayers] = useState([]);
  const socket = io("http://localhost:8080/", {
    withCredentials: true,
  });
  //TODO: GET TIME WORKING
  socket.on("getUsers", (data) => {
    // console.log(data);
    setPlayers(data);
  });
  if (code) {
    socket.emit("initializeGame", { code: code });
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      let userId = localStorage.getItem("id");
      setId(userId);
    }
    //check if user is in room, if not say the game is in progress
  }, []);
  return (
    <div>
      UserID: {id}
      <div>Code: {code}</div>
      <div>
        In Lobby:{" "}
        {players.map((player, index) => {
          return <div key={index}>{player.username}</div>;
        })}
      </div>
    </div>
  );
};

export default GameDashboard;

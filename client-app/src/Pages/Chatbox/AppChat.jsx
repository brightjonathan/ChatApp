import React, { useState } from 'react';
import './Chat.css';
import Chat from "./Chat";
import { API_URL } from '../../Components/Api';
import io from "socket.io-client";
import { useSelector } from 'react-redux';


const socket = io.connect(API_URL);

const AppChat = () => {
    
  const {currentUser} = useSelector((state) => state.user);
   const username = currentUser?.username; 
  
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };


  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            value={username}
            disabled
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat Socket={socket} username={username} room={room} />
      )}
    </div>
  )
}

export default AppChat;





import React, { useEffect, useState } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";
//import Logo from '../../Components/Logo/Logo'



const Chat = ({Socket, username, room}) => {

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {

    const currentDateTime = new Date(Date.now());
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

const formatTime = (value) => {
  return value < 10 ? "0" + value : value;
};

const ampm = hours >= 12 ? "PM" : "AM";
const formattedHours = hours % 12 || 12;


    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: `${formatTime(formattedHours)}:${formatTime(minutes)} ${ampm}`,
      };
       
      
      await Socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    Socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });


  }, [Socket]);


  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat;

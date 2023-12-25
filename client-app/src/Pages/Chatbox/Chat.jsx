import React, { useEffect, useState } from 'react';
import Notiflix from "notiflix";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ScrollToBottom from "react-scroll-to-bottom";
import { API_URL } from '../../Components/Api';
import { signoutUserFailure, signoutUserStart, signoutUserSuccess } from '../../Redux/User/Auth.Slice';
import { toast } from 'react-toastify';
//import Logo from '../../Components/Logo/Logo'



const Chat = ({Socket, username, room}) => {


  const dispatch = useDispatch();
  const navigate = useNavigate();

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


    //logout func...
    const logout = async() => {
      try {
       dispatch(signoutUserStart());
       const res = await fetch('https://chattyapp-iwdo.onrender.com/api/auth/signout');
       const data = await res.json();
       if (data.success === false) {
         dispatch(signoutUserFailure(data.message));
         return;
       }
         dispatch(signoutUserSuccess(data))
         toast.success("logout successfully");
         navigate('/login')
      } catch (error) {
       dispatch(signoutUserFailure(data));
      }
     };
   
     //
     const confirmLoggedout = () => {
       Notiflix.Confirm.show(
         "Logout Account!!!",
         "You are about to logout this account",
         "Logout",
         "Cancel",
         function okCb() {
           logout();
         },
         function cancelCb() {
           console.log("Logout Canceled");
         },
         {
           width: "320px",
           borderRadius: "3px",
           titleColor: "blue",
           okButtonBackground: "green",
           cssAnimationStyle: "zoom",
         }
       );
     };


  return (
    <>
      <div className='text-center'>
       <button
       onClick={confirmLoggedout} 
        className='bg-[#0F172A] text-white text-2xl py-2 px-6 rounded md:ml-8 duration-500 mt-3 '> 
        Logout</button>
        </div>


    <div className="chat-window">

      <div className="chat-header">
        <p> Chat Live</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
               key={index}
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
          className='text-4xl'
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
  </>
  )
}

export default Chat;

import React from 'react'
import './App.css';
import {Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Homepage from './Pages/Home/Homepage';
import AppChat from './Pages/Chatbox/AppChat';


const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
            <Route>
            <Route path="/" element={<Homepage/>} />
            <Route path="/chat" element={<AppChat />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            </Route>
      </Routes>
    </div>
  )
}

export default App;

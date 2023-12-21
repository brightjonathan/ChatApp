import React from 'react'
import './App.css';
import {Route, Routes } from "react-router-dom";
import Register from './Pages/Auth/Register';

const App = () => {
  return (
    <div>
      <Routes>
            <Route>
            <Route path="/register" element={<Register/>} />
            </Route>
      </Routes>
    </div>
  )
}

export default App;

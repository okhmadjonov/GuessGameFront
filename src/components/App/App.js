import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../../pages/Home/Home.js";
import Board from "../Board/Board";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Game from "../../pages/Game/Game.js";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="signin" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="signup" element={<Register />} />
        <Route path="startgame" element={<Game />} />
        <Route path="leaderboard" element={<Board />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import "./Home.scss";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="homepage">
      <h2 className="homepage_title">Welcome to the Number Guessing Game</h2>
    </div>
  );
};

export default Home;

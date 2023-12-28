import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header_container">
        <div className="header_logo">
          <Link to={"/"} className="logo">
            Logo
          </Link>
        </div>
        <div className="header_menu">
          <Link to={"/startgame"} className="start_game">
            Game
          </Link>
          <Link to={"/leaderboard"} className="leaderboard">
            LeaderBoard
          </Link>
        </div>
        <div className="header_login">
          <Link to={"/signin"} className="signin">
            Sign in
          </Link>
          <Link to={"/signup"} className="signup">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

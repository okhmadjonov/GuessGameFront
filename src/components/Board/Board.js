import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Board.scss";
import axios from "../../services/index";

const Board = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get("/LeaderBoard");
        setLeaderboardData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="winners">
      <h2>Winners' Table</h2>
      <div className="winners_container">
        <table className="table">
          <thead>
            <tr
              style={{ color: "brown", fontWeight: "500", fontSize: "1.1em" }}
            >
              <td>#</td>
              <td>Name</td>
              <td>Email</td>
              <td>Games Played</td>
              <td>Wins</td>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((player, index) => (
              <tr key={player.id}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{player.email}</td>
                <td>{player.games.length}</td>
                <td>{player.games.filter((game) => game.win).length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Board;

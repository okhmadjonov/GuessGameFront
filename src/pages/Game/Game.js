import React, { useState, useEffect } from "react";
import "./Game.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Game = () => {
  const [sessionId, setSessionId] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [allResults, setAllResults] = useState([]);
  const [validationWarning, setValidationWarning] = useState("");

  useEffect(() => {
    const savedResults = localStorage.getItem("guessingGameResults");
    if (savedResults) {
      setAllResults(JSON.parse(savedResults));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("guessingGameResults", JSON.stringify(allResults));

    if (attempt >= 8) {
      localStorage.clear();
    }
  }, [allResults, attempt]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const number = formData.get("number");

    if (!isValidNumber(number)) {
      setValidationWarning("Number must be a 4-digit positive number.");
      return;
    }

    // localhost:7025/api/Game
    https: try {
      const response = await axios.post(
        "https://localhost:7025/api/Number/guess",
        {
          guess: parseInt(number),
        }
      );

      if (response.data.success) {
        setGameOver(true);
        setSuccessMessage("Congratulations! You found the number!");
      }

      setResultMessage(response.data.result);

      setAttempt((prevAttempt) => prevAttempt + 1);

      console.log(response.data.result);

      setAllResults((prevResults) => [...prevResults, response.data.result]);

      setValidationWarning("");

      setInputValue("");

      if (attempt + 1 >= 8) {
        setGameOver(true);
        setResultMessage("Game Over! Maximum attempts reached.");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const isValidNumber = (number) => {
    const isValid = /^\d{4}$/.test(number) && parseInt(number, 10) >= 0;
    return isValid;
  };

  const getSessionId = async () => {
    try {
      const response = await axios.get("https://localhost:7025/api/Game");
      console.log(response);
      setSessionId(response.data);
    } catch (error) {
      console.error("Error getting session ID:", error.message);
    }
  };

  return (
    <div className="gameplay">
      <button onClick={getSessionId} className="start_game">
        Start Game
      </button>
      <p className="sessionId">{sessionId}</p>
      <h2 className="gameplay_title">Game</h2>
      <div className="attempts">
        Attempts: <span> {attempt}</span>
      </div>
      <div className="game_container">
        {gameOver ? (
          <div className="result-message">
            {successMessage || resultMessage}
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              className="session_id"
              name="sessionId"
              placeholder="Put session id here"
            />

            <input
              className="guess_game_input"
              type="text"
              name="number"
              placeholder="Type guessing number here"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setValidationWarning("");
              }}
            />
            <button type="submit" className="check">
              Check
            </button>
          </form>
        )}
      </div>
      {validationWarning && (
        <div className="validation-warning">{validationWarning}</div>
      )}
      <div className="results">
        <h3>Result:</h3>
        <ul>
          {allResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;

import React, { useState, useEffect } from "react";

export default function App() {
  const STARTING_TIME = 5;

  const [userInput, setUserInput] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(STARTING_TIME);
  const [isTimeRunning, setIsTimeRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  function handleChange(e) {
    setUserInput(e.target.value);
  }

  function calcWordCount(text) {
    const arr = text.trim().split(" ");
    return arr.filter((word) => word !== "").length;
  }

  function startClock() {
    setIsTimeRunning(true);
    setTimeRemaining(STARTING_TIME);
    setUserInput("");
    setWordCount(0);
  }

  function endGame() {
    setIsTimeRunning(false);
    setWordCount(calcWordCount(userInput));
  }

  useEffect(() => {
    if (isTimeRunning && timeRemaining > 0) {
      setTimeout(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      endGame();
    }
  }, [timeRemaining, isTimeRunning]);

  return (
    <div>
      <h1>How fast can you type?</h1>
      <textarea
        disabled={!isTimeRunning}
        onChange={handleChange}
        type="text"
        value={userInput}
      />
      <h4>Time remaining: {timeRemaining}s</h4>
      <button disabled={isTimeRunning} onClick={startClock}>
        Start
      </button>
      <h1>Word count: {wordCount} </h1>
    </div>
  );
}

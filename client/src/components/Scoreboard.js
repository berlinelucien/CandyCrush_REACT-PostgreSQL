import React from 'react'
import { useState, useEffect } from 'react';

const Scoreboard = ({ score }) => {

  const [scores, setScore] = useState([]);

  const getScores = async () => {
    const response = await fetch("http://localhost:4000/score");
    const score = await response.json();
    setScore(score)
  };

  const saveData = async () => {
    const response = await fetch("http://localhost:4000/score", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const e = await response.json();
    //setScore(scores);
    setScore({...scores,[e.target.value]: e.target.value });
  };

  useEffect(() => {
    getScores();
  }, []);

  return (
    <div className='scoreboard'>
      <h2>{score}</h2>
      <button onClick={saveData}>save score</button>
      <h2> SCORE BOARD:</h2>
        <ul>
        {scores.map((score) => {
          return (
            <li key={score.id}>
             PLAYER: {score.name},
             High score: {score.score}
            </li>
          )
        })}
          </ul>
          </div>
  )
}

  export default Scoreboard;
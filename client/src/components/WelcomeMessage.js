import React, { useEffect } from 'react';
import CrushBoard from './CrushBoard'
import { useState } from 'react';
// this is my success page if gamer submits name
const WelcomeMessage = ({ formInfo }) => {
  
  const [scores, setScore] = useState([]);
  const getScores = async () => {
    const response = await fetch("http://localhost:4000/score");
    const score = await response.json();
    setScore(score)
  };
  useEffect(() => {
    getScores();
  }, []);

    
  return (
    <div className="crush-main">
      <h2> Welcome to Candy Jewels {formInfo.name}</h2>
    <section >
         <CrushBoard />
      </section>
      <div className='list-scores'>
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
      </div>
      
  )
}

export default WelcomeMessage
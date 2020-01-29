import React, { FunctionComponent, useState, useEffect } from "react";
import Mole from "./Mole";
import "./Game.css";

interface IProps {
  active: boolean;
  timer: number;
  level: string;
}

const Game: FunctionComponent<IProps> = ({ active, timer, level }) => {
  const [score, setScore] = useState<number>(0);
  const [moles, setMoles] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const [count, setCount] = useState<number>(1);
  const [highScore, setHighScore] = useState<string | null>("0");

  useEffect(() => {
    setHighScore(localStorage.getItem(level));
    console.log(highScore);
    const newMole = () => {
      const elem: HTMLElement | null = document.getElementById("board");
      const width = (elem && elem.clientWidth - 90) || 0;
      const height = (elem && elem.clientHeight - 90) || 0;
      const y = getRandomInt(width);
      const x = getRandomInt(height, 50);
      const mole = { id: count, x, y };
      setCount(count + 1);
      setMoles([...moles, mole]);
    };

    const frequency = () => {
      if (level === "Easy") return 700;
      if (level === "Medium") return 600;
      if (level === "Hard") return 500;
    };

    const gameOver = () => {
      localStorage.setItem(level, score.toString());
    };

    const interval = setInterval(newMole, frequency());
    if (!active) {
      gameOver();
      clearInterval(interval);
      if (moles.length) setMoles([]);
    }

    return () => clearInterval(interval);
  }, [moles, active, count, level, score, highScore]);

  const getRandomInt = (max: number, min: number = 0) => {
    return Math.floor(Math.random() * Math.floor(max - min)) + min;
  };

  const removeMole = (id: number) => {
    const newMoles = moles.filter(mole => mole.id !== id);
    setMoles(newMoles);
  };

  const clickMole = (id: number, moleClass: string) => {
    let points: number;
    switch (level) {
      case "Easy":
        moleClass === "easy" ? (points = 1) : (points = -1);
        break;
      case "Medium":
        moleClass === "med-1" ? (points = 3) : (points = -3);
        break;
      case "Hard":
        moleClass === "med-1 hard-1" ? (points = 5) : (points = -5);
        break;
      default:
        points = 1;
    }
    setScore(score + points);
    removeMole(id);
  };

  return (
    <div>
      <div id="appbar">
        <div id="score">
          <strong>Score</strong>
          <br />
          {score}
        </div>
        <div id="high-score">
          <strong>High</strong>
          <br />
          {highScore}
        </div>
        <div id="timer">
          <strong>Time Left</strong>
          <br />
          {timer}
        </div>
      </div>

      <div id="gameover" style={{ display: active ? "none" : "block" }}>
        <h1>Game Over!</h1>
        <h4>You scored {score} points.</h4>
      </div>

      {moles.map(mole => (
        <Mole
          key={mole.id}
          position={[mole.x, mole.y]}
          id={mole.id}
          removeMole={removeMole}
          clickMole={clickMole}
          level={level}
        />
      ))}
    </div>
  );
};

export default Game;

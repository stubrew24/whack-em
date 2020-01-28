import React, { FunctionComponent, useState, useEffect } from "react";
import Mole from "./Mole";
import "./Game.css";

interface IProps {
  active: boolean;
  timer: number;
  level: string;
}

const Game: FunctionComponent<IProps> = ({ active, timer }) => {
  const [score, setScore] = useState<number>(0);
  const [moles, setMoles] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
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

    const interval = setInterval(newMole, 600);
    if (!active) {
      clearInterval(interval);
      if (moles.length) setMoles([]);
    }

    return () => clearInterval(interval);
  }, [moles, active, count]);

  const getRandomInt = (max: number, min: number = 0) => {
    return Math.floor(Math.random() * Math.floor(max - min)) + min;
  };

  const removeMole = (id: number) => {
    const newMoles = moles.filter(mole => mole.id !== id);
    setMoles(newMoles);
  };

  const clickMole = (id: number) => {
    setScore(score + 1);
    removeMole(id);
  };

  return (
    <div>
      {/* <div className="alert alert-primary" role="alert"></div> */}
      <div id="appbar">
        <div id="score">
          <strong>Score</strong>
          <br />
          {score}
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
        />
      ))}
    </div>
  );
};

export default Game;

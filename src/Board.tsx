import React, { useState, useEffect } from "react";
import "./Board.css";
import Game from "./Game";

const Board: React.FunctionComponent = () => {
  const [active, setActive] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(15);
  const [level, setLevel] = useState<string>("");

  useEffect(() => {
    let interval: any;
    if (level) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      setTimeout(() => {
        setActive(false);
        clearInterval(interval);
      }, timer * 1000);
    }
    return () => clearInterval(interval);
  }, [level, timer]);

  const Button = (level: string) => {
    return (
      <div
        className="button"
        onClick={() => {
          setLevel(level);
        }}
      >
        {level}
      </div>
    );
  };

  const StartScreen = () => {
    return (
      <div>
        <h1 id="title">whack'em</h1>
        <div id="buttons">
          {Button("Easy")}
          {Button("Medium")}
          {Button("Hard")}
        </div>
        <div id="instructions">
          Only whack the blue squares... <br />
          <div id="easy-mole"></div>
        </div>
      </div>
    );
  };

  return (
    <div id="board">
      {level ? (
        <Game active={active} timer={timer} level={level} />
      ) : (
        <StartScreen />
      )}
    </div>
  );
};

export default Board;

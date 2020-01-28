import React, { useEffect, useState } from "react";
import "./Board.css";
import Game from "./Game";

const Board: React.FunctionComponent = () => {
  const [active, setActive] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(10);
  const [level, setLevel] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    setTimeout(() => {
      setActive(false);
      clearInterval(interval);
    }, timer * 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const Button = (level: string) => {
    return (
      <div className="button" onClick={() => setLevel(level)}>
        {level}
      </div>
    );
  };

  return (
    <div id="board">
      {level ? (
        <Game active={active} timer={timer} level={level} />
      ) : (
        <div id="buttons">
          {Button("Easy")}
          {Button("Medium")}
          {Button("Hard")}
        </div>
      )}
    </div>
  );
};

export default Board;

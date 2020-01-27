import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./Board";

const App: React.FunctionComponent = () => {
  const [active, setActive] = useState<boolean>(true);
  const [timer, setTimer] = useState<number>(10);

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

  return (
    <div className="App">
      {timer >= 1 ? <h1>Time Left: {timer}</h1> : <h1>Game Over</h1>}
      <Board active={active} />
    </div>
  );
};

export default App;

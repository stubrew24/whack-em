import React, { FunctionComponent, useState, useEffect } from "react";
import Mole from "./Mole";

interface IProps {
  active: boolean;
}

const Board: FunctionComponent<IProps> = ({ active }) => {
  const [score, setScore] = useState<number>(0);
  const [moles, setMoles] = useState<{ id: number; x: number; y: number }[]>(
    []
  );
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    const newMole = () => {
      const y = getRandomInt(window.innerWidth - 100);
      const x = getRandomInt(window.innerHeight - 100);
      const mole = { id: count, x, y };
      setCount(count + 1);
      setMoles([...moles, mole]);
    };

    const interval = setInterval(newMole, 1000);
    if (!active) clearInterval(interval);

    return () => clearInterval(interval);
  }, [moles, count, active]);

  const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
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
      <h2>Score: {score} </h2>
      {moles.map(mole => (
        <Mole
          position={[mole.x, mole.y]}
          id={mole.id}
          removeMole={removeMole}
          clickMole={clickMole}
        />
      ))}
    </div>
  );
};

export default Board;

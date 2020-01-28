import React, { FunctionComponent, useEffect } from "react";
import "./Mole.css";

interface IProps {
  position: [number, number];
  id: number;
  removeMole: (id: number) => void;
  clickMole: (id: number) => void;
}

const Mole: FunctionComponent<IProps> = ({
  position,
  id,
  removeMole,
  clickMole
}) => {
  useEffect(() => {
    const interval = setInterval(() => removeMole(id), 600);
    return () => {
      clearInterval(interval);
    };
  }, [id, removeMole]);

  return (
    <div
      id="mole"
      style={{ top: position[0], left: position[1] }}
      onClick={() => clickMole(id)}
    ></div>
  );
};

export default Mole;

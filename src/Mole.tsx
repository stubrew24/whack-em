import React, { FunctionComponent, useEffect } from "react";

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
    const interval = setInterval(() => removeMole(id), 900);
    return () => {
      clearInterval(interval);
    };
  }, [id, removeMole]);

  return (
    <div
      style={{
        position: "absolute",
        top: position[0],
        left: position[1],
        backgroundColor: "blue",
        width: "100px",
        height: "100px",
        borderRadius: "50px"
      }}
      onClick={() => clickMole(id)}
    ></div>
  );
};

export default Mole;

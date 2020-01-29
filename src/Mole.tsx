import React, { FunctionComponent, useEffect, useState } from "react";
import "./Mole.css";

interface IProps {
  position: [number, number];
  id: number;
  level: string;
  removeMole: (id: number) => void;
  clickMole: (id: number, moleClass: string) => void;
}

const randomClass = (level: string): string => {
  if (level === "Easy") return "easy";
  if (level === "Medium") {
    const nums = [1, 1, 2, 3];
    const num = Math.floor(Math.random() * Math.floor(nums.length));
    return `med-${nums[num]}`;
  }
  if (level === "Hard") {
    const nums = [1, 1, 1, 2, 3];
    const num1 = Math.floor(Math.random() * Math.floor(nums.length));
    const num2 = Math.floor(Math.random() * Math.floor(nums.length));
    return `med-${nums[num1]} hard-${nums[num2]}`;
  }
  return "";
};

const Mole: FunctionComponent<IProps> = ({
  position,
  id,
  removeMole,
  clickMole,
  level
}) => {
  const [display, setDisplay] = useState<string>("block");
  const [moleClass, setMoleClass] = useState<string>("");

  useEffect(() => {
    if (!moleClass) setMoleClass(randomClass(level));

    const frequency = () => {
      if (level === "Easy") return 690;
      if (level === "Medium") return 590;
      if (level === "Hard") return 490;
    };
    const interval = setInterval(() => {
      setDisplay("none");
      removeMole(id);
    }, frequency());
    return () => {
      clearInterval(interval);
    };
  }, [moleClass, id, removeMole, level]);

  const handleClick = () => {
    clickMole(id, moleClass);
    setDisplay("none");
  };

  return (
    <div
      id="mole"
      className={moleClass}
      style={{ top: position[0], left: position[1], display }}
      onClick={handleClick}
    ></div>
  );
};

export default Mole;

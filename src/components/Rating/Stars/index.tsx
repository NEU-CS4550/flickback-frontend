import { FaRegStar, FaStar } from "react-icons/fa";

import "./styles.css";
import { useEffect, useState } from "react";

export default function Stars({
  score,
  onChange,
}: {
  score: number;
  onChange?: (newScore: number) => void;
}) {
  const [tempScore, setScore] = useState(score);

  const calcScore = (e: React.MouseEvent): number => {
    const target = (e.currentTarget as SVGElement).getBoundingClientRect();
    return (10 * (e.clientX - target.x)) / target.width;
  };

  useEffect(() => {
    setScore(score);
  }, [score]);

  return (
    <div
      className={"Stars" + (onChange ? " cursor-pointer" : "")}
      {...(onChange
        ? {
            onClick: (e: React.MouseEvent) => {
              onChange(calcScore(e));
              setScore(calcScore(e));
            },
          }
        : {})}
    >
      {Array(5)
        .fill(1)
        .map((_, i) => (
          <FaRegStar key={i} />
        ))}
      <div style={{ width: tempScore * 10 + "%" }}>
        {Array(5)
          .fill(1)
          .map((_, i) => (
            <FaStar key={i} />
          ))}
      </div>
    </div>
  );
}

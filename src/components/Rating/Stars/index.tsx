import { FaRegStar, FaStar } from "react-icons/fa";

import "./styles.css";

export default function Stars({ score }: { score: number }) {
  return (
    <div className="Stars">
      <FaRegStar />
      <FaRegStar />
      <FaRegStar />
      <FaRegStar />
      <FaRegStar />
      <div style={{ width: score * 10 + "%" }}>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
    </div>
  );
}

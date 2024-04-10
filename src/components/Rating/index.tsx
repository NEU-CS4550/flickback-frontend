import { Rating as RatingT } from "@/utils/types";
import Stars from "./Stars";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/format";
import { LuUser } from "react-icons/lu";

import "./styles.css";

export default function Rating({ rating }: { rating: RatingT }) {
  return (
    <div className="Rating w-100 min-w-96">
      <div className="Rating__pfp"></div>
      <div className="flex flex-col">
        <div className="Rating__info">
          <Link to={"/users/" + rating.userId}>
            <LuUser className="text-xl" /> {rating.username}
          </Link>
          <span
            className="text-sm"
            style={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            {formatDate(rating.submitted)}
          </span>
        </div>
        <Stars score={rating.score} />
        <div className="Rating__review">"{rating.review}"</div>
      </div>
    </div>
  );
}

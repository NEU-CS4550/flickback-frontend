import { Rating as RatingT } from "@/utils/types";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/format";
import { LuUser } from "react-icons/lu";
import Stars from "./Stars";

import "./styles.css";

export default function Rating({
  rating,
  concise = false,
}: {
  rating: RatingT;
  concise?: boolean;
}) {
  return (
    <div className="Rating">
      <Link to={"/users/" + rating.userId}>
        <div
          className="Rating__pfp"
          style={{ backgroundImage: "url(" + rating.pfp + ")" }}
        ></div>
      </Link>
      <div className="flex flex-col w-full">
        {!concise && (
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
        )}
        <Stars score={rating.score} />
        <div className="Rating__review">{rating.review}</div>
      </div>
    </div>
  );
}

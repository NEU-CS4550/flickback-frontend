import { api_image_url } from "@/utils/api.js";
import { Movie } from "@/utils/types";
import { LuCircleSlash2 } from "react-icons/lu";
import { Link } from "react-router-dom";

import "./styles.css";

export default function Tile({ movie }: { active?: boolean; movie: Movie }) {
  return (
    <Link className="Tile" to={"/movies/" + movie.id}>
      <div
        className="Tile__poster"
        style={
          movie.poster_path
            ? {
                backgroundImage:
                  "url(" + api_image_url + "/w300" + movie.poster_path + ")",
              }
            : {}
        }
      >
        {!movie.poster_path && (
          <LuCircleSlash2 className="Tile__poster--empty text-5xl xs:text-6xl sm:text-8xl lg:text-6xl xl:text-8xl" />
        )}
      </div>
      <span className="Tile__title text-base">{movie.title}</span>
    </Link>
  );
}

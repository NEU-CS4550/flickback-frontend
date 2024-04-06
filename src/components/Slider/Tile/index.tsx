import { api_image_url } from "@/utils/api.js";
import { Movie } from "@/utils/types";

import "./styles.css";

export default function Tile({ movie }: { active?: boolean; movie: Movie }) {
  return (
    <div className="Tile">
      <div
        className="Tile__poster"
        style={{
          backgroundImage: "url(" + api_image_url + movie.poster_path + ")",
        }}
      ></div>
      <span className="Tile__title text-base">{movie.title}</span>
    </div>
  );
}

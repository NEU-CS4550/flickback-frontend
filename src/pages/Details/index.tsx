import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, api_image_url } from "@/utils/api";
import { MovieFull } from "@/utils/types";
import { FaRegStar, FaStar } from "react-icons/fa";
import { formatGenres, formatRuntime } from "@/utils/misc";
import Button from "@/components/Button";
import { LuBookmark, LuStar } from "react-icons/lu";

import "./styles.css";

export default function Details() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieFull | null>(null);

  useEffect(() => {
    api.get(`/movies/${movieId}`).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  return (
    movie && (
      <div className="Details">
        <div className="Details__wrapper">
          <div
            className="Details__backdrop"
            style={{
              backgroundImage:
                "url(" +
                api_image_url +
                "/original" +
                movie.backdrop_path +
                ")",
            }}
          ></div>
          <div className="Details__head container mx-auto">
            <div className="Details__poster hidden sm:flex">
              <div
                style={{
                  backgroundImage:
                    "url(" + api_image_url + "/w300" + movie.poster_path + ")",
                }}
              ></div>
            </div>
            <div className="flex flex-col">
              <span className="Details__title text-2xl md:text-4xl">
                {movie.original_title}
                <span> ({movie.release_date.split("-")[0]})</span>
              </span>
              <span>{formatGenres(movie.genres)}</span>
              <span>{formatRuntime(movie.runtime)}</span>
              <div className="Details__stars">
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <FaRegStar />
                <div style={{ width: movie.vote_average * 10 + "%" }}>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
              <span className="italic text-lg mb-2">{movie.tagline}</span>
              <div className="mb-5">{movie.overview}</div>
              <div className="flex gap-3">
                <Button icon="true">
                  <LuStar className="text-xl" />
                  Rate
                </Button>
                <Button icon="true">
                  <LuBookmark className="text-xl" />
                  Add to Watchlist
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="Details__wrapper2 container mx-auto"></div>
      </div>
    )
  );
}

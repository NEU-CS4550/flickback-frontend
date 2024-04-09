import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, api_image_url } from "@/utils/api";
import { MovieFull } from "@/utils/types";
import { FaRegStar, FaStar } from "react-icons/fa";
import { formatGenres, formatRuntime } from "@/utils/format";
import Button from "@/components/Button";
import {
  LuStar,
  LuCircleSlash2,
  LuBookmarkMinus,
  LuBookmarkPlus,
} from "react-icons/lu";
import { useAuth } from "@/utils/auth";

import "./styles.css";

export default function Details() {
  const { user, setUser } = useAuth();
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieFull | null>(null);

  const addWatchlist = () => {
    if (!user || !movie) return;
    api.post(`/movies/${movieId}/add`).then(() => {
      setUser({
        ...user,
        watchlist: [...user.watchlist, movie.id],
      });
    });
  };

  const removeWatchlist = () => {
    if (!user || !movie) return;
    api.post(`/movies/${movieId}/remove`).then(() => {
      setUser({
        ...user,
        watchlist: user.watchlist.filter((id) => id != movie.id),
      });
    });
  };

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
              >
                {!movie.poster_path && (
                  <LuCircleSlash2 className="Details__poster--empty text-5xl xs:text-6xl sm:text-8xl lg:text-6xl xl:text-8xl" />
                )}
              </div>
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
              {user && (
                <div className="flex gap-3">
                  <Button icon="true">
                    <LuStar className="text-xl" />
                    Rate
                  </Button>
                  {user.watchlist.includes(movie.id) ? (
                    <Button icon="true" onClick={removeWatchlist}>
                      <LuBookmarkMinus className="text-xl" />
                      Remove from Watchlist
                    </Button>
                  ) : (
                    <Button icon="true" onClick={addWatchlist}>
                      <LuBookmarkPlus className="text-xl" />
                      Add to Watchlist
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="Details__wrapper2 container mx-auto"></div>
      </div>
    )
  );
}

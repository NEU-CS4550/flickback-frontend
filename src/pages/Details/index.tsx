import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, api_image_url } from "@/utils/api";
import { Movie, MovieFull, Rating as RatingT } from "@/utils/types";
import { formatGenres, formatRuntime } from "@/utils/format";
import Button from "@/components/Button";
import {
  LuStar,
  LuCircleSlash2,
  LuBookmarkMinus,
  LuBookmarkPlus,
  LuPencil,
  LuTrash2,
  LuX,
  LuCheck,
} from "react-icons/lu";
import { useAuth } from "@/utils/auth";
import Stars from "@/components/Rating/Stars";
import Rating from "@/components/Rating";
import { useAlert } from "@/utils/alert";

import "./styles.css";

export default function Details() {
  const { user } = useAuth();
  const { alert } = useAlert();
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieFull | null>(null);
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const defaultRating = { score: 0, review: "" };
  const [rating, setRating] = useState(defaultRating); // user's rating or default
  const [ratings, setRatings] = useState<RatingT[]>([]); // other users' ratings
  const [rated, setRated] = useState(false); // has current user rated?
  const [editing, setEditing] = useState(false); // currently editing/drafting rating?
  const [draft, setDraft] = useState(defaultRating); // temporary version of user's rating
  const [ready, setReady] = useState(false); // have all states finished loading defaults?

  const addWatchlist = () => {
    if (!user || !movie) return;
    api.post(`/actions/watchlist/${movieId}`).then(() => {
      setWatchlist([
        ...watchlist,
        { id: movie.id, title: movie.title, poster_path: movie.poster_path },
      ]);
      alert("success", "Added to watchlist.");
    });
  };

  const removeWatchlist = () => {
    if (!user || !movie) return;
    api.post(`/actions/unwatchlist/${movieId}`).then(() => {
      setWatchlist(watchlist.filter((mov) => mov.id != movie.id));
      alert("success", "Removed from watchlist.");
    });
  };

  const submitRating = () => {
    if (!user || !movie) return;
    if (JSON.stringify(draft) === JSON.stringify(rating)) {
      setEditing(false);
      return;
    }
    api
      .post(`/actions/rate/${movieId}`, {
        userId: user.id,
        username: user.username,
        pfp: user.pfp,
        movieId: movie.id,
        movieName: movie.title,
        score: draft.score,
        review: draft.review,
        submitted: Date.now(),
      })
      .then(() => {
        setRated(true);
        setRating(draft);
        setEditing(false);
        alert("success", rated ? "Rating updated." : "Rating submitted.");
      });
  };

  const deleteRating = () => {
    if (!user || !movie) return;
    api.delete(`/actions/rate/${movieId}`).then(() => {
      setRated(false);
      setRating(defaultRating);
      alert("success", "Rating deleted.");
    });
  };

  useEffect(() => {
    api
      .get(`/movies/${movieId}`)
      .then((response) => {
        setMovie(response.data);
      })
      .catch(() => {
        navigate("/404");
      });
    api.get(`/movies/${movieId}/ratings`).then((response) => {
      if (!response.data.others) {
        setRatings(response.data);
      } else {
        if (response.data.mine) {
          setRated(true);
          setRating({
            score: response.data.mine.score,
            review: response.data.mine.review,
          });
        }
        setRatings(response.data.others);
      }
      setReady(true);
    });
  }, [movieId]);

  return (
    ready &&
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
                {movie.title}
                <span> ({movie.release_date.split("-")[0]})</span>
              </span>
              <span>{formatGenres(movie.genres)}</span>
              <span>{formatRuntime(movie.runtime)}</span>
              <div style={{ marginTop: "20px", marginBottom: "60px" }}>
                <Stars score={movie.vote_average} />
              </div>
              <span className="italic text-lg mb-2">{movie.tagline}</span>
              <div className="mb-5">{movie.overview}</div>
              {user && (
                <div className="flex gap-3">
                  {!rated && (
                    <Button
                      icon
                      onClick={() => {
                        setDraft(rating);
                        setEditing(!editing);
                      }}
                    >
                      <LuStar className="text-xl" />
                      Rate
                    </Button>
                  )}
                  {watchlist.find((mov) => mov.id == movie.id) ? (
                    <Button icon onClick={removeWatchlist}>
                      <LuBookmarkMinus className="text-xl" />
                      Remove from Watchlist
                    </Button>
                  ) : (
                    <Button icon onClick={addWatchlist}>
                      <LuBookmarkPlus className="text-xl" />
                      Add to Watchlist
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="Details__ratings container mx-auto">
          {(rated || editing) && (
            <>
              <span className="text-2xl font-bold">
                {rated ? "Your Rating" : "New Rating"}
              </span>
              <div className="Details__form">
                <div className="Details__form__head">
                  <Stars
                    score={editing ? draft.score : rating.score}
                    {...(editing
                      ? {
                          onChange: (newScore: number) => {
                            setDraft({
                              ...rating,
                              score: newScore,
                            });
                          },
                        }
                      : {})}
                  />
                  {editing ? (
                    <div className="flex gap-2">
                      {JSON.stringify(draft) !== JSON.stringify(rating) && (
                        <Button onClick={submitRating}>
                          <LuCheck />
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          setDraft(rating);
                          setEditing(false);
                        }}
                      >
                        <LuX />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          setDraft(rating);
                          setEditing(true);
                        }}
                      >
                        <LuPencil />
                      </Button>
                      <Button
                        onClick={() => {
                          deleteRating();
                        }}
                      >
                        <LuTrash2 />
                      </Button>
                    </div>
                  )}
                </div>
                {editing ? (
                  <div className="Details__review">
                    <span>{draft.review ? draft.review : " "}</span>
                    <textarea
                      name="review"
                      value={draft.review}
                      placeholder="Review (optional)"
                      onChange={(e) => {
                        setDraft({ ...draft, review: e.target.value });
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                      autoComplete="off"
                    ></textarea>
                  </div>
                ) : (
                  <div className="Details__review">
                    {rating.review
                      ? rating.review
                      : "Your rating does not include a review."}
                  </div>
                )}
              </div>
            </>
          )}
          <span className="text-2xl font-bold">
            {ratings.length > 0
              ? "User Ratings"
              : rated
              ? "No Other Ratings Yet"
              : "No Ratings Yet"}
          </span>
          <div className="Details__ratings__list columns-1 md:columns-2 lg:columns-3">
            {ratings.map((r, i) => {
              return <Rating key={i} rating={r} />;
            })}
          </div>
        </div>
      </div>
    )
  );
}

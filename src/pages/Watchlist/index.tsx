import { useAuth } from "@/utils/auth";
import Tile from "@/components/Tile";
import { LuBookmarkMinus } from "react-icons/lu";
import { api } from "@/utils/api";

import "./styles.css";
import { Movie } from "@/utils/types";
import { useEffect, useState } from "react";
import { useAlert } from "@/utils/alert";

export default function Watchlist() {
  const { user } = useAuth();
  const { alert } = useAlert();
  const [watchlist, setWatchlist] = useState<Movie[]>([]);

  const removeWatchlist = (movieId: number) => {
    if (!user) return;
    api.delete(`/actions/watchlist/${movieId}`).then(() => {
      setWatchlist(watchlist.filter((mov) => mov.id != movieId));
      alert("success", "Removed from watchlist.");
    });
  };

  useEffect(() => {
    if (!user) return;
    api.get(`/users/${user.id}/watchlist`).then((response) => {
      setWatchlist(response.data);
    });
  }, []);

  return (
    user && (
      <div className="Watchlist container">
        <span className="text-2xl">
          My Watchlist <b>({watchlist.length})</b>
        </span>
        {watchlist.map((movie, i) => {
          return (
            <div key={i} className="Watchlist__Tile">
              <Tile movie={movie} />
              <div
                className="Watchlist__remove"
                onClick={() => {
                  removeWatchlist(movie.id);
                }}
              >
                <LuBookmarkMinus className="text-3xl sm:text-5xl lg:text-4xl" />
              </div>
            </div>
          );
        })}
      </div>
    )
  );
}

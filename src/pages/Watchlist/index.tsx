import { useAuth } from "@/utils/auth";
import Tile from "@/components/Tile";
import { LuBookmarkMinus } from "react-icons/lu";
import { api } from "@/utils/api";

import "./styles.css";

export default function Watchlist() {
  const { user, setUser } = useAuth();

  const removeWatchlist = (movieId: number) => {
    if (!user) return;
    api.post(`/movies/${movieId}/remove`).then(() => {
      setUser({
        ...user,
        watchlist: user.watchlist.filter((mov) => mov.id != movieId),
      });
    });
  };

  return (
    user && (
      <div className="Watchlist">
        <span className="text-2xl">
          My Watchlist <b>({user.watchlist.length})</b>
        </span>
        {user.watchlist.map((movie, i) => {
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

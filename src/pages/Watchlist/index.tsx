import { api, api_image_url } from "@/utils/api";
import { useAuth } from "@/utils/auth";

import "./styles.css";

export default function Watchlist() {
  const { user, setUser } = useAuth();

  const removeWatchlist = (movieId: number) => {
    if (!user) return;
    api.post(`/movies/${movieId}/remove`).then(() => {
      setUser({
        ...user,
        watchlist: user.watchlist.filter((id) => id != movieId),
      });
    });
  };

  return (
    user && (
      <div className="Watchlist">
        My Watchlist
        <div>
          {user.watchlist.map((movieId) => {
            return <li>{movieId}</li>;
          })}
        </div>
      </div>
    )
  );
}

import { useState, useEffect } from "react";
import { api } from "@/utils/api.js";
import Slider from "@/components/Slider";
import { useAuth } from "@/utils/auth";

import "./styles.css";

export default function Home() {
  const { user } = useAuth();
  const [playingMovies, setPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [ready, setReady] = useState(false);

  const fetchData = async () => {
    return Promise.all([
      api.get("/movies/playing").then((resp: any) => {
        setPlayingMovies(resp.data.results);
      }),
      api.get("/movies/top-rated").then((resp: any) => {
        setTopRatedMovies(resp.data.results);
      }),
      api.get("/movies/trending").then((resp: any) => {
        setTrendingMovies(resp.data.results);
      }),
    ]);
  };
  useEffect(() => {
    fetchData().then(() => {
      setReady(true);
    });
  }, []);
  return (
    ready && (
      <div className="Home">
        {user && (
          <span className="Home__welcome">
            Welcome back, <i>{user.username}</i>.
          </span>
        )}
        <Slider label="In Theaters Now" movies={playingMovies} />
        <Slider label="Top Rated" movies={topRatedMovies} />
        <Slider label="Trending Today" movies={trendingMovies} />
      </div>
    )
  );
}

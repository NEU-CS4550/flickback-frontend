import { useState, useEffect } from "react";
import { api } from "@/utils/api.js";

import "./styles.css";
import Slider from "@/components/Slider";

export default function Home() {
  const [playingMovies, setPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

  const fetchData = async () => {
    api.get("/movies/playing").then((resp: any) => {
      setPlayingMovies(resp.data.results);
    });
    api.get("/movies/popular").then((resp: any) => {
      setPopularMovies(resp.data.results);
    });
    api.get("/movies/trending").then((resp: any) => {
      setTrendingMovies(resp.data.results);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="Home">
      <Slider label="In Theaters Now" movies={playingMovies} />
      <Slider label="Trending Today" movies={trendingMovies} />
    </div>
  );
}

import { useState, useEffect } from "react";
import { instance } from "@/utils/api.js";

import "./styles.css";
import Slider from "@/components/Slider";

export default function Home() {
  const [playingMovies, setPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  const fetchData = async () => {
    instance.get("/movies/playing").then((resp: any) => {
      setPlayingMovies(resp.data.results);
    });
    instance.get("/movies/popular").then((resp: any) => {
      setPopularMovies(resp.data.results);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="Home">
      <Slider label="In Theaters Now" movies={playingMovies} />
      <Slider label="Popular Movies" movies={popularMovies} />
    </div>
  );
}

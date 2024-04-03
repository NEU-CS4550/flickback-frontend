import { useState, useEffect } from "react";
import { instance } from "@/utils/api.js";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState(["test"]);

  const fetchData = async () => {
    instance.get("/movies/popular").then((resp: any) => {
      console.log(resp);
      setPopularMovies(resp.data.results);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="Home__PopularMovies">
        {popularMovies.map((movie: any, i) => {
          console.log(movie);
          return <li key={i}>{movie.title}</li>;
        })}
      </div>
    </>
  );
}

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { Movie } from "@/utils/types";

export default function Details() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    api.get(`/movies/${movieId}`).then((response) => {
      setMovie(response.data);
    });
  }, [movieId]);

  return <>{movie && movie.original_title}</>;
}

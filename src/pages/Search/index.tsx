import { LuX } from "react-icons/lu";
import { useState, useCallback } from "react";
import { api } from "@/utils/api";
import debounce from "@/utils/debounce";

import "./styles.css";
import { Movie } from "@/utils/types";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);

  const search = debounce((q: string) => {
    api.post("/search", { query: q }).then((response) => {
      setResults(response.data.results);
    });
  }, 400);
  const dbRequest = useCallback((value: any) => search(value), []);

  return (
    <>
      <div className="Search">
        <div className="Search__wrapper w-screen max-w-screen-md mx-auto">
          <input
            className="Search__bar text-4xl"
            type="text"
            placeholder="search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              dbRequest(e.target.value);
            }}
          />
          <LuX
            className="Search__clear text-4xl"
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
          />
        </div>
      </div>
      {results.map((movie, i) => {
        return <li key={i}>{movie.original_title}</li>;
      })}
    </>
  );
}

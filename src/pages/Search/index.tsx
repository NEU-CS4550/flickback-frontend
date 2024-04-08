import { LuX } from "react-icons/lu";
import { useState, useCallback, useEffect } from "react";
import { api } from "@/utils/api";
import debounce from "@/utils/debounce";
import { Movie } from "@/utils/types";
import Tile from "@/components/Tile";
import { useSearchParams } from "react-router-dom";

import "./styles.css";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("query"));
  const [totalResults, setTotalResults] = useState(0);
  const [results, setResults] = useState<Movie[]>([]);

  const search = debounce((q: string) => {
    q = q.trim();
    if (q == "") return setResults([]);
    api.post("/search", { query: q }).then((response) => {
      setResults(response.data.results);
      setTotalResults(response.data.total_results);
    });
  }, 400);
  const dbRequest = useCallback((value: any) => search(value), []);

  useEffect(() => {
    search(query);
  }, []);

  return (
    <>
      <div className="Search">
        <div className="Search__wrapper w-screen max-w-screen-md mx-auto">
          <input
            className="Search__bar text-4xl"
            type="text"
            placeholder="search..."
            value={query ?? ""}
            onChange={(e) => {
              setQuery(e.target.value);
              params.set("query", e.target.value);
              setParams(params);
              dbRequest(e.target.value);
            }}
          />
          <LuX
            className="Search__clear text-4xl"
            onClick={() => {
              setQuery("");
              params.delete("query");
              setParams(params);
              setResults([]);
            }}
          />
        </div>
      </div>
      <div className="Search__results">
        {results.length > 0 && (
          <span className="text-2xl">
            <b>({totalResults})</b> Results
          </span>
        )}
        {results.map((movie, i) => {
          return <Tile key={i} movie={movie} />;
        })}
      </div>
    </>
  );
}

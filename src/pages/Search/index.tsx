import { LuX } from "react-icons/lu";
import { useState, useCallback, useEffect } from "react";
import { api } from "@/utils/api";
import { Movie } from "@/utils/types";
import { useSearchParams } from "react-router-dom";
import debounce from "@/utils/debounce";
import Tile from "@/components/Tile";

import "./styles.css";

export default function Search() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("query"));
  const [totalResults, setTotalResults] = useState(0);
  const [results, setResults] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const search = debounce((q: string) => {
    setPage(1);
    q = q.trim();
    if (q == "") return setResults([]);
    api.get(`/actions/search?query=${q}&page=${page}`).then((response) => {
      setResults(response.data.results);
      setTotalResults(response.data.total_results);
    });
  }, 400);

  const dbRequest = useCallback((value: any) => search(value), []);

  const scrollResults = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.body.scrollHeight
    ) {
      api
        .get(`/actions/search?query=${query}&page=${page + 1}`)
        .then((response) => {
          setResults((prevResults) => [
            ...prevResults,
            ...response.data.results,
          ]);
          setPage(page + 1);
        });
    }
  };

  useEffect(() => {
    search(query);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollResults);
    return () => window.removeEventListener("scroll", scrollResults);
  });

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

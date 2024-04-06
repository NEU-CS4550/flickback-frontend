import { LuX } from "react-icons/lu";
import { useState } from "react";

import "./styles.css";

export default function Search() {
  const [query, setQuery] = useState("");
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
            }}
          />
          <LuX
            className="Search__clear text-4xl"
            onClick={() => {
              setQuery("");
            }}
          />
        </div>
      </div>
    </>
  );
}

import { icons, IconType } from "@/app/_assets/Icons";
import React, { useState } from "react";
import Spinner from "../loaders";

export default function SearchBox({
  query,
  isSearching,
  setQuery,
}: {
  query: string;
  isSearching: boolean;
  setQuery: (q: string) => void;
}) {
  const [showOverlay, setShowOverlay] = useState(true);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  return (
    <div className="relative w-full h-[50px] flex items-center">
      <input
        className="w-full outline-none bg-slate-200 p-2 rounded-lg"
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowOverlay(false)}
        onBlur={() => setShowOverlay(query.length < 1)}
        value={query}
        placeholder="Search"
      />
      <div className="absolute right-2">
        {isSearching ? (
          <Spinner />
        ) : (
          query.length > 0 && (
            <button
              className="p-1 rounded-full bg-white"
              onClick={() => {
                setQuery("");
                setShowOverlay(true);
              }}
            >
              <div className="size-3">{icons[IconType.Cross]}</div>
            </button>
          )
        )}
      </div>
      {showOverlay && (
        <div className="absolute left-2 flex bg-slate-200">
          <div className="size-6 fill-placeholder">
            {icons[IconType.Search]}
          </div>
          <p className="text-placeholder ml-1">Search</p>
        </div>
      )}
    </div>
  );
}

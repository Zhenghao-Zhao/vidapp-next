import { icons, IconType } from "@/app/_components/ui/icons";
import useDebounce from "@/app/_libs/hooks/useDebounce";
import React, { useState } from "react";
import Throbber from "../loaders";

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
  const [draft, setDraft] = useState('');
  useDebounce(() => setQuery(draft), draft, 500)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="relative w-full h-[50px] flex items-center">
      <div className="absolute right-2 z-[100]">
        {isSearching ? (
          <Throbber />
        ) : (
          draft.length > 0 && (
            <button
              className="p-1 rounded-full bg-btn-hover-primary overflow-hidden"
              onClick={() => {
                setDraft("");
                setShowOverlay(true);
              }}
            >
              <div className="size-3">{icons[IconType.Cross]}</div>
            </button>
          )
        )}
      </div>
      {showOverlay && (
        <div className="absolute left-2 flex bg-modal-primary text-placeholder">
          <div className="size-6">{icons[IconType.Search]}</div>
          <p className="ml-1">Search</p>
        </div>
      )}
      <input
        className={`w-full outline-none p-2 rounded-lg bg-modal-primary absolute ${showOverlay && 'opacity-0'}`}
        onKeyDown={handleKeyDown}
        onChange={(e) => setDraft(e.target.value)}
        onFocus={() => setShowOverlay(false)}
        onBlur={() => setShowOverlay(draft.length < 1)}
        value={draft}
        placeholder="Search"
      />
    </div>
  );
}

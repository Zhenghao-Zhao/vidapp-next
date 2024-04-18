import { IconType, icons } from "@/app/_assets/Icons";
import React, { useRef, useState } from "react";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search"
      />
      {!isFocused && 
        <div className="absolute left-2 flex bg-slate-200">
          <div className="size-6 fill-placeholder">{icons[IconType.Search]}</div>
          <p className="text-placeholder">Search</p>
        </div>
      }
    </div>
  );
}

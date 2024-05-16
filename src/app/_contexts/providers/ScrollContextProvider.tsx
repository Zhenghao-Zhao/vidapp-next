"use client";
import { ReactNode, createContext, useContext, useState } from "react";

type ScrollContextType = {
  showScroll: boolean;
  setShowScroll: (b: boolean) => void;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export function useScrollContext() {
  const value = useContext(ScrollContext);
  if (value == null) throw Error("Cannot use outside of Provider");

  return value;
}

export default function ScrollContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showScroll, setShowScroll] = useState(false);

  return (
    <ScrollContext.Provider
      value={{
        showScroll,
        setShowScroll,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}

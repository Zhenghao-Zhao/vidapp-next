"use client";
import { createContext, useContext, useState } from "react";
import { Props } from "./common";

type OverlayContextType = {
  overlayIsShown: boolean;
  setOverlayIsShown: (b: boolean) => void;
  scrollTop: number;
  setScrollTop: (n: number) => void;
};

const OverlayContext = createContext<OverlayContextType | null>(null);

export function useOverlayContext() {
  const value = useContext(OverlayContext);
  if (value == null) throw Error("Cannot use outside of Overlay Provider");

  return value;
}

export default function OverlayContextProvider({ children }: Props) {
  const [overlayIsShown, setOverlayIsShown] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  return (
    <OverlayContext.Provider
      value={{
        overlayIsShown,
        scrollTop,
        setOverlayIsShown,
        setScrollTop,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
}

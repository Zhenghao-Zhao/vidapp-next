"use client";
import { ReactNode, createContext, useContext, useState } from "react";

type OverlayContextType = {
  showOverlay: boolean;
  setShowOverlay: (b: boolean) => void;
  scrollTop: number;
  setScrollTop: (n: number) => void;
};

const OverlayContext = createContext<OverlayContextType | null>(null);

export function useOverlayContext() {
  const value = useContext(OverlayContext);
  if (value == null) throw Error("Cannot use outside of Overlay Provider");

  return value;
}

export default function OverlayContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  return (
    <OverlayContext.Provider
      value={{
        showOverlay,
        scrollTop,
        setShowOverlay,
        setScrollTop,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
}

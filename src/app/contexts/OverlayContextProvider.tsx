'use client'
import React, { createContext, useContext, useState } from 'react'
import { Props } from './common';

type OverlayContextType = {
  showOverlayBackground: boolean;
  setShowOverlayBackground: (b: boolean) => void;
  scrollTop: number;
  setScrollTop: (n: number) => void;
}

const OverlayContext = createContext<OverlayContextType | null>(null);

export function useOverlayContext() {
  const value = useContext(OverlayContext);
  if (value == null) throw Error("Cannot use outside of Overlay Provider");

  return value;
}

export default function OverlayProvider({children}: Props) {
  const [showOverlayBackground, setShowOverlayBackground] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  return (
    <OverlayContext.Provider value={{
      showOverlayBackground, 
      setShowOverlayBackground, 
      scrollTop, 
      setScrollTop
    }}>
      {children}
    </OverlayContext.Provider>
  )
}

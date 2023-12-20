'use client'
import React, { createContext, useContext, useState } from 'react'
import { Props } from './common';

type OverlayContextType = {
  show: boolean;
  setShow: (b: boolean) => void;
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
  const [show, setShow] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);

  return (
    <OverlayContext.Provider value={{
      show, 
      setShow, 
      scrollTop, 
      setScrollTop
    }}>
      {children}
    </OverlayContext.Provider>
  )
}

'use client'

import { createContext, useContext, useState } from "react"
import { GuideTypes } from "../types/common";
import { Props } from "./common";
import { useOverlayContext } from "./OverlayContextProvider";

type GuidebarContextType = {
  guideLayout: GuideTypes | null;
  setGuideLayout: (g: GuideTypes | null) => void;
  showOverlayGuide: boolean;
  setOverlayGuide: (b: boolean) => void;
}
const GuidebarContext = createContext<GuidebarContextType | null>(null);

export function useGuidebarContext() {
  const value = useContext(GuidebarContext);
  if (value == null) throw Error("Cannot use outside of Guidebar Provider");

  return value;
}

export default function GuidebarContextProvider({ children } : Props) {
  const {setShow} = useOverlayContext();
  const [guideLayout, setGuideLayout] = useState<GuideTypes | null>(1); // 0: mini guide; 1: regular guide
  const [showOverlayGuide, setShowOverlayGuide] = useState<boolean>(false);

  const setOverlayGuide = (b: boolean) => {
    setShowOverlayGuide(b);
    setShow(b);
  }

  return (
    <GuidebarContext.Provider value={{guideLayout, setGuideLayout, showOverlayGuide, setOverlayGuide}}>
      {children}
    </GuidebarContext.Provider>
  )
}
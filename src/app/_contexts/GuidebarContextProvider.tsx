"use client";

import { createContext, useContext, useState } from "react";
import { GuideTypes } from "../_types/common";
import { Props } from "./common";
import { useOverlayContext } from "./OverlayContextProvider";

type GuidebarContextType = {
  guideLayout: GuideTypes | null;
  setGuideLayout: (g: GuideTypes | null) => void;
  showOverlayGuide: boolean;
  setOverlayGuide: (b: boolean) => void;
};
const GuidebarContext = createContext<GuidebarContextType | null>(null);

export function useGuidebarContext() {
  const value = useContext(GuidebarContext);
  if (value == null) throw Error("Cannot use outside of Guidebar Provider");

  return value;
}

export default function GuidebarContextProvider({ children }: Props) {
  const { setShowOverlayBackground } = useOverlayContext();
  const [guideLayout, setGuideLayout] = useState<GuideTypes | null>(
    GuideTypes.Regular
  ); // 0: mini guide; 1: regular guide
  const [showOverlayGuide, setShowOverlayGuide] = useState(false);

  const setOverlayGuide = (b: boolean) => {
    setShowOverlayGuide(b);
    setShowOverlayBackground(b);
  };

  return (
    <GuidebarContext.Provider
      value={{
        guideLayout,
        setGuideLayout,
        showOverlayGuide,
        setOverlayGuide,
      }}
    >
      {children}
    </GuidebarContext.Provider>
  );
}

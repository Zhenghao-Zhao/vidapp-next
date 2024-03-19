"use client";

import { createContext, useContext, useState } from "react";
import { GuideTypes } from "../_components/guide";
import { useOverlayContext } from "./OverlayContextProvider";
import { Props } from "./common";

type GuidebarContextType = {
  guideLayout: GuideTypes | null;
  showOverlayGuide: boolean;
  setGuideLayout: (g: GuideTypes | null) => void;
  setOverlayGuide: (b: boolean) => void;
};
const GuidebarContext = createContext<GuidebarContextType | null>(null);

export function useGuidebarContext() {
  const value = useContext(GuidebarContext);
  if (value == null) throw Error("Cannot use outside of Guidebar Provider");

  return value;
}

export default function GuidebarContextProvider({ children }: Props) {
  const { setOverlayIsShown } = useOverlayContext();
  const [guideLayout, setGuideLayout] = useState<GuideTypes | null>(
    GuideTypes.Regular
  ); // 0: mini guide; 1: regular guide
  const [showOverlayGuide, setShowOverlayGuide] = useState(false);

  const setOverlayGuide = (b: boolean) => {
    setShowOverlayGuide(b);
    setOverlayIsShown(b);
  };

  return (
    <GuidebarContext.Provider
      value={{
        guideLayout,
        showOverlayGuide,
        setGuideLayout,
        setOverlayGuide,
      }}
    >
      {children}
    </GuidebarContext.Provider>
  );
}

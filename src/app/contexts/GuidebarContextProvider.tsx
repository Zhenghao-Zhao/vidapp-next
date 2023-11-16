'use client'

import { ReactNode, createContext, useContext, useState } from "react"
import { GuideTypes } from "../types/common";


type GuidebarContextType = {
  guideLayout: GuideTypes | null;
  setGuideLayout: (g: GuideTypes | null) => void;
  showOverlay: boolean;
  setShowOverlay: (b: boolean) => void;
}
export const GuidebarContext = createContext<GuidebarContextType | null>(null);

type Props = {
  children: ReactNode
}


export function useGuidebarContext() {
  const value = useContext(GuidebarContext);
  if (value == null) throw Error("Cannot use outside of Guidebar Provider");

  return value;
}

export default function GuidebarContextProvider({ children } : Props) {

  const [guideLayout, setGuideLayout] = useState<GuideTypes | null>(1); // 0: mini guide; 1: regular guide
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  return (
    <GuidebarContext.Provider value={{guideLayout, setGuideLayout, showOverlay, setShowOverlay}}>
      {children}
    </GuidebarContext.Provider>
  )
}
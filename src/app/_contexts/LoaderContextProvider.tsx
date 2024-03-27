"use client";
import { createContext, useContext, useState } from "react";
import { Props } from "./common";

type LoaderContextType = {
  show: boolean;
  setShowLoader: (b: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType | null>(null);

export function useLoaderContext() {
  const value = useContext(LoaderContext);
  if (value == null) throw Error("Cannot use outside of Overlay Provider");

  return value;
}

export default function LoaderContextProvider({ children }: Props) {
  const [showLoader, setShowLoader] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        show: showLoader,
        setShowLoader,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

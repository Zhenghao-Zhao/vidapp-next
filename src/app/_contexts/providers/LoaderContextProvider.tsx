"use client";
import { ReactNode, createContext, useContext, useState } from "react";

type LoaderContextType = {
  show: boolean;
  setShowLoader: (b: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType | null>(null);

export function useLoaderContext() {
  const value = useContext(LoaderContext);
  if (value == null) throw Error("Cannot use outside of Provider");

  return value;
}

export default function LoaderContextProvider({
  children,
}: {
  children: ReactNode;
}) {
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

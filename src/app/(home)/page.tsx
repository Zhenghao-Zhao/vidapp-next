"use client";
import { useEffect } from "react";
import ChipBar from "../_components/chipbar";
import ImagePanel from "../_components/images/ImagePanel";
import { useLoaderContext } from "../_contexts/LoaderContextProvider";
import usePageLoader from "../_hooks/usePageLoader";

export default function Home() {
  usePageLoader();

  return (
    <div className="w-full h-full">
      <ChipBar />
      <ImagePanel />
    </div>
  );
}

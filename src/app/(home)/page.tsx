"use client";
import ChipBar from "../_components/chipbar";
import ImagePanel from "../_components/images/ImagePanel";
import { useDataContext } from "../_contexts/providers/DataContextProvider";
import usePageLoader from "../_hooks/usePageLoader";

export default function Home() {
  usePageLoader();
  return (
    <div className="w-full h-full">
      { <ChipBar />}
      <ImagePanel />
    </div>
  );
}


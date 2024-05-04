"use client";
import ChipBar from "../_components/chipbar";
import usePageLoader from "../_hooks/usePageLoader";
import ImagePanel from "../_image/images/ImagePanel";

export default function Home() {
  usePageLoader();
  return (
    <div className="w-full h-full">
      <ChipBar />
      <ImagePanel />
    </div>
  );
}


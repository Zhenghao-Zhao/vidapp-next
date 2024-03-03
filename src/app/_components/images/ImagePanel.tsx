import useFetchImages from "@/app/_hooks/useFetchImages";
import { Photo } from "@/app/_schema/schema";
import React, { useCallback, useRef, useState } from "react";
import { BlurPhoto } from "./BlurPhoto";

export default function ImagePanel() {
  const [pageNum, setPageNum] = useState(1);
  const [readyPhotoCount, setReadyPhotoCount] = useState(0);
  const { data }: { data: Photo[] } = useFetchImages(pageNum);

  const observer = useRef<IntersectionObserver>();

  const lastImageRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (data.length - readyPhotoCount > 2) return;
        if (entries[0].isIntersecting) {
          setPageNum((pageNum) => pageNum + 1);
        }
      });
      observer.current.observe(node);
    },
    [readyPhotoCount, data.length]
  );

  const picElements = data.map((p, index) => (
    <BlurPhoto key={index} photo={p} setReadyPhotoCount={setReadyPhotoCount} />
  ));

  return (
    <div className="grid gap-3 w-full h-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] mt-4">
      {picElements}
      <>
        <div className="aspect-w-3 aspect-h-2 animate-pulse w-full bg-slate-200 rounded-lg" />
        <div className="aspect-w-3 aspect-h-2 animate-pulse w-full bg-slate-200 rounded-lg" />
        <div className="aspect-w-3 aspect-h-2 animate-pulse w-full bg-slate-200 rounded-lg" />
        <div
          ref={lastImageRef}
          className="aspect-w-3 aspect-h-2 animate-pulse w-full bg-slate-200 rounded-lg"
        />
      </>
    </div>
  );
}

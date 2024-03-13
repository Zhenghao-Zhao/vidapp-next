import useFetchImages from "@/app/_hooks/useFetchImages";
import { Photo } from "@/app/_schema";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BlurPhoto } from "./BlurPhoto";
import Head from "next/head";
import usePreloadImages from "@/app/_hooks/usePreloadImages";

export function getURLs(data: Photo[]): string[] {
  return data.map((photo) => {
    return photo.src.original;
  });
}

export default function ImagePanel() {
  const [pageNum, setPageNum] = useState(1);
  const { photos, isReady }: { photos: Photo[]; isReady: boolean } =
    useFetchImages(pageNum);
  const observer = useRef<IntersectionObserver>();
  
  const lastImageRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (!isReady) return;
        if (entries[0].isIntersecting) {
          setPageNum((pageNum) => pageNum + 1);
        }
      });
      observer.current.observe(node);
    },
    [isReady]
  );

  const picElements = photos.map((p, index) => (
    <BlurPhoto key={index} photo={p} />
  ));

  return (
    <div className="grid gap-3 w-full h-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] mt-4">
      {picElements}
      {!isReady && (
        <>
          <div className="aspect-w-3 aspect-h-2 animate-pulse w-full bg-slate-200 rounded-lg" />
          <div className="aspect-w-3 aspect-h-2 animate-pulse w-full bg-slate-200 rounded-lg" />
          <div className="aspect-w-3 aspect-h-2 animate-pulse w-full bg-slate-200 rounded-lg" />
        </>
      )}
      <div ref={lastImageRef} />
    </div>
  );
}

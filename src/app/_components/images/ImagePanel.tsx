import useFetchImages, { COUNT_PER_PAGE } from "@/app/_hooks/useFetchImages";
import { Photo } from "@/app/_types/schema";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { BlurImage } from "./BlurImage";
import { ImageLoader } from "../loaders";

const loaders = Array.from({ length: COUNT_PER_PAGE }).map((_, index) => (
  <ImageLoader key={index} />
));

export default function ImagePanel() {
  const [pageNum, setPageNum] = useState(1);
  const { data }: { data: Photo[] } =
    useFetchImages(pageNum);

  const observer = useRef<IntersectionObserver>();

  const lastImageRef = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNum((pageNum) => pageNum + 1);
      }
    });
    observer.current.observe(node);
  }, []);

  const picElements = data.map((p, index) => {
    return index + 1 === data.length ? (
      <BlurImage ref={lastImageRef} key={index} photo={p} />
    ) : (
      <BlurImage key={index} photo={p} />
    );
  });

  return (
    <div className="grid gap-3 w-full h-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] mt-4">
      {picElements}
      {loaders}
    </div>
  );
}

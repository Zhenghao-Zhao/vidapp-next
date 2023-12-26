import useFetchImages from "@/app/_hooks/useFetchImages";
import { Photo } from "@/app/_types/schema";
import React, { useCallback, useRef, useState } from "react";
import { BlurImage } from "./BlurImage";

export default function ImagePanel() {
  const [pageNum, setPageNum] = useState(1);
  const { data }: { data: Photo[] } = useFetchImages(pageNum);

  const observer = useRef<IntersectionObserver>();

  const lastImageRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node || data[0] === undefined) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNum((pageNum) => pageNum + 1);
        }
      });
      observer.current.observe(node);
    },
    [data]
  );

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
    </div>
  );
}

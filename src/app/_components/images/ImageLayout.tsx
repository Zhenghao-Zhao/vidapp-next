import React, { RefObject, useCallback, useRef, useState } from "react";
import { BlurImage } from "./BlurImage";
import { Post } from "@/app/_schema/schema";
import { ENV } from "@/app/env";
import { R2_BUCKET_URL_DEV, R2_BUCKET_URL_PUBLIC } from "@/app/constants";

export default function ImageLayout({
  goToNextPage,
  posts,
}: {
  goToNextPage: () => void;
  posts: Post[];
}) {
  const observer = useRef<IntersectionObserver>();
  const [readyImageCount, setReadyImageCount] = useState(0);

  const addReadyImageCount = () => {
    setReadyImageCount((prev) => prev + 1);
  };

  const lastImageRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (posts.length - readyImageCount > 2) return;
        if (entries[0].isIntersecting) {
          console.log("here")
          // goToNextPage();
        }
      });
      observer.current.observe(node);
    },
    [readyImageCount, posts, goToNextPage]
  );
  const picElements = posts.map((p, index) => {
    const imageURL = R2_BUCKET_URL_PUBLIC + "/" + p.Images[0].filename;
    return index === posts.length - 1 ? (
      <BlurImage
        key={index}
        src={imageURL}
        alt="uploadImage"
        addReadyImageCount={addReadyImageCount}
        ref={lastImageRef}
      />
    ) : (
      <BlurImage
        key={index}
        src={imageURL}
        alt="uploadImage"
        addReadyImageCount={addReadyImageCount}
        ref={lastImageRef}
      />
    );
  });

  return (
    <div className="grid gap-3 w-full h-full grid-cols-[repeat(auto-fill,minmax(320px,1fr))] mt-4">
      {picElements}
      {/* <>
        <div
          ref={lastImageRef}
          className="aspect-w-3 aspect-h-2 animate-pulse w-full bg-slate-200 rounded-lg"
        />
      </> */}
    </div>
  );
}

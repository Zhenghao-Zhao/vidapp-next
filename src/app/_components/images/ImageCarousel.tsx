import { IconType } from "@/app/_assets/Icons";
import Image from "next/image";
import React, { useRef, useState } from "react";
import IconButton from "../common/buttons/IconButton";
import ZoomBar from "./ZoomBar";

export default function ImageCarousel({
  dataURLs: dataURLs,
}: {
  dataURLs: string[];
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const [scale, setScale] = useState(1)
  const listRef = useRef<HTMLDivElement>(null);
  const handleLeftClick = () => {
    if (!listRef.current) return;
    listRef.current.scrollLeft -= 800;
    setCurrentImage((prev) => prev - 1);
  };
  const handleRightClick = () => {
    if (!listRef.current) return;
    listRef.current.scrollLeft += 800;
    setCurrentImage((prev) => prev + 1);
  };

  return (
    <div className="flex items-center justify-center h-full w-full relative">
      <div
        className={`flex h-full w-full overflow-hidden scroll-smooth duration-75`}
        ref={listRef}
        style={{transform: `scale(${scale})`}}
      >
        {dataURLs.map((url, index) => (
          <div key={index} className="h-full w-full shrink-0 relative">
            <Image
              src={url}
              fill={true}
              alt="Upload Image"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {currentImage > 0 && (
        <div className="absolute left-2">
          {
            <IconButton
              icon={IconType.ArrowLeft}
              handleClick={handleLeftClick}
              className="backdrop-blur-xl bg-black bg-opacity-20"
              fill="text-white"
            />
          }
        </div>
      )}
      {currentImage < dataURLs.length - 1 && (
        <div className="absolute right-2">
          {
            <IconButton
              icon={IconType.ArrowRight}
              handleClick={handleRightClick}
              className="backdrop-blur-xl bg-black bg-opacity-20"
              fill="text-white"
            />
          }
        </div>
      )}
      <ZoomBar setScale={setScale} />
    </div>
  );
}

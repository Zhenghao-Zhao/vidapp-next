import { IconType } from "@/app/_assets/Icons";
import Image from "next/image";
import React, { useRef, useState } from "react";
import IconButton from "../common/buttons/IconButton";
import ResizeableImage from "./ResizeableImage";

export default function ImageCarousel({
  dataURLs: dataURLs,
}: {
  dataURLs: string[];
}) {
  const [currentImage, setCurrentImage] = useState(0);
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
      <div className={`flex h-full w-full overflow-hidden`} ref={listRef}>
        {dataURLs.map((url, index) => (
          <div key={index} className="h-full w-full shrink-0 ">
            <ResizeableImage isCurrent={index === currentImage}>
              <Image
                src={url}
                fill={true}
                alt="Upload Image"
                className="object-cover"
              />
            </ResizeableImage>
          </div>
        ))}
      </div>
      {dataURLs.length > 1 && <Indicator imageCount={dataURLs.length} currIndex={currentImage} />}
      {currentImage > 0 && (
        <div className="absolute left-2 z-20">
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
        <div className="absolute right-2 z-20">
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
    </div>
  );
}

function Indicator({
  imageCount,
  currIndex,
}: {
  imageCount: number;
  currIndex: number;
}) {
  return (
    <div className="bg-black p-2 rounded-xl bg-opacity-20 flex items-center absolute bottom-4 gap-2 z-20">
      {Array.from({ length: imageCount }).map((_, i) => (
        <div
          key={i}
          className={`w-[6px] h-[6px] transition-colors duration-200 ease-in-out rounded-full ${
            i === currIndex ? "bg-white" : "bg-black"
          }`}
        />
      ))}
    </div>
  );
}

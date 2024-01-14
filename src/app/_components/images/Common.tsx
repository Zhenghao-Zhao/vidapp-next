import { IconType } from "@/app/_assets/Icons";
import Image from "next/image";
import { useState, useRef } from "react";
import IconButton from "../common/buttons/IconButton";
export function ImageCarousel({
  dataURLs,
  width,
  height,
}: {
  dataURLs: string[];
  width: number;
  height: number;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const handleLeftClick = () => {
    if (!listRef.current) return;
    listRef.current.scrollLeft -= width;
    setCurrentImage((prev) => prev - 1);
  };
  const handleRightClick = () => {
    if (!listRef.current) return;
    listRef.current.scrollLeft += width;
    setCurrentImage((prev) => prev + 1);
  };
  return (
    <div className="flex relative items-center justify-center">
      <div
        className="relative flex bg-white overflow-hidden"
        style={{ width, height }}
        ref={listRef}
      >
        {dataURLs.map((url, i) => (
          <div key={i} className="relative w-full h-full shrink-0">
            <Image
              src={url}
              alt="upload image"
              className="object-cover"
              fill={true}
            />
          </div>
        ))}
      </div>
      {dataURLs.length > 1 && (
        <Indicator imageCount={dataURLs.length} currIndex={currentImage} />
      )}
      {currentImage > 0 && (
        <div className="absolute left-2 z-10">
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
        <div className="absolute right-2 z-10">
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

export function Indicator({
  imageCount,
  currIndex,
}: {
  imageCount: number;
  currIndex: number;
}) {
  return (
    <div className="bg-black p-2 rounded-xl bg-opacity-20 flex items-center absolute bottom-4 gap-2 z-10">
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

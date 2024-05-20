import { IconType } from "@/app/_icons";
import Image from "next/image";
import { ReactNode, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import IconButton from "../../ui/buttons/iconButton";

export function ImageSlider({ dataURLs }: { dataURLs: string[] }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [translateBy, setTranslateBy] = useState(0);
  const displayRef = useRef<HTMLDivElement>(null);

  const changeSlide = (n: 1 | -1) => {
    if (!displayRef.current) return;
    setTranslateBy((prev) => prev - displayRef.current!.offsetWidth * n);
    setImageIndex((prev) => prev + n);
  };
  return (
    <div
      className={`flex w-full h-full justify-center items-center bg-background-primary relative overflow-hidden`}
    >
      <div
        className="flex w-full h-full transition-all ease-out duration-300"
        style={{ transform: `translate(${translateBy}px)` }}
        ref={displayRef}
      >
        {dataURLs.map((url, i) => (
          <div key={i} className="shrink-0 w-full h-full relative">
            <Image
              src={url}
              className="object-cover w-full h-full"
              alt="post image"
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
      {dataURLs && dataURLs.length > 1 && (
        <IndexDots count={dataURLs.length} currIndex={imageIndex} />
      )}
      {imageIndex > 0 && (
        <IndexArrow direction="l" onClick={() => changeSlide(-1)} />
      )}
      {dataURLs && imageIndex < dataURLs.length - 1 && (
        <IndexArrow direction="r" onClick={() => changeSlide(1)} />
      )}
    </div>
  );
}

export function IndexDots({
  count,
  currIndex,
}: {
  count: number;
  currIndex: number;
}) {
  return (
    <div className="bg-black p-2 rounded-xl bg-opacity-20 flex items-center absolute bottom-4 gap-2 z-10">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`w-[6px] h-[6px] transition-colors duration-100 ease-in-out rounded-full ${
            i === currIndex ? "bg-white" : "bg-black"
          }`}
        />
      ))}
    </div>
  );
}

export default function Carousel({
  childIndex,
  updateChildIndex: changeIndex,
  length,
  className,
  children,
}: {
  childIndex: number;
  updateChildIndex: (i: number) => void;
  length: number;
  className?: string;
  children: ReactNode;
}) {
  const changeSlide = (n: 1 | -1) => {
    changeIndex(childIndex + n);
  };
  return (
    <div
      className={twMerge(
        "w-full h-full flex justify-center items-center relative",
        className
      )}
    >
      {children}
      {length > 1 && <IndexDots count={length} currIndex={childIndex} />}
      {childIndex > 0 && (
        <IndexArrow direction="l" onClick={() => changeSlide(-1)} />
      )}
      {childIndex < length - 1 && (
        <IndexArrow direction="r" onClick={() => changeSlide(1)} />
      )}
    </div>
  );
}

function IndexArrow({
  direction,
  onClick,
}: {
  direction: "l" | "r";
  onClick: () => void;
}) {
  return (
    <div
      className={`absolute z-10 ${direction === "l" ? "left-2" : "right-2"}`}
    >
      <IconButton
        icon={direction === "l" ? IconType.ArrowLeft : IconType.ArrowRight}
        handleClick={onClick}
        className="backdrop-blur-xl bg-opacity-20 text-white p-1 hover:bg-btn-hover-transparent"
      />
    </div>
  );
}

export function SpacedCarousel({ dataURLs, imageSize=400 }: { dataURLs: string[], imageSize?: number }) {
  const imageGroupRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  // const imageSize = imageRef.current!.offsetWidth;
  const HEIGHT = imageSize;
  const WIDTH = imageSize + 100;
  const MIN_SCROLL = HEIGHT - (WIDTH - HEIGHT) / 2;

  const handleClick = (leftOrRight: -1 | 1) => {
    if (!imageGroupRef || !imageGroupRef.current) return;
    imageGroupRef.current.scrollLeft +=
      (imageIndex === 0 || imageIndex === dataURLs.length - 1
        ? MIN_SCROLL
        : HEIGHT) * leftOrRight;
    setImageIndex(
      Math.min(Math.max(imageIndex + leftOrRight, 0), dataURLs.length - 1)
    );
  };
  return (
    <div className={`w-full h-full relative grid items-center`}>
      <div ref={imageGroupRef} className="flex overflow-hidden scroll-smooth">
        {dataURLs.map((url: string, i) => {
          return (
            <Image
              ref={imageRef}
              key={i}
              src={url}
              className="object-cover w-full h-full"
              alt="post image"
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          );
        })}
      </div>
      {dataURLs && dataURLs.length > 1 && (
        <IndexDots count={dataURLs.length} currIndex={imageIndex} />
      )}
      <IndexArrow onClick={() => handleClick(1)} direction="r" />
      <IndexArrow onClick={() => handleClick(-1)} direction="l" />
    </div>
  );
}

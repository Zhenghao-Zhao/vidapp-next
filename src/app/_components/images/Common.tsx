import { IconType } from "@/app/_assets/Icons";
import { useState, useRef, useEffect, ReactNode } from "react";
import IconButton from "../common/buttons/IconButton";
import { twMerge } from "tailwind-merge";

export function ImageSlider({
  dataURLs,
  children,
}: {
  dataURLs: string[];
  children: ReactNode;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [translateBy, setTranslateBy] = useState(0);
  const displayRef = useRef<HTMLDivElement>(null);
  const currentImageRef = useRef(0);

  useEffect(() => {
    function handleResize() {
      if (!displayRef.current) return;
      setTranslateBy(-currentImageRef.current * displayRef.current.offsetWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    currentImageRef.current = imageIndex;
  }, [imageIndex]);

  const changeSlide = (n: 1 | -1) => {
    if (!displayRef.current) return;
    setTranslateBy((prev) => prev - displayRef.current!.offsetWidth * n);
    setImageIndex((prev) => prev + n);
  };

  return (
    <div
      className={`flex w-full h-full justify-center items-center bg-white relative`}
    >
      <div
        className="flex w-full h-full relative"
        style={{ transform: `translate(${translateBy}px)` }}
        ref={displayRef}
      >
        {children}
      </div>
      {dataURLs && dataURLs.length > 1 && (
        <IndexDots count={dataURLs.length} currIndex={imageIndex} />
      )}
      {imageIndex > 0 && (
        <div className="absolute left-2 z-10">
          {
            <IconButton
              icon={IconType.ArrowLeft}
              handleClick={() => changeSlide(-1)}
              className="backdrop-blur-xl bg-black bg-opacity-20"
              fill="text-white"
            />
          }
        </div>
      )}
      {dataURLs && imageIndex < dataURLs.length - 1 && (
        <div className="absolute right-2 z-10">
          {
            <IconButton
              icon={IconType.ArrowRight}
              handleClick={() => changeSlide(1)}
              className="backdrop-blur-xl bg-black bg-opacity-20"
              fill="text-white"
            />
          }
        </div>
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
      {
        <IconButton
          icon={direction === "l" ? IconType.ArrowLeft : IconType.ArrowRight}
          handleClick={onClick}
          className="backdrop-blur-xl bg-black bg-opacity-20"
          fill="text-white"
        />
      }
    </div>
  );
}
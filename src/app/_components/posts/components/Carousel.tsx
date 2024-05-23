import { IconType } from "@/app/_components/ui/icons";
import Image from "next/image";
import { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import IconButton from "../../ui/buttons/iconButton";
import useIntersectionObserver from "@/app/_libs/hooks/useIntersectionObserver";
import useEndOfCarousel from "@/app/_libs/hooks/useEndOfCarousel";

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
        <IndexArrow
          direction="l"
          onClick={() => changeSlide(-1)}
          className="absolute left-2"
        />
      )}
      {dataURLs && imageIndex < dataURLs.length - 1 && (
        <IndexArrow
          direction="r"
          onClick={() => changeSlide(1)}
          className="absolute right-2"
        />
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
        <IndexArrow
          direction="l"
          onClick={() => changeSlide(-1)}
          className="absolute"
        />
      )}
      {childIndex < length - 1 && (
        <IndexArrow
          direction="r"
          onClick={() => changeSlide(1)}
          className="absolute"
        />
      )}
    </div>
  );
}

function IndexArrow({
  direction,
  onClick,
  className,
}: {
  direction: "l" | "r";
  onClick: () => void;
  className?: string;
}) {
  return (
    <IconButton
      icon={direction === "l" ? IconType.ArrowLeft : IconType.ArrowRight}
      handleClick={onClick}
      className={twMerge(
        "backdrop-blur-xl bg-opacity-20 text-text-primary p-1 hover:bg-btn-hover-transparent",
        className
      )}
    />
  );
}

export function SpacedCarousel({ dataURLs }: { dataURLs: string[] }) {
  const imageGroupRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { leftRef, rightRef, leftDisabled, rightDisabled } = useEndOfCarousel();

  const handleClick = (leftOrRight: -1 | 1) => {
    if (!imageGroupRef || !imageGroupRef.current) return;
    const height = imageGroupRef.current.offsetHeight;
    imageGroupRef.current.scrollLeft += (height + 30) * leftOrRight;
  };

  return (
    <div className="w-full h-full relative flex justify-center items-center px-carousel-arrow-width">
      <div className="w-full h-full flex justify-center items-center">
        <div
          className="overflow-hidden scroll-smooth flex h-full w-full"
          ref={imageGroupRef}
        >
          <div ref={leftRef} />
          <div className="grid grid-rows-1 grid-flow-col gap-[30px]">
            {dataURLs.map((url: string, i) => {
              return (
                <div
                  key={i}
                  className="relative h-full aspect-1"
                >
                  <Image
                    ref={imageRef}
                    src={url}
                    className="object-cover w-full h-full"
                    alt="post image"
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              );
            })}
          </div>
          <div ref={rightRef} />
        </div>
      </div>
      {!leftDisabled && (
        <IndexArrow
          onClick={() => handleClick(-1)}
          direction="l"
          className="absolute left-0 h-full rounded-md"
        />
      )}
      {!rightDisabled && (
        <IndexArrow
          onClick={() => handleClick(1)}
          direction="r"
          className="absolute right-0 h-full rounded-md"
        />
      )}
    </div>
  );
}

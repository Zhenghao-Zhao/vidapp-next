import { IconType } from "@/app/_assets/Icons";
import Image from "next/image";
import { useState, useRef, RefObject, useEffect } from "react";
import IconButton from "../common/buttons/IconButton";
import AdjustableImage from "./AdjustableImage";

export function ImageSlider({ dataURLs }: { dataURLs: string[] }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [translateBy, setTranslateBy] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const currentImageRef = useRef(0);

  useEffect(() => {
    function handleResize() {
      if (!listRef.current) return;
      setTranslateBy(
        -currentImageRef.current * listRef.current.offsetWidth
      );
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    currentImageRef.current = imageIndex;
  }, [imageIndex]);

  const changeSlide = (n: 1 | -1) => {
    if (!listRef.current) return;
    setTranslateBy(prev => prev - listRef.current!.offsetWidth * n);
    setImageIndex(prev => prev + n)
  }

  return (
    <div className="flex relative items-center justify-center shrink-0 w-full h-full">
      <div
        className="relative flex bg-white overflow-hidden w-full h-full"
        ref={listRef}
      >
        <div
          className="flex relative w-full h-full shrink-0"
          style={{ transform: `translate(${translateBy}px)` }}
        >
          {dataURLs.map((url, i) => (
            <div key={i} className="relative shrink-0 w-full h-full">
              <Image
                src={url}
                alt="upload image"
                className="object-cover"
                fill={true}
              />
            </div>
          ))}
        </div>
      </div>
      {dataURLs.length > 1 && (
        <IndexDot imageCount={dataURLs.length} currIndex={imageIndex} />
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
      {imageIndex < dataURLs.length - 1 && (
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

export function ImageSliderCropper({
  dataURLs,
  canvasArrayRef,
  visible,
}: {
  dataURLs: string[];
  canvasArrayRef: RefObject<RefObject<HTMLCanvasElement>[]>;
  visible: boolean;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [translateBy, setTranslateBy] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const currentImageRef = useRef(0);

  useEffect(() => {
    function handleResize() {
      if (!listRef.current) return;
      setTranslateBy(
        -currentImageRef.current * listRef.current.offsetWidth
      );
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    currentImageRef.current = imageIndex;
  }, [imageIndex]);

  const changeSlide = (n: 1 | -1) => {
    if (!listRef.current) return;
    setTranslateBy(prev => prev - listRef.current!.offsetWidth * n);
    setImageIndex(prev => prev + n)
  }

  return (
    <div
      className={`flex w-full h-full justify-center items-center ${
        !visible && "hidden"
      }`}
    >
      <div
        className={`flex overflow-hidden w-full h-full bg-white relative shrink-0`}
        ref={listRef}
      >
        <div
          className="flex w-full h-full relative shrink-0"
          style={{ transform: `translate(${translateBy}px)` }}
        >
          {dataURLs &&
            dataURLs.map((url, index) => (
              <div
                key={index}
                className={`flex h-full w-full shrink-0 overflow-hidden`}
              >
                <AdjustableImage
                  canvasArrayRef={canvasArrayRef}
                  dataUrl={url}
                  index={index}
                />
              </div>
            ))}
        </div>
      </div>
      {dataURLs && dataURLs.length > 1 && (
        <IndexDot imageCount={dataURLs.length} currIndex={imageIndex} />
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

export function IndexDot({
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

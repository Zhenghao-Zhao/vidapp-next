import React, { RefObject, useEffect, useRef, useState } from "react";
import Dragbar from "./DragBar";
import Image from "next/image";

export default function AdjustableImage({
  dataUrl,
  index,
  canvasArrayRef,
}: {
  dataUrl: string;
  index: number;
  canvasArrayRef: RefObject<RefObject<HTMLCanvasElement>[]>;
}) {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [initImageSize, setInitImageSize] = useState({ width: 0, height: 0 });
  const scaleRef = useRef(1);
  const prevRef = useRef({ x: 0, y: 0 });
  const translateRef = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const marginRef = useRef({ bottom: 0, right: 0 });
  const [refresh, setRefresh] = useState({});

  const handleImageLoad = () => {
    if (!containerRef.current || !imageRef.current) return;
    if (
      imageRef.current.naturalHeight === 0 ||
      imageRef.current.naturalWidth === 0
    )
      throw new Error("image size cannot be zero");
    const naturalHeight = imageRef.current.naturalHeight;
    const naturalWidth = imageRef.current.naturalWidth;
    if (naturalWidth === 0 || naturalHeight === 0) return;
    const ratio = naturalHeight / naturalWidth;
    const containerSize = containerRef.current.offsetWidth;
    if (naturalHeight > naturalWidth) {
      setInitImageSize({
        width: containerSize,
        height: containerSize * ratio,
      });
    } else {
      setInitImageSize({
        width: containerSize / ratio,
        height: containerSize,
      });
    }
  };

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    if (!canvasArrayRef.current) return;
    canvasArrayRef.current[index] = canvasRef;
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scale]);

  useEffect(() => {
    if (!containerRef.current || !imageWrapperRef.current) return;
    marginRef.current = {
      bottom:
        (initImageSize.height * scale -
          containerRef.current.offsetHeight) /
        2,
      right:
        (initImageSize.width * scale -
          containerRef.current.offsetWidth) /
        2,
    };
  }, [scale, initImageSize]);

  useEffect(() => {
    if (
      !canvasRef.current ||
      !imageRef.current ||
      !containerRef.current ||
      initImageSize.width === 0 ||
      initImageSize.height === 0
    )
      return;
    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width =
      containerRef.current.offsetWidth;
    canvasRef.current.height =
      containerRef.current.offsetHeight

    const naturalX =
      ((marginRef.current.right - translateRef.current.x) /
        (initImageSize.width * scale)) *
      imageRef.current.naturalWidth;
    const naturalY =
      ((marginRef.current.bottom - translateRef.current.y) /
        (initImageSize.height * scale)) *
      imageRef.current.naturalHeight;
    const clipWidth =
      (containerRef.current.offsetWidth /
        (initImageSize.width * scale)) *
      imageRef.current.naturalWidth;
    const clipHeight =
      (containerRef.current.offsetHeight /
        (initImageSize.height * scale)) *
      imageRef.current.naturalHeight;
    ctx?.drawImage(
      imageRef.current,
      naturalX,
      naturalY,
      clipWidth,
      clipHeight,
      0,
      0,
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight
    );
  }, [refresh, initImageSize, scale]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    prevRef.current = { x: e.pageX, y: e.pageY };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    let dx = e.pageX - prevRef.current.x;
    let dy = e.pageY - prevRef.current.y;
    translateRef.current = {
      x: translateRef.current.x + dx,
      y: translateRef.current.y + dy,
    };
    prevRef.current = { x: e.pageX, y: e.pageY };
    if (!imageWrapperRef.current) return;
    imageWrapperRef.current.style.transform = `translate3d(${translateRef.current.x}px,
      ${translateRef.current.y}px, 0px) scale(${scaleRef.current})`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const x = Math.min(
      Math.max(translateRef.current.x, -marginRef.current.right),
      marginRef.current.right
    );
    const y = Math.min(
      Math.max(translateRef.current.y, -marginRef.current.bottom),
      marginRef.current.bottom
    );
    translateRef.current = { x, y };
    imageWrapperRef.current!.style.transform = `translate3d(${translateRef.current.x}px,
      ${translateRef.current.y}px, 0px) scale(${scaleRef.current})`;
    setRefresh({});
  };

  return (
    <div className="flex w-full h-full">
      <div
        className={`relative flex items-center justify-center w-full h-full`}
      >
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          className=" w-full h-full flex justify-center items-center"
        >
          <div
            ref={imageWrapperRef}
            className="transition-all ease-out relative shrink-0"
            style={{
              transform: `translate3d(${translateRef.current.x}px,
              ${translateRef.current.y}px, 0px) scale(${scale})`,
              width: initImageSize.width,
              height: initImageSize.height,
            }}
          >
            <Image
              src={dataUrl}
              fill={true}
              alt="Upload Image"
              className="object-cover select-none"
              ref={imageRef}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <canvas ref={canvasRef} className="absolute bg-slate-500 hidden" />
        <div className="absolute bottom-2 left-2">
          <Dragbar setScale={setScale} />
        </div>
      </div>
    </div>
  );
}

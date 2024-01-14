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
  const prevRef = useRef({ x: 0, y: 0 });
  const translateRef = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const marginRef = useRef({ bottom: 0, right: 0 });
  const [refresh, setRefresh] = useState({});

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
    if (!containerRef.current) return;
    marginRef.current = {
      bottom: ((scale - 1) * containerRef.current.offsetWidth) / 2,
      right: ((scale - 1) * containerRef.current.offsetHeight) / 2,
    };
  }, [scale]);

  useEffect(() => {
    if (!canvasRef.current || !imageRef.current || !containerRef.current)
      return;
    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = containerRef.current.offsetWidth;
    canvasRef.current.height = containerRef.current.offsetHeight;
    const naturalX =
      ((marginRef.current.right - translateRef.current.x) /
        imageRef.current.getBoundingClientRect().width) *
      imageRef.current.naturalWidth;
    const naturalY =
      ((marginRef.current.bottom - translateRef.current.y) /
        imageRef.current.getBoundingClientRect().height) *
      imageRef.current.naturalWidth;
    ctx?.drawImage(
      imageRef.current,
      naturalX,
      naturalY +
        (imageRef.current.naturalHeight - imageRef.current.naturalWidth) / 2,
      imageRef.current.naturalWidth * (1 / scale),
      imageRef.current.naturalWidth * (1 / scale),
      0,
      0,
      containerRef.current.offsetWidth,
      containerRef.current.offsetHeight
    );
  }, [scale, refresh]);

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
    if (!containerRef.current) return;
    containerRef.current.style.transform = `translate3d(${translateRef.current.x}px,
      ${translateRef.current.y}px, 0px) scale(${scale})`;
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
    containerRef.current!.style.transform = `translate3d(${translateRef.current.x}px,
      ${translateRef.current.y}px, 0px) scale(${scale})`;
    setRefresh({});
  };

  return (
    <div className="flex">
      <div className={`relative flex items-center justify-center`}>
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          className="h-[800px] w-[800px] shrink-0 transition-transform ease-out"
          style={{
            transform: `translate3d(${translateRef.current.x}px,
              ${translateRef.current.y}px, 0px) scale(${scale})`,
          }}
        >
          <Image
            src={dataUrl}
            fill={true}
            alt="Upload Image"
            className="object-cover"
            ref={imageRef}
          />
        </div>
        <div className="absolute bottom-2 left-2">
          <Dragbar setScale={setScale} />
        </div>
        <canvas ref={canvasRef} className="absolute bg-slate-500 invisible" />
      </div>
    </div>
  );
}

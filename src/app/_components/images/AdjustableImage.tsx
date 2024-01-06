import React, { useEffect, useRef, useState } from "react";
import Dragbar from "./DragBar";
import Image from "next/image";
import { Steps } from "./CreateImage";

export default function AdjustableImage({
  isCurrent,
  dataUrl,
  currentStep,
  setDataUrls,
}: {
  isCurrent: boolean;
  dataUrl: string;
  currentStep: Steps;
  setDataUrls: React.Dispatch<React.SetStateAction<string[] | null>>;
}) {
  const [scale, setScale] = useState(1);
  const [margin, setMargin] = useState({
    bottom: 0,
    right: 0,
  });
  const mouseDownRef = useRef({ x: 0, y: 0 });
  const prevRef = useRef({ x: 0, y: 0 });
  const translateRef = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setRefresh] = useState({});

  useEffect(() => {
    setMargin({
      bottom: (scale - 1) * 400,
      right: (scale - 1) * 400,
    });
  }, [scale]);

  useEffect(() => {
    const x = Math.min(
      Math.max(translateRef.current.x, -margin.right),
      margin.right
    );
    const y = Math.min(
      Math.max(translateRef.current.y, -margin.bottom),
      margin.bottom
    );
    translateRef.current = { x, y };
    setRefresh({});
  }, [margin]);

  useEffect(() => {
    if (!canvasRef.current || !imageRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = 800;
    canvasRef.current.height = 800;
    const naturalX =
      ((margin.right - translateRef.current.x) /
        imageRef.current.getBoundingClientRect().width) *
      imageRef.current.naturalWidth;
    const naturalY =
      ((margin.bottom - translateRef.current.y) /
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
      800,
      800
    );
  }, [
    currentStep,
    scale,
    margin,
    translateRef.current.x,
    translateRef.current.y,
  ]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    mouseDownRef.current = { x: e.clientX, y: e.clientY };
    prevRef.current = { ...translateRef.current };
    setRefresh({});
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    let x = e.clientX - mouseDownRef.current.x + prevRef.current.x;
    let y = e.clientY - mouseDownRef.current.y + prevRef.current.y;

    if (
      x > margin.right ||
      x < -margin.right ||
      y > margin.bottom ||
      y < -margin.bottom
    ) {
      x = translateRef.current.x + 0.06 * (x - translateRef.current.x);
      y = translateRef.current.y + 0.06 * (y - translateRef.current.y);
    }

    translateRef.current = {
      x,
      y,
    };
    setRefresh({});
  };

  const handleMouseUp = (e: MouseEvent) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    const x = Math.min(
      Math.max(translateRef.current.x, -margin.right),
      margin.right
    );
    const y = Math.min(
      Math.max(translateRef.current.y, -margin.bottom),
      margin.bottom
    );
    translateRef.current = { x, y };
    setRefresh({});
  };

  return (
    <div className="flex">
      <div
        className={`relative flex items-center justify-center ${
          isCurrent && "z-10"
        }`}
      >
        <div
          onMouseDown={handleMouseDown}
          className="h-[800px] w-[800px] shrink-0"
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
        <canvas ref={canvasRef} className="absolute z-30 bg-slate-500 invisible" />
      </div>
    </div>
  );
}

import React, { createElement, useEffect, useReducer, useRef } from "react";
export type DrawParams = {
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
  dx?: number;
  dy?: number;
  dSize: number;
  styleSize: number;
  src: string;
};

export default function CanvasImage({
  sx,
  sy,
  sWidth,
  sHeight,
  dx=0,
  dy=0,
  dSize,
  styleSize,
  src,
}: DrawParams) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const image = new Image();
    image.src = src;
    image.onload = function () {
      ctx?.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dSize, dSize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={dSize}
      height={dSize}
      style={{ width: styleSize, height: styleSize }}
    />
  );
}

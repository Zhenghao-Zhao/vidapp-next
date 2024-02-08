import React, { useEffect, useRef } from "react";
export type DrawParams = {
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
  dx: number;
  dy: number;
  dSize: number;
  styleSize: number;
  src?: string;
  image?: HTMLImageElement;
};

export default function CanvasImage({
  sx,
  sy,
  sWidth,
  sHeight,
  dx = 0,
  dy = 0,
  dSize,
  styleSize,
  src,
  image,
}: DrawParams) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current || (!image && !src)) return;
    const ctx = canvasRef.current.getContext("2d");
    if (image)
      ctx?.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dSize, dSize);
    else if (src) {
      const image = new Image();
      image.onload = () => {
        ctx?.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dSize, dSize);
      };
      image.src = src;
    }
  }, [image]);

  return (
    <canvas
      ref={canvasRef}
      width={dSize}
      height={dSize}
      style={{ width: styleSize, height: styleSize }}
    />
  );
}

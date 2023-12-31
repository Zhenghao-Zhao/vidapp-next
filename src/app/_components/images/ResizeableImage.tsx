import React, { useCallback, useEffect, useRef, useState } from "react";
import ResizeScrollbar from "./ResizeScrollbar";

export default function ResizeableImage({
  isCurrent,
  children,
}: {
  isCurrent: boolean;
  children: React.ReactNode;
}) {
  const [scale, setScale] = useState(1);
  const [margin, setMargin] = useState({
    bottom: 0,
    right: 0,
  });
  const mouseDownRef = useRef({ x: 0, y: 0 });
  const prevRef = useRef({ x: 0, y: 0 });
  const translateRef = useRef({ x: 0, y: 0 });
  const [, setRefresh] = useState({});

  useEffect(() => {
    setMargin({
      bottom: (scale - 1) * 400,
      right: (scale - 1) * 400,
    });
  }, [scale]);

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    translateRef.current = {
      x: e.clientX - mouseDownRef.current.x + prevRef.current.x,
      y: e.clientY - mouseDownRef.current.y + prevRef.current.y,
    }
    setRefresh({})
  };

  const handleMouseUp = (e: MouseEvent) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    const x = Math.min(
      Math.max(
        e.clientX - mouseDownRef.current.x + prevRef.current.x,
        -margin.right
      ),
      margin.right
    );

    const y = Math.min(
      Math.max(
        e.clientY - mouseDownRef.current.y + prevRef.current.y,
        -margin.bottom
      ),
      margin.bottom
    );

    translateRef.current = { x, y };
    setRefresh({})
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
    console.log(e.clientX, e.clientY);

    mouseDownRef.current = { x: e.clientX, y: e.clientY };
    prevRef.current = { ...translateRef.current };
    setRefresh({})
  };

  return (
    <div
      className={`relative h-full w-full flex items-center justify-center ${
        isCurrent && "z-10"
      }`}
    >
      <div
        onMouseDown={handleMouseDown}
        className="h-full w-full"
        style={{
          transform: `translate3d(${translateRef.current.x}px, 
            ${translateRef.current.y}px, 0px) scale(${scale})`,
        }}
      >
        {children}
      </div>
      <ResizeScrollbar setScale={setScale} />
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Dragbar from "./DragBar";

export default function AdjustableImage({
  isCurrent,
  children,
  showEditTools,
}: {
  isCurrent: boolean;
  children: React.ReactNode;
  showEditTools: boolean;
}) {
  const [scale, setScale] = useState(1);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [fade, setFade] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [Vignette, setVignette] = useState(0);
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
          {children}
        </div>
        <div className="absolute bottom-2 left-2">
          <Dragbar setScale={setScale} />
        </div>
      </div>
      {showEditTools && (
        <div className="h-full bg-white">
          <Dragbar setScale={setScale} />
          <Dragbar setScale={setBrightness} />
          <Dragbar setScale={setContrast} />
          <Dragbar setScale={setFade} />
          <Dragbar setScale={setTemperature} />
          <Dragbar setScale={setVignette} />
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import ZoomBar from "./ZoomBar";

export default function ResizeableImage({
  isCurrent,
  children,
}: {
  isCurrent: boolean,
  children: React.ReactNode;
}) {
  const [scale, setScale] = useState(1);

  return (
    <div className={`relative h-full w-full flex items-center justify-center ${isCurrent && 'z-10'}`}>
      <div className="h-full w-full" style={{ transform: `scale(${scale})` }}>{children}</div>
      <ZoomBar setScale={setScale} />
    </div>
  );
}

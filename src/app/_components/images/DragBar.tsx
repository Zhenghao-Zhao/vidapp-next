import React, { useRef } from "react";

export default function Dragbar({
  setScale,
}: {
  setScale: React.Dispatch<React.SetStateAction<number>>,
}) {
  const mouseStartX = useRef(0);
  const railRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const translateRef = useRef(0);
  const prevRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    mouseStartX.current = e.clientX;
    prevRef.current = translateRef.current;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!railRef.current || !knobRef.current) return;
    translateRef.current = Math.min(
      Math.max(e.clientX - mouseStartX.current + prevRef.current, 0),
      railRef.current.offsetWidth - knobRef.current.offsetWidth
    );
    setScale(1 + translateRef.current / (railRef.current.offsetWidth - knobRef.current.offsetWidth));
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="bg-black p-4 rounded-xl bg-opacity-40 flex items-center">
      <div
        ref={railRef}
        className="w-28 border border-black border-solid flex items-center"
      ></div>
      <div
        ref={knobRef}
        className={`rounded-full w-4 h-4 absolute bg-white`}
        onMouseDown={handleMouseDown}
        style={{ transform: `translate(${translateRef.current}px)` }}
      />
    </div>
  );
}

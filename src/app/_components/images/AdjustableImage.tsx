import React, {
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
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
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const prevRef = useRef({ x: 0, y: 0 });
  const translateRef = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const marginRef = useRef({ bottom: 0, right: 0 });
  const [refresh, setRefresh] = useState({});

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const naturalHeight = imageRef.current.naturalHeight;
    const naturalWidth = imageRef.current.naturalWidth;
    if (naturalWidth === 0 || naturalHeight === 0) throw new Error('Image size cannot be zero.')
    const ratio = naturalHeight / naturalWidth;
    const containerSize = containerRef.current.offsetWidth;
    if (naturalHeight > naturalWidth) {
      setImageSize({
        width: containerSize * scale,
        height: containerSize * ratio * scale,
      });
    } else {
      setImageSize({
        width: (containerSize / ratio) * scale,
        height: containerSize * scale,
      });
    }
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
      bottom: (imageSize.height - containerRef.current.offsetHeight) / 2,
      right: (imageSize.width - containerRef.current.offsetWidth) / 2,
    };
  }, [scale, imageSize]);

  useEffect(() => {
    if (
      !canvasRef.current ||
      !imageRef.current ||
      !containerRef.current ||
      imageSize.width === 0 ||
      imageSize.height === 0
    )
      return;
    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = containerRef.current.offsetWidth;
    canvasRef.current.height = containerRef.current.offsetHeight;

    const naturalX =
      ((marginRef.current.right - translateRef.current.x) / imageSize.width) *
      imageRef.current.naturalWidth;
    const naturalY =
      ((marginRef.current.bottom - translateRef.current.y) / imageSize.height) *
      imageRef.current.naturalHeight;
    const clipWidth =
      (containerRef.current.offsetWidth / imageSize.width) *
      imageRef.current.naturalWidth;
    const clipHeight =
      (containerRef.current.offsetHeight / imageSize.height) *
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
  }, [refresh, imageSize]);

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
      ${translateRef.current.y}px, 0px)`;
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
      ${translateRef.current.y}px, 0px)`;
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
          className="shrink-0 w-upload-width h-upload-width flex justify-center items-center relative"
        >
          <div
            ref={imageWrapperRef}
            className="shrink-0 flex justify-center transition-all ease-out"
            style={{
              transform: `translate3d(${translateRef.current.x}px,
              ${translateRef.current.y}px, 0px)`,
              width: imageSize.width,
              height: imageSize.height,
            }}
          >
            <Image
              src={dataUrl}
              fill={true}
              alt="Upload Image"
              className="object-cover shrink-0"
              ref={imageRef}
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

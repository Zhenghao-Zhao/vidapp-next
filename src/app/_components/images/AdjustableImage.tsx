import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import Dragbar from "./DragBar";
import Image from "next/image";
import { ImageInfo } from "./CreateImage";
import { Transform } from "./UploadSteps/CropZone";

export default function AdjustableImage({
  imageInfo,
  transform,
  changeTransforms,
}: {
  imageInfo: ImageInfo;
  transform: Transform;
  changeTransforms: (t: Transform) => void;
}) {
  const [scale, setScale] = useState(transform.scale);
  const [isDragging, setIsDragging] = useState(false);
  const scaleRef = useRef(transform.scale);
  const prevRef = useRef({ x: 0, y: 0 });
  const translateRef = useRef({
    x: transform.translateX,
    y: transform.translateY,
  });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const changeScale = (scale: number) => {
    setScale(scale);
    changeTransforms({
      translateX: translateRef.current.x,
      translateY: translateRef.current.y,
      scale,
    });
  };

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scale]);


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
    const containerSize = Math.min(imageInfo.height, imageInfo.width);
    const marginRight = (imageInfo.width * scaleRef.current - containerSize) / 2;
    const marginBottom =(imageInfo.height * scaleRef.current - containerSize) / 2;

    const x = Math.min(
      Math.max(translateRef.current.x, -marginRight),
      marginRight
    );
    const y = Math.min(
      Math.max(translateRef.current.y, -marginBottom),
      marginBottom
    );
    translateRef.current = { x, y };
    imageWrapperRef.current!.style.transform = `translate3d(${translateRef.current.x}px,
      ${translateRef.current.y}px, 0px) scale(${scaleRef.current})`;

    changeTransforms({
      translateX: translateRef.current.x,
      translateY: translateRef.current.y,
      scale: scaleRef.current,
    });
  };

  return (
    <div className={`flex w-full h-full shrink-0 overflow-hidden`}>
      <div
        className={`relative flex items-center justify-center w-full h-full`}
      >
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          className=" w-full h-full flex flex-col justify-center items-center"
        >
          <div
            ref={imageWrapperRef}
            className="transition-all ease-out relative shrink-0"
            style={{
              transform: `translate3d(${translateRef.current.x}px,
              ${translateRef.current.y}px, 0px) scale(${scale})`,
              width: imageInfo.width,
              height: imageInfo.height,
            }}
          >
            <Image
              src={imageInfo.dataURL}
              fill={true}
              alt="Upload Image"
              className="object-cover select-none"
              ref={imageRef}
            />
          </div>
        </div>
        <div className="absolute bottom-2 left-2">
          <Dragbar scale={scale} adjustScale={changeScale} />
        </div>
      </div>
    </div>
  );
}

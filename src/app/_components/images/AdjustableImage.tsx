import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import Dragbar from "./DragBar";
import Image from "next/image";
import { UploadSteps } from "./ImageEditor";
import CanvasImage, { DrawParams } from "./CanvasImage";

const initDrawParams: DrawParams = {
  sx: 0,
  sy: 0,
  sWidth: 0,
  sHeight: 0,
  dSize: 0,
  styleSize: 0,
  src: "",
  image: null,
}

export default function AdjustableImage({
  dataUrl,
  index,
  currentStep,
}: {
  dataUrl: string;
  index: number;
  currentStep: UploadSteps
}) {
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [initImageSize, setInitImageSize] = useState({ width: 0, height: 0 });
  const [refresh, setRefresh] = useState({});
  const scaleRef = useRef(1);
  const prevRef = useRef({ x: 0, y: 0 });
  const translateRef = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const marginRef = useRef({ bottom: 0, right: 0 });
  const drawParamsRef = useRef<DrawParams>(initDrawParams);
  const currentStepRef = useRef<UploadSteps>(UploadSteps.Crop);

  const changeScale = (scale: number) => {
    setScale(scale);
  }

  const handleImageLoad = () => {
    if (!containerRef.current || !imageRef.current) return;
    if (
      imageRef.current.naturalHeight === 0 ||
      imageRef.current.naturalWidth === 0
    )
      throw new Error("image size cannot be zero");
    const naturalHeight = imageRef.current.naturalHeight;
    const naturalWidth = imageRef.current.naturalWidth;
    if (naturalWidth === 0 || naturalHeight === 0) return;
    const ratio = naturalHeight / naturalWidth;
    const containerSize = containerRef.current.offsetWidth;
    if (naturalHeight > naturalWidth) {
      setInitImageSize({
        width: containerSize,
        height: containerSize * ratio,
      });
    } else {
      setInitImageSize({
        width: containerSize / ratio,
        height: containerSize,
      });
    }
  };

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);
  
  useEffect(() => {
    currentStepRef.current = currentStep;
  }, [currentStep])

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
      bottom:
        (initImageSize.height * scale - containerRef.current.offsetHeight) / 2,
      right:
        (initImageSize.width * scale - containerRef.current.offsetWidth) / 2,
    };
  }, [scale, initImageSize]);

  useEffect(() => {
    if (
      !imageRef.current ||
      !containerRef.current
    )
      return;
    const sx =
      ((marginRef.current.right - translateRef.current.x) /
        (initImageSize.width * scale)) *
      imageRef.current.naturalWidth;
    const sy =
      ((marginRef.current.bottom - translateRef.current.y) /
        (initImageSize.height * scale)) *
      imageRef.current.naturalHeight;
    const sWidth =
      (containerRef.current.offsetWidth / (initImageSize.width * scale)) *
      imageRef.current.naturalWidth;
    const sHeight =
      (containerRef.current.offsetHeight / (initImageSize.height * scale)) *
      imageRef.current.naturalHeight;

    const dSize = Math.min(
      imageRef.current.naturalWidth,
      imageRef.current.naturalHeight
    );
    drawParamsRef.current = {
      sx,
      sy,
      sWidth,
      sHeight,
      dSize,
      styleSize: containerRef.current.offsetWidth,
      src: dataUrl,
      image: imageRef.current
    };
  }, [scale, initImageSize, refresh, index, dataUrl]);

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
    if (currentStepRef.current === UploadSteps.Share) return;
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
      ${translateRef.current.y}px, 0px) scale(${scaleRef.current})`;
    setRefresh({});
  };


  if (currentStep === UploadSteps.Share) {
    return drawParamsRef.current && <CanvasImage {...drawParamsRef.current} />
  }

  return (
    <div className={`flex w-full h-full shrink-0 overflow-hidden`}>
      <div
        className={`relative flex items-center justify-center w-full h-full`}
      >
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          className=" w-full h-full flex justify-center items-center"
        >
          <div
            ref={imageWrapperRef}
            className="transition-all ease-out relative shrink-0"
            style={{
              transform: `translate3d(${translateRef.current.x}px,
              ${translateRef.current.y}px, 0px) scale(${scale})`,
              width: initImageSize.width || "auto",
              height: initImageSize.height || "auto",
            }}
          >
            <Image
              src={dataUrl}
              fill={true}
              alt="Upload Image"
              className="object-cover select-none"
              ref={imageRef}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
        <div className="absolute bottom-2 left-2">
          <Dragbar scale={scale} changeScale={changeScale} />
        </div>
      </div>
    </div>
  );
}

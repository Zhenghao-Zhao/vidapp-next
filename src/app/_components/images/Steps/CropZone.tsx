import React, { useEffect, useRef, useState } from "react";
import { CropParam, ImageInfo, ImagePosition } from "../CreateImageDup";
import { IconType } from "@/app/_assets/Icons";
import Icon from "../../common/Icon";
import IconButton from "../../common/buttons/IconButton";
import { IndexDot } from "../Common";
import Dragbar from "../DragBar";
import Image from "next/image";

export default function CropZone({
  imageInfo,
  imageNum,
  imagePositionsRef,
  imagePosition,
  currentImageIndex,
  cropParams,
  addCropParams,
  goPrev,
  goNext,
  changeSlide,
}: {
  imageInfo: ImageInfo;
  imageNum: number;
  imagePositionsRef: React.RefObject<ImagePosition[]>;
  imagePosition: ImagePosition;
  currentImageIndex: number;
  cropParams: CropParam[];
  addCropParams: (p: CropParam[]) => void;
  goPrev: () => void;
  goNext: () => void;
  changeSlide: (n: 1 | -1) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [_, setRefresh] = useState({});
  const prevRef = useRef({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);
  const marginRef = useRef({ bottom: 0, right: 0 });
  const translateRef = useRef({
    x: imagePosition.translateX,
    y: imagePosition.translateY,
  });
  const scaleRef = useRef(imagePosition.scale);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);

  useEffect(() => {
    imageRef.current!.onload = () => {
      translateRef.current.x = imagePosition.translateX;
      translateRef.current.y = imagePosition.translateY;
      scaleRef.current = imagePosition.scale;
      setScale(imagePosition.scale);
      imageWrapperRef.current!.style.transform = `translate3d(${translateRef.current.x}px,
        ${translateRef.current.y}px, 0px) scale(${imagePosition.scale})`;
    };
    imageWrapperRef.current!.style.transition = "none";
  }, [currentImageIndex, imagePosition]);

  useEffect(() => {
    if (!containerRef.current || !imageWrapperRef.current) return;
    marginRef.current = {
      bottom:
        (imageInfo.height * scale - containerRef.current.offsetHeight) / 2,
      right: (imageInfo.width * scale - containerRef.current.offsetWidth) / 2,
    };
  }, [imageInfo.width, imageInfo.height, scale]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    prevRef.current = { x: e.pageX, y: e.pageY };
    imageWrapperRef.current!.style.transition = "all 1000ms ease-out";
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
    const x = Math.min(
      Math.max(translateRef.current.x, -marginRef.current.right),
      marginRef.current.right
    );
    const y = Math.min(
      Math.max(translateRef.current.y, -marginRef.current.bottom),
      marginRef.current.bottom
    );
    translateRef.current.x = x;
    translateRef.current.y = y;

    imageWrapperRef.current!.style.transform = `translate3d(${translateRef.current.x}px,
      ${translateRef.current.y}px, 0px) scale(${scaleRef.current})`;
    setRefresh({});
  };

  const handleClickNext = () => {
    if (!imageRef.current || !containerRef.current) return;
    const sx =
      ((marginRef.current.right - translateRef.current.x) /
        (imageInfo.width * scale)) *
      imageRef.current.naturalWidth;
    const sy =
      ((marginRef.current.bottom - translateRef.current.y) /
        (imageInfo.height * scale)) *
      imageRef.current.naturalHeight;
    const sWidth =
      (containerRef.current.offsetWidth / (imageInfo.width * scale)) *
      imageRef.current.naturalWidth;
    const sHeight =
      (containerRef.current.offsetHeight / (imageInfo.height * scale)) *
      imageRef.current.naturalHeight;

    const dSize = Math.min(
      imageRef.current.naturalWidth,
      imageRef.current.naturalHeight
    );
    const params = {
      sx,
      sy,
      sWidth,
      sHeight,
      dx: dSize,
      dy: dSize,
      styleSize: containerRef.current.offsetWidth,
      src: imageInfo.dataURL,
    };
    const updatedParams = cropParams.map((p, i) => {
      return i === currentImageIndex ? params : p;
    });
    addCropParams(updatedParams);
    goNext();
  };

  const adjustScale = (scale: number) => {
    imageWrapperRef.current!.style.transition = "all 150ms ease-out";
    setScale(scale);
  };

  const handleArrowClick = (n: 1 | -1) => {
    const position = {
      scale: scale,
      translateX: translateRef.current.x,
      translateY: translateRef.current.y,
    };
    imagePositionsRef.current![currentImageIndex] = position;
    changeSlide(n);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-center h-[50px] w-full bg-white">
        <button
          className="w-upload-step flex items-center justify-center"
          onClick={goPrev}
        >
          <Icon icon={IconType.ArrowLeft} />
        </button>
        <div className="text-lg font-bold">Crop</div>
        <button
          className="w-upload-step font-[500] flex items-center justify-center"
          onClick={handleClickNext}
        >
          Next
        </button>
      </div>
      <div className="flex h-upload-width">
        <div className="w-upload-width h-upload-width">
          <div
            className={`flex w-full h-full justify-center items-center bg-white relative`}
          >
            <div
              className="flex w-full h-full flex-col justify-center items-center overflow-hidden"
              ref={containerRef}
              onMouseDown={handleMouseDown}
            >
              <div
                ref={imageWrapperRef}
                className="ease-out relative shrink-0"
                style={{
                  transform: `translate3d(${translateRef.current.x}px,
              ${translateRef.current.y}px, 0px) scale(${scaleRef.current})`,
                  width: imageInfo.width,
                  height: imageInfo.height,
                }}
              >
                <img
                  src={imageInfo.dataURL}
                  className="object-cover select-none w-full h-full"
                  ref={imageRef}
                  alt=""
                />
              </div>
            </div>
            <div className="absolute bottom-2 left-2">
              <Dragbar scale={scale} adjustScale={adjustScale} />
            </div>
            {imageNum > 1 && (
              <IndexDot imageCount={imageNum} currIndex={currentImageIndex} />
            )}
            {currentImageIndex > 0 && (
              <div className="absolute left-2 z-10">
                {
                  <IconButton
                    icon={IconType.ArrowLeft}
                    handleClick={() => handleArrowClick(-1)}
                    className="backdrop-blur-xl bg-black bg-opacity-20"
                    fill="text-white"
                  />
                }
              </div>
            )}
            {currentImageIndex < imageNum - 1 && (
              <div className="absolute right-2 z-10">
                {
                  <IconButton
                    icon={IconType.ArrowRight}
                    handleClick={() => handleArrowClick(1)}
                    className="backdrop-blur-xl bg-black bg-opacity-20"
                    fill="text-white"
                  />
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

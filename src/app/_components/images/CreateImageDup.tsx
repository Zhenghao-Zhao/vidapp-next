import React, { useEffect, useRef, useState } from "react";
import DropZone from "./Steps/DropZone";
import CropZone from "./Steps/CropZone";

export type CropParam = {
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
  dx: number;
  dy: number;
  styleSize: number;
  src: string;
};

export type ImagePosition = {
  scale: number;
  translateX: number;
  translateY: number;
};

export type ImageInfo = {
  dataURL: string;
  width: number;
  height: number;
};

const initImagePosition: ImagePosition = {
  scale: 1,
  translateX: 0,
  translateY: 0,
}

export default function CreateImageDup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [imageInfoList, setImageInfoList] = useState<ImageInfo[]>([]);
  const [cropParams, setCropParams] = useState<CropParam[]>([]);
  const [finalizedDataURLs, setFinalizedDataURLs] = useState<string[]>([]);
  // const [imagePositions, setImagePositions] = useState<ImagePosition[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imagePositionsRef = useRef<ImagePosition[]>([])

  const addFinalizedDataURLs = (dataURLs: string[]) => {
    setFinalizedDataURLs(dataURLs);
  };

  const addCropParams = (cropParams: CropParam[]) => {
    setCropParams(cropParams);
  };

  const goNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goPrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const changeSlide = (n: 1 | -1) => {
    console.log(n)
    setCurrentImageIndex((prev) => prev + n);
  };

  const addImageInfo = (imageInfo: ImageInfo[]) => {
    setImageInfoList(imageInfo);
  };

  return (
    <div className="flex bg-white">
      {currentStep === 1 && (
        <DropZone addImageInfo={addImageInfo} goNext={goNext} />
      )}
      {currentStep === 2 && (
        <CropZone
          imageInfo={imageInfoList[currentImageIndex]}
          imageNum={imageInfoList.length}
          imagePositionsRef={imagePositionsRef}
          imagePosition={imagePositionsRef.current[currentImageIndex] || initImagePosition}
          addCropParams={addCropParams}
          cropParams={cropParams}
          currentImageIndex={currentImageIndex}
          goPrev={goPrev}
          goNext={goNext}
          changeSlide={changeSlide}
        />
      )}
      {/* {currentStep === 3 && (
        <EditZone
          dataURLs={dataURLs}
          cropParams={cropParams}
          addFinalizedDataURLs={addFinalizedDataURLs}
          currentImageIndex={currentImageIndex}
        />
      )}
      {currentStep === 4 && (
        <SubmitZone finalizedDataURLs={finalizedDataURLs} />
      )} */}
      <div></div>
    </div>
  );
}

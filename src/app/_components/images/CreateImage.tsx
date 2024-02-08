import React, { useEffect, useRef, useState } from "react";
import DropZone from "./UploadSteps/DropZone";
import CropZone from "./UploadSteps/CropZone";

export type ImageInfo = {
  dataURL: string;
  width: number;
  height: number;
  natWidth: number;
  natHeight: number;
  image: HTMLImageElement;
};

export default function CreateImageDup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [imageInfoList, setImageInfoList] = useState<ImageInfo[]>([]);
  const [finalizedDataURLs, setFinalizedDataURLs] = useState<string[]>([]);

  const addFinalizedDataURLs = (dataURLs: string[]) => {
    setFinalizedDataURLs(dataURLs);
  };

  const goNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goPrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const addImageInfo = (imageInfo: ImageInfo[]) => {
    setImageInfoList(imageInfo);
  };

  return (
    <div className="flex bg-white">
      {currentStep === 1 && (
        <DropZone addImageInfo={addImageInfo} goNext={goNext} />
      )}
      {(currentStep === 2 || currentStep === 3) && (
        <CropZone
          imageInfoList={imageInfoList}
          goPrev={goPrev}
          goNext={goNext}
          currentStep={currentStep}
        />
      )}
      {/* {currentStep === 4 && (
        <SubmitZone finalizedDataURLs={finalizedDataURLs} />
      )} */}
      <div></div>
    </div>
  );
}

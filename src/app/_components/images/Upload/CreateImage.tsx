import React, { useEffect, useRef, useState } from "react";
import DropZone from "./UploadSteps/DropZone";
import CropZone from "./UploadSteps/CropZone";

export type ImageInfo = {
  imageURL: string;
  width: number;
  height: number;
  natWidth: number;
  natHeight: number;
  image: HTMLImageElement;
 };

export default function CreateImageDup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [imageInfoList, setImageInfoList] = useState<ImageInfo[]>([]);
  const [imageBlobs, setImageBlobs] = useState<Blob[]>([]);

  const goNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const goPrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const addImageInfo = (imageInfo: ImageInfo[]) => {
    setImageInfoList(imageInfo);
  };

  const addImageBlobs = (blobs: Blob[]) => {
    setImageBlobs(blobs);
  }

  return (
    <div className="flex bg-white">
      {currentStep === 1 && (
        <DropZone addImageInfo={addImageInfo} addImageBlobs={addImageBlobs} goNext={goNext} />
      )}
      {(currentStep > 1) && (
        <CropZone
          imageInfoList={imageInfoList}
          blobs={imageBlobs}
          goPrev={goPrev}
          goNext={goNext}
          currentStep={currentStep}
        />
      )}
      <div></div>
    </div>
  );
}

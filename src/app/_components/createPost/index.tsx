import React, { useCallback, useEffect, useState } from "react";

import {
  FilterParams,
  ImageInfo,
  Transform,
  UploadSteps,
  initFilterValues,
  initTransformValues,
} from "./uploadSteps/constants";
import { CropZone, DropZone, SubmitZone, EditZone } from "./uploadSteps";

export default function CreatePost() {
  const [currentStep, setCurrentStep] = useState(0);
  const [imageInfoList, setImageInfoList] = useState<ImageInfo[]>([]);
  const [imageBlobs, setImageBlobs] = useState<Blob[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transforms, setTransforms] = useState<Transform[]>([]);
  const [filters, setFilters] = useState<FilterParams[]>([]);
  const [uploadImages, setUploadImages] = useState<Blob[]>([]);

  useEffect(() => {
    setTransforms(
      Array.from({ length: imageInfoList.length }).map(() => {
        return initTransformValues;
      })
    );
    setFilters(
      Array.from({ length: imageInfoList.length }).map(() => {
        return initFilterValues;
      })
    );
    if (imageInfoList.length > 0) setCurrentStep(UploadSteps.crop);
  }, [imageInfoList]);

  const applyTransforms = useCallback(
    (change: Transform) => {
      const update = transforms.map((t, i) => {
        return i === currentImageIndex ? change : t;
      });
      setTransforms(update);
    },
    [currentImageIndex, transforms]
  );

  const applyFilters = useCallback(
    (change: FilterParams) => {
      const update = filters.map((f, i) => {
        return i === currentImageIndex ? change : f;
      });
      setFilters(update);
    },
    [currentImageIndex, filters]
  );

  const changeCurrentImageIndex = (i: number) => {
    setCurrentImageIndex(i);
  };

  const applyUploadImages = (imageBlobs: Blob[]) => {
    setUploadImages(imageBlobs);
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

  const addImageBlobs = (blobs: Blob[]) => {
    setImageBlobs(blobs);
  };

  return (
    <div
      className={`flex bg-white ${
        currentStep < UploadSteps.edit
          ? "w-upload-image-width"
          : "w-upload-width"
      } transition-all`}
    >
      {currentStep === UploadSteps.create && (
        <DropZone
          addImageInfo={addImageInfo}
          addImageBlobs={addImageBlobs}
        />
      )}
      {currentStep === UploadSteps.crop && (
        <CropZone
          currentImageIndex={currentImageIndex}
          imageInfoList={imageInfoList}
          transforms={transforms}
          changeTransforms={applyTransforms}
          changeCurrentImageIndex={changeCurrentImageIndex}
          goPrev={goPrev}
          goNext={goNext}
        />
      )}
      {currentStep === UploadSteps.edit && (
        <EditZone
          imageInfoList={imageInfoList}
          transforms={transforms}
          filters={filters}
          blobs={imageBlobs}
          currentImageIndex={currentImageIndex}
          changeFilters={applyFilters}
          changeCurrentImageIndex={changeCurrentImageIndex}
          changeUploadImages={applyUploadImages}
          goNext={goNext}
          goPrev={goPrev}
        />
      )}
      {currentStep === UploadSteps.submit && (
        <SubmitZone
          uploadImages={uploadImages}
          currentImageIndex={currentImageIndex}
          changeCurrentImageIndex={changeCurrentImageIndex}
          goPrev={goPrev}
        />
      )}
    </div>
  );
}

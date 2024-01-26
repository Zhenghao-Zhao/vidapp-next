import { IconType } from "@/app/_assets/Icons";
import React, { RefObject, useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import Spinner from "../loaders";
import { ImageSlider, ImageSliderCropper, IndexDot } from "./Common";
import { dataURLtoBlob } from "@/app/_utility/helpers";
import Icon from "../common/Icon";

const enum UploadSteps {
  Crop,
  Share,
}

export default function ImageEditor({
  dataURLs,
  resetImages,
}: {
  dataURLs: string[] | null;
  resetImages: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [finalizedImages, setFinalizedImages] = useState<string[] | null>(null);
  const [caption, setCaption] = useState("");
  const [imageFiles, setImageFiles] = useState<File[] | null>(null);
  const canvasArrayRef = useRef<RefObject<HTMLCanvasElement>[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    if (!finalizedImages) throw new Error("Upload images not finalized");
    const formData = new FormData();
    const blobs = [];
    for (const dataUrl of finalizedImages) {
      blobs.push(dataURLtoBlob(dataUrl));
    }
    for (const b of blobs) {
      if (!b) throw new Error("Image does not exist");
      const file = new File([b], "fileName.jpg", { type: "image/jpeg" });
      formData.append("file", file);
    }
    const res = await fetch("/api/image", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      toast.success("Images posted successfully");
    }
  };

  const getDataURLs = () => {
    if (!canvasArrayRef.current) return;
    const images: string[] = [];
    for (const c of canvasArrayRef.current) {
      if (!c.current) throw new Error("Failed to initialize image");
      images.push(c.current.toDataURL());
    }
    setFinalizedImages(images);
    setCurrentStep((prev) => prev + 1);
  };

  const handleNext = () => {
    switch (currentStep) {
      case UploadSteps.Crop:
        startTransition(getDataURLs);
        break;
      case UploadSteps.Share:
        startTransition(handleSubmit);
        break;
      default:
        return;
    }
  };

  const handleGoBack = () => {
    switch (currentStep) {
      case UploadSteps.Crop:
        resetImages();
        break;
      case UploadSteps.Share:
        setFinalizedImages(null);
        setCurrentStep((prev) => prev - 1);
        break;
      default:
        return;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.currentTarget.value);
  };

  return (
    <div className="flex flex-col items-center justify-center relative min-w-upload-minWidth h-full">
      <div
        className={`flex flex-row justify-between items-center h-[50px] w-full pr-4 pl-2 bg-white ${
          currentStep === UploadSteps.Share && "border-b"
        }`}
      >
        <button onClick={handleGoBack}>
          <Icon icon={IconType.ArrowLeft} />
        </button>
        <p className={`text-lg font-bold`}>
          {currentStep === 0 ? "Crop" : "Create new post"}
        </p>
        <button className="w-fit font-[500]" onClick={handleNext}>
          {isPending ? <Spinner /> : currentStep === 0 ? "Next" : "Share"}
        </button>
      </div>
      <div className="flex h-upload-width">
        <div className="w-upload-width h-upload-width">
          {dataURLs && (
            <ImageSliderCropper
              dataURLs={dataURLs}
              canvasArrayRef={canvasArrayRef}
              visible={currentStep === UploadSteps.Crop}
            />
          )}
          {finalizedImages && <ImageSlider dataURLs={finalizedImages} />}
        </div>
        <div
          className={`transition-all h-full ${
            currentStep === UploadSteps.Crop ? "w-0" : "w-upload-caption"
          }`}
        >
          <div className="h-full w-full p-2 relative bg-white">
            <textarea
              className="w-full outline-none h-full"
              onChange={handleTextChange}
              value={caption}
              placeholder="Write a caption..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

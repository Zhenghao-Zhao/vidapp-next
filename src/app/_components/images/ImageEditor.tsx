import { IconType } from "@/app/_assets/Icons";
import React, { RefObject, useRef, useState } from "react";
import IconButton from "../common/buttons/IconButton";
import AdjustableImage from "./AdjustableImage";
import { toast } from "react-toastify";
import Spinner from "../loaders";
import { ImageSlider, ImageSliderCropper, IndexDot } from "./Common";

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
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [finializedImages, setFinalizedImages] = useState<string[] | null>(
    null
  );
  const [caption, setCaption] = useState("");
  const [imageFiles, setImageFiles] = useState<File[] | null>(null);
  const canvasArrayRef = useRef<RefObject<HTMLCanvasElement>[]>([]);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    const blobs: Promise<Blob | null>[] = [];
    for (const c of canvasArrayRef.current) {
      if (!c.current) throw new Error("Failed to initialize image");
      const blob: Promise<Blob | null> = new Promise((resolve) =>
        c.current!.toBlob(resolve)
      );
      blobs.push(blob);
    }
    const rst = await Promise.all(blobs);
    for (const b of rst) {
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
    setLoading(false);
  };

  const getDataURLs = () => {
    if (!canvasArrayRef.current) return;
    const images: string[] = [];
    for (const c of canvasArrayRef.current) {
      if (!c.current) throw new Error("Failed to initialize image");
      images.push(c.current.toDataURL());
    }
    setFinalizedImages(images);
  };

  const handleNext = () => {
    switch (currentStep) {
      case UploadSteps.Crop:
        getDataURLs();
        setCurrentStep((prev) => prev + 1);
        break;
      case UploadSteps.Share:
        handleSubmit();
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
        className={`flex flex-row justify-between items-center h-[50px] w-full px-4 bg-white ${
          currentStep === UploadSteps.Share && "border-b"
        }`}
      >
        <IconButton icon={IconType.ArrowLeft} handleClick={handleGoBack} />
        <p className={`text-lg font-bold`}>
          {currentStep === 0 ? "Crop" : "Create new post"}
        </p>
        <button className="font-[500]" onClick={handleNext}>
          {loading ? <Spinner /> : currentStep === 0 ? "Next" : "Share"}
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
          {finializedImages && <ImageSlider dataURLs={finializedImages} />}
        </div>
        <div
          className={`bg-white transition-all h-full ${
            currentStep === UploadSteps.Crop ? "w-0" : "w-upload-caption"
          }`}
        >
          <div className="p-2 h-full w-full relative">
            <textarea
              className="w-full absolute outline-none min-h-0"
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

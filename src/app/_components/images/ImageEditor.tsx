import { IconType } from "@/app/_assets/Icons";
import React, { RefObject, useMemo, useRef, useState } from "react";
import IconButton from "../common/buttons/IconButton";
import AdjustableImage from "./AdjustableImage";
import { Steps } from "./CreateImage";
import { toast } from "react-toastify";
import Spinner from "../loaders";
import Image from "next/image";
import { ImageCarousel, Indicator } from "./Common";

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
  const [modifiedImages, setModifiedImages] = useState<string[] | null>(null);
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
    setModifiedImages(images);
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
        setModifiedImages(null);
        setCurrentStep((prev) => prev - 1);
        break;
      default:
        return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="flex flex-row justify-between items-center h-[50px] w-full px-4 bg-white">
        <IconButton icon={IconType.ArrowLeft} handleClick={handleGoBack} />
        <p className="text-lg font-bold">
          {currentStep === 0 ? "Crop" : "Create new post"}
        </p>
        <button className="font-[500]" onClick={handleNext}>
          {loading ? <Spinner /> : currentStep === 0 ? "Next" : "Share"}
        </button>
      </div>
      {dataURLs && (
        <ImageCropper
          width={800}
          height={800}
          dataURLs={dataURLs}
          canvasArrayRef={canvasArrayRef}
          visible={currentStep === UploadSteps.Crop}
        />
      )}
      {modifiedImages && (
        <ImageCarousel width={800} height={800} dataURLs={modifiedImages} />
      )}
    </div>
  );
}

function ImageCropper({
  dataURLs,
  canvasArrayRef,
  width,
  height,
  visible,
}: {
  dataURLs: string[];
  canvasArrayRef: RefObject<RefObject<HTMLCanvasElement>[]>;
  width: number;
  height: number;
  visible: boolean;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const handleLeftClick = () => {
    if (!listRef.current) return;
    listRef.current.scrollLeft -= width;
    setCurrentImage((prev) => prev - 1);
  };
  const handleRightClick = () => {
    if (!listRef.current) return;
    listRef.current.scrollLeft += width;
    setCurrentImage((prev) => prev + 1);
  };
  return (
    <div className={`flex justify-center items-center ${!visible && "hidden"}`}>
      <div
        className={`flex overflow-hidden bg-white relative`}
        ref={listRef}
        style={{ width, height }}
      >
        {dataURLs &&
          dataURLs.map((url, index) => (
            <div
              key={index}
              className="h-full w-full shrink-0 overflow-hidden"
            >
              <AdjustableImage
                canvasArrayRef={canvasArrayRef}
                dataUrl={url}
                index={index}
              />
            </div>
          ))}
      </div>
      {dataURLs && dataURLs.length > 1 && (
        <Indicator imageCount={dataURLs.length} currIndex={currentImage} />
      )}
      {currentImage > 0 && (
        <div className="absolute left-2 z-10">
          {
            <IconButton
              icon={IconType.ArrowLeft}
              handleClick={handleLeftClick}
              className="backdrop-blur-xl bg-black bg-opacity-20"
              fill="text-white"
            />
          }
        </div>
      )}
      {dataURLs && currentImage < dataURLs.length - 1 && (
        <div className="absolute right-2 z-10">
          {
            <IconButton
              icon={IconType.ArrowRight}
              handleClick={handleRightClick}
              className="backdrop-blur-xl bg-black bg-opacity-20"
              fill="text-white"
            />
          }
        </div>
      )}
    </div>
  );
}

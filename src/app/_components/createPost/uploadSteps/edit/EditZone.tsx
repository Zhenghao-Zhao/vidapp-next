import React, { useCallback, useEffect, useMemo, useState } from "react";
import CanvasImage from "./CanvasImage";
import { IconType } from "@/app/_assets/Icons";
import Icon from "@/app/_components/common/Icon";
import Spinner from "@/app/_components/loaders/Loaders";
import IconButton from "@/app/_components/common/buttons/IconButton";
import { IndexDot } from "../../../images/Common";
import { FilterParams, ImageInfo, Transform } from "../constants";
import { EditPalette } from "../components/EditPalette";
import Header from "../components/Header";

export default function EditZone({
  imageInfoList,
  transforms,
  filters,
  blobs,
  changeFilters,
  currentImageIndex,
  changeCurrentImageIndex,
  changeUploadImages,
  goNext,
  goPrev,
}: {
  imageInfoList: ImageInfo[];
  transforms: Transform[];
  filters: FilterParams[];
  blobs: Blob[];
  currentImageIndex: number;
  changeFilters: (f: FilterParams) => void;
  changeCurrentImageIndex: (imageIndex: number) => void;
  changeUploadImages: (imageURLs: Blob[]) => void;
  goNext: () => void;
  goPrev: () => void;
}) {
  const [isPending, setPending] = useState(false);
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    const myWorker = new Worker(
      new URL("../../workers/index.ts", import.meta.url)
    );
    myWorker.onmessage = function (event) {
      changeUploadImages(event.data);
      setPending(false);
      goNext();
    };
    setWorker(myWorker);
    return () => {
      myWorker.terminate();
    };
  }, []);

  const onClickNext = () => {
    if (!worker) return;
    setPending(true);
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const offscreen = canvas.transferControlToOffscreen();
    const canvasData = imageInfoList.map((_, i) => {
      return { ...getCropParams(i), filter: filters[i] };
    });
    worker.postMessage({ canvas: offscreen, blobs, canvasData }, [offscreen]);
  };

  const getCropParams = useCallback(
    (imageIndex: number) => {
      const transform = transforms[imageIndex];
      const imageInfo = imageInfoList[imageIndex];
      const containerSize = Math.min(imageInfo.width, imageInfo.height);
      const marginRight =
        (imageInfo.width * transform.scale - containerSize) / 2;
      const marginBottom =
        (imageInfo.height * transform.scale - containerSize) / 2;

      const sx =
        ((marginRight - transform.translateX) /
          (imageInfo.width * transform.scale)) *
        imageInfo.natWidth;
      const sy =
        ((marginBottom - transform.translateY) /
          (imageInfo.height * transform.scale)) *
        imageInfo.natHeight;
      const sWidth =
        (containerSize / (imageInfo.width * transform.scale)) *
        imageInfo.natWidth;
      const sHeight =
        (containerSize / (imageInfo.height * transform.scale)) *
        imageInfo.natHeight;
      return {
        sx,
        sy,
        sWidth,
        sHeight,
        dx: 0,
        dy: 0,
        dSize: Math.min(imageInfo.natHeight, imageInfo.natWidth),
        styleSize: containerSize,
      };
    },
    [imageInfoList, transforms]
  );

  const currentCropParams = useMemo(() => {
    return getCropParams(currentImageIndex);
  }, [currentImageIndex, getCropParams]);

  const changeSlide = (n: 1 | -1) => {
    changeCurrentImageIndex(currentImageIndex + n);
  };

  return (
    <div className="flex w-full flex-col">
      <Header onPrev={goPrev} onNext={onClickNext} title={"Edit"} isPending={isPending} />
      <div className="flex">
        <div className="flex w-upload-image-width aspect-1 justify-center items-center relative bg-white">
          <CanvasImage
            cropParams={{
              ...currentCropParams,
              image: imageInfoList[currentImageIndex].image,
            }}
            filterParams={filters[currentImageIndex]}
          />
          {imageInfoList.length > 1 && (
            <IndexDot
              imageCount={imageInfoList.length}
              currIndex={currentImageIndex}
            />
          )}
          {currentImageIndex > 0 && (
            <div className="absolute left-2 z-10">
              {
                <IconButton
                  icon={IconType.ArrowLeft}
                  handleClick={() => changeSlide(-1)}
                  className="backdrop-blur-xl bg-black bg-opacity-20"
                  fill="text-white"
                />
              }
            </div>
          )}
          {currentImageIndex < imageInfoList.length - 1 && (
            <div className="absolute right-2 z-10">
              {
                <IconButton
                  icon={IconType.ArrowRight}
                  handleClick={() => changeSlide(1)}
                  className="backdrop-blur-xl bg-black bg-opacity-20"
                  fill="text-white"
                />
              }
            </div>
          )}
        </div>
        <EditPalette
          key={currentImageIndex}
          filter={filters[currentImageIndex]}
          changeFilters={changeFilters}
        />
      </div>
    </div>
  );
}



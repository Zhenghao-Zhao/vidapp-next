import React, { useCallback, useEffect, useMemo, useState } from "react";
import CanvasImage from "./CanvasImage";
import { IconType } from "@/app/_assets/Icons";
import Icon from "@/app/_components/common/Icon";
import Spinner from "@/app/_components/loaders";
import IconButton from "@/app/_components/common/buttons/IconButton";
import { IndexDot } from "../../../images/Common";
import Dragbar from "../../../common/DragBar";
import { FilterParams, ImageInfo, Transform } from "../constants";

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
      <div className="flex justify-between items-center h-upload-header w-full bg-white p-4">
        <button
          className="w-upload-step flex items-center justify-center"
          onClick={goPrev}
        >
          <Icon icon={IconType.ArrowLeft} />
        </button>
        <div className="text-lg font-bold">Edit</div>
        <button
          className="w-upload-step font-[500] flex items-center justify-center"
          onClick={onClickNext}
        >
          {isPending ? <Spinner /> : "Next"}
        </button>
      </div>
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
        <AdjustmentPalette
          key={currentImageIndex}
          filter={filters[currentImageIndex]}
          changeFilters={changeFilters}
        />
      </div>
    </div>
  );
}

export function AdjustmentPalette({
  filter,
  changeFilters,
}: {
  filter: FilterParams;
  changeFilters: (f: FilterParams) => void;
}) {
  const updateFilter = (filterName: string, val: number) => {
    changeFilters({ ...filter, [filterName]: val });
  };

  return (
    <div className="flex flex-col justify-around w-upload-caption h-full p-[20px] shrink-0 border-t">
      <Adjustment
        title={"Brightness"}
        scale={filter.brightness}
        changeScale={(scale) => updateFilter("brightness", scale)}
        minScale={0}
        maxScale={2}
        neutral={1}
      />
      <Adjustment
        title={"Contrast"}
        scale={filter.contrast}
        changeScale={(scale) => updateFilter("contrast", scale)}
        minScale={0}
        maxScale={2}
        neutral={1}
      />
      <Adjustment
        title={"Saturation"}
        scale={filter.saturation}
        changeScale={(scale) => updateFilter("saturation", scale)}
        minScale={0}
        maxScale={2}
        neutral={1}
      />
      <Adjustment
        title={"Sepia"}
        scale={filter.sepia}
        changeScale={(scale) => updateFilter("sepia", scale)}
        minScale={0}
        maxScale={1}
        neutral={0}
      />
      <Adjustment
        title={"Grayscale"}
        scale={filter.grayscale}
        changeScale={(scale) => updateFilter("grayscale", scale)}
        minScale={0}
        maxScale={1}
        neutral={0}
      />
    </div>
  );
}

function Adjustment({
  title,
  scale,
  changeScale,
  maxScale,
  minScale,
  neutral,
}: {
  title: string;
  scale: number;
  changeScale: (scale: number) => void;
  maxScale: number;
  minScale: number;
  neutral: number;
}) {
  return (
    <div className="w-full h-fit shrink-0 group">
      <div className="flex justify-between">
        <p className="text-xl">{title}</p>
        <button
          className="opacity-0 group-hover:opacity-100 transition-all ease-out"
          onClick={() => changeScale(neutral)}
        >
          Reset
        </button>
      </div>
      <div className="flex w-full h-fit items-center">
        <Dragbar
          scale={scale}
          changeScale={changeScale}
          maxScale={maxScale}
          minScale={minScale}
        />
        <p className="w-6 mx-2 text-center">{Math.round(scale * 100)}</p>
      </div>
    </div>
  );
}
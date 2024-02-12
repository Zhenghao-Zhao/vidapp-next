import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ImageInfo } from "../CreateImage";
import { IconType } from "@/app/_assets/Icons";
import Icon from "../../../common/Icon";
import IconButton from "../../../common/buttons/IconButton";
import { IndexDot } from "../../Common";
import AdjustableImage from "../AdjustableImage";
import CanvasImage, { FilterParams } from "../CanvasImage";
import Dragbar from "../DragBar";

export type Transform = {
  scale: number;
  translateX: number;
  translateY: number;
};

const initFilterValues = {
  brightness: 1, // 0 - 2, 1 neutral
  contrast: 1, // 0 - 2, 1 neutral
  saturation: 1, // 0 - 2, 0 unsaturated, 1 unchanged
  sepia: 0, // 0 - 1, 1 completely sepia, 0 no change
  grayscale: 0, // 0 - 1, 1 completely grayscaled, 0 no change
};

export default function CropZone({
  imageInfoList,
  currentStep,
  goPrev,
  goNext,
}: {
  imageInfoList: ImageInfo[];
  currentStep: number;
  goPrev: () => void;
  goNext: () => void;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [transforms, setTransforms] = useState<Transform[]>(
    Array.from({ length: imageInfoList.length }).map(() => {
      return { translateX: 0, translateY: 0, scale: 1 };
    })
  );
  const [filters, setFilters] = useState<FilterParams[]>(
    Array.from({ length: imageInfoList.length }).map(() => {
      return initFilterValues;
    })
  );

  const changeTransforms = useCallback(
    (change: Transform) => {
      const update = transforms.map((t, i) => {
        return i === currentImageIndex ? change : t;
      });
      setTransforms(update);
    },
    [currentImageIndex]
  );

  const changeFilters = useCallback(
    (change: FilterParams) => {
      const update = filters.map((f, i) => {
        return i === currentImageIndex ? change : f;
      });
      setFilters(update);
    },
    [currentImageIndex]
  );

  const changeSlide = (n: 1 | -1) => {
    setCurrentImageIndex((prev) => prev + n);
  };

  const cropParams = useMemo(() => {
    const transform = transforms[currentImageIndex];
    const imageInfo = imageInfoList[currentImageIndex];
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
    const dSize = Math.min(imageInfo.natHeight, imageInfo.natWidth);

    return {
      sx,
      sy,
      sWidth,
      sHeight,
      dx: 0,
      dy: 0,
      dSize,
      styleSize: containerSize,
      image: imageInfo.image,
    }
  }, [currentImageIndex, transforms, imageInfoList])

  const canvasParams = useMemo(() => {
    return {...cropParams, ...filters[currentImageIndex]}
  }, [cropParams, currentImageIndex, filters])

  return (
    <div
      className={`flex flex-col h-full ${
        currentStep === 2 ? "w-upload-image-width" : "w-upload-width"
      } transition-all`}
    >
      <div className="flex justify-between items-center h-upload-header w-full bg-white p-4">
        <button
          className="w-upload-step flex items-center justify-center"
          onClick={goPrev}
        >
          <Icon icon={IconType.ArrowLeft} />
        </button>
        <div className="text-lg font-bold">Crop</div>
        <button
          className="w-upload-step font-[500] flex items-center justify-center"
          onClick={goNext}
        >
          Next
        </button>
      </div>
      <div className="flex h-upload-image-width">
        <div className="flex h-full w-upload-image-width">
          <div className="w-full aspect-1 shrink-0">
            <div
              className={`flex w-full h-full justify-center items-center bg-white relative`}
            >
              {currentStep === 2 ? (
                <AdjustableImage
                  key={currentImageIndex}
                  imageInfo={imageInfoList[currentImageIndex]}
                  transform={transforms[currentImageIndex]}
                  changeTransforms={changeTransforms}
                />
              ) : (
                <CanvasImage {...canvasParams} />
              )}
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
          </div>
        </div>
        {currentStep === 3 && (
          <AdjustmentPalette
            key={currentImageIndex}
            filter={filters[currentImageIndex]}
            changeFilters={changeFilters}
          />
        )}
      </div>
    </div>
  );
}

function AdjustmentPalette({
  filter,
  changeFilters,
}: {
  filter: FilterParams;
  changeFilters: (f: FilterParams) => void;
}) {
  const [brightness, setBrightness] = useState(filter.brightness);
  const [contrast, setContrast] = useState(filter.contrast);
  const [saturation, setSaturation] = useState(filter.saturation);
  const [sepia, setSepia] = useState(filter.sepia);
  const [grayscale, setGrayscale] = useState(filter.grayscale);

  useEffect(() => {
    changeFilters({ brightness, contrast, saturation, sepia, grayscale });
  }, [brightness, contrast, saturation, sepia, grayscale]);

  const changeBrightness = (value: number) => {
    setBrightness(value);
  };

  const changeContrast = (value: number) => {
    setContrast(value);
  };

  const changeSaturation = (value: number) => {
    setSaturation(value);
  };

  const changeSepia = (value: number) => {
    setSepia(value);
  };

  const changeGrayscale = (value: number) => {
    setGrayscale(value);
  };
  return (
    <div className="flex flex-col justify-around w-upload-caption h-full p-[20px] shrink-0 border-t">
      <Adjustment
        title={"Brightness"}
        scale={brightness}
        changeScale={changeBrightness}
        minScale={0}
        maxScale={2}
        neutral={1}
      />
      <Adjustment
        title={"Contrast"}
        scale={contrast}
        changeScale={changeContrast}
        minScale={0}
        maxScale={2}
        neutral={1}
      />
      <Adjustment
        title={"Saturation"}
        scale={saturation}
        changeScale={changeSaturation}
        minScale={0}
        maxScale={2}
        neutral={1}
      />
      <Adjustment
        title={"Sepia"}
        scale={sepia}
        changeScale={changeSepia}
        minScale={0}
        maxScale={1}
        neutral={0}
      />
      <Adjustment
        title={"Grayscale"}
        scale={grayscale}
        changeScale={changeGrayscale}
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

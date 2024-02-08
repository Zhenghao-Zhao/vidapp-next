import React, {
  useMemo,
  useState,
} from "react";
import { ImageInfo } from "../CreateImage";
import { IconType } from "@/app/_assets/Icons";
import Icon from "../../common/Icon";
import IconButton from "../../common/buttons/IconButton";
import { IndexDot } from "../Common";
import AdjustableImage from "../AdjustableImage";
import CanvasImage from "../CanvasImage";

export type Transform = {
  scale: number;
  translateX: number;
  translateY: number;
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
  const imageCount = imageInfoList.length;

  const changeTransforms = (change: Transform) => {
    const update = transforms.map((t, i) => {
      return i === currentImageIndex ? change : t;
    });
    setTransforms(update);
  };

  const changeSlide = (n: 1 | -1) => {
    setCurrentImageIndex((prev) => prev + n);
  };

  const imageArray = useMemo(
    () =>
      imageInfoList.map((imageInfo, i) => (
        <AdjustableImage
          key={i}
          imageInfo={imageInfo}
          transform={transforms[currentImageIndex]}
          changeTransforms={changeTransforms}
        />
      )),
    [transforms, currentImageIndex]
  );

  const canvasArray = useMemo(() => {
    return imageInfoList.map((imageInfo, i) => {
      const transform = transforms[i];
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

      return (
        <CanvasImage
          key={i}
          {...{
            sx,
            sy,
            sWidth,
            sHeight,
            dx: 0,
            dy: 0,
            dSize,
            styleSize: containerSize,
            image: imageInfo.image
          }}
        />
      );
    });
  }, [transforms, currentImageIndex]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between items-center h-[50px] w-full bg-white">
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
      <div className="flex h-upload-width">
        <div className="w-upload-width h-upload-width">
          <div
            className={`flex w-full h-full justify-center items-center bg-white relative`}
          >
            {currentStep===2? imageArray[currentImageIndex] : canvasArray[currentImageIndex]}
            {imageCount > 1 && (
              <IndexDot imageCount={imageCount} currIndex={currentImageIndex} />
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
            {currentImageIndex < imageCount - 1 && (
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
    </div>
  );
}

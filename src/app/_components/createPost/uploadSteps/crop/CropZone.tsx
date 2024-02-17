import React, { useState } from "react";
import { IconType } from "@/app/_assets/Icons";
import Icon from "@/app/_components/common/Icon";
import Spinner from "@/app/_components/loaders";
import IconButton from "@/app/_components/common/buttons/IconButton";
import { IndexDot } from "../../../images/Common";
import AdjustableImage from "./AdjustableImage";
import { ImageInfo, Transform } from "../constants";

export default function CropZone({
  currentImageIndex,
  imageInfoList,
  transforms,
  changeTransforms,
  changeCurrentImageIndex,
  goPrev,
  goNext,
}: {
  currentImageIndex: number;
  imageInfoList: ImageInfo[];
  transforms: Transform[];
  changeTransforms: (transform: Transform) => void;
  changeCurrentImageIndex: (imageIndex: number) => void;
  goPrev: () => void;
  goNext: () => void;
}) {
  const [isPending, setPending] = useState(false);

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
        <div className="text-lg font-bold">Crop</div>
        <button
          className="w-upload-step font-[500] flex items-center justify-center"
          onClick={goNext}
        >
          {isPending ? <Spinner /> : "Next"}
        </button>
      </div>
      <div className="flex justify-center items-center bg-white relative w-upload-image-width h-upload-image-width">
        <AdjustableImage
          key={currentImageIndex}
          imageInfo={imageInfoList[currentImageIndex]}
          transform={transforms[currentImageIndex]}
          changeTransforms={changeTransforms}
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
    </div>
  );
}

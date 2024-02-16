import { IconType } from "@/app/_assets/Icons";
import Icon from "@/app/_components/common/Icon";
import IconButton from "@/app/_components/common/buttons/IconButton";
import Spinner from "@/app/_components/loaders";
import React, { useState } from "react";
import { IndexDot } from "../../Common";

export default function SubmitZone({
  uploadImageURLs,
  goPrev,
}: {
  uploadImageURLs: string[];
  goPrev: () => void;
}) {
  const [isPending, setPending] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const changeSlide = (n: 1 | -1) => {
    setCurrentImageIndex((prev) => prev + n);
  };

  const handleSubmit = () => {};
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center h-upload-header w-full bg-white p-4">
        <button
          className="w-upload-step flex items-center justify-center"
          onClick={goPrev}
        >
          <Icon icon={IconType.ArrowLeft} />
        </button>
        <div className="text-lg font-bold">Finish upload</div>
        <button
          className="w-upload-step font-[500] flex items-center justify-center"
          onClick={handleSubmit}
        >
          {isPending ? <Spinner /> : "Submit"}
        </button>
      </div>
      <div>
        {uploadImageURLs.length > 1 && (
          <IndexDot
            imageCount={uploadImageURLs.length}
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
        {currentImageIndex < uploadImageURLs.length - 1 && (
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

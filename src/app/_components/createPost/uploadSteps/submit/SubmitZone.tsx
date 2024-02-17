import { IconType } from "@/app/_assets/Icons";
import Icon from "@/app/_components/common/Icon";
import IconButton from "@/app/_components/common/buttons/IconButton";
import Spinner from "@/app/_components/loaders";
import React, { useEffect, useMemo, useState } from "react";
import { IndexDot } from "../../../images/Common";

export default function SubmitZone({
  uploadImages,
  currentImageIndex,
  goPrev,
  changeCurrentImageIndex,
}: {
  uploadImages: Blob[];
  currentImageIndex: number;
  goPrev: () => void;
  changeCurrentImageIndex: (i: number) => void;
}) {
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    blobURLs.forEach((url) => {
      const image = new window.Image();
      image.src = url;
    });
  }, []);

  const blobURLs = useMemo(() => {
    return uploadImages.map((blob) => URL.createObjectURL(blob));
  }, [uploadImages]);

  const changeSlide = (n: 1 | -1) => {
    changeCurrentImageIndex(currentImageIndex + n);
  };

  const handleSubmit = () => {};
  return (
    <div className="flex w-full flex-col h-full">
      <div className="flex justify-between items-center h-upload-header w-full bg-white p-4">
        <button
          className="w-upload-step flex items-center justify-center"
          onClick={goPrev}
        >
          <Icon icon={IconType.ArrowLeft} />
        </button>
        <div className="text-lg font-bold">Create a new post</div>
        <button
          className="w-upload-step font-[500] flex items-center justify-center"
          onClick={handleSubmit}
        >
          {isPending ? <Spinner /> : "Submit"}
        </button>
      </div>
      <div className="flex h-upload-image-width">
        <div className="flex justify-center items-center w-upload-image-width h-full relative">
          <img
            src={blobURLs[currentImageIndex]}
            className="object-cover w-full h-full"
            alt=""
          />
          {uploadImages.length > 1 && (
            <IndexDot
              imageCount={uploadImages.length}
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
          {currentImageIndex < uploadImages.length - 1 && (
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
        <textarea
          className="w-upload-caption outline-none h-full p-2 border-t"
          // onChange={handleTextChange}
          // value={caption}
          placeholder="Write a caption..."
        />
      </div>
    </div>
  );
}

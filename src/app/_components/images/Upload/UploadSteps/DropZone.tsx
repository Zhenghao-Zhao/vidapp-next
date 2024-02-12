import { icons, IconType } from "@/app/_assets/Icons";
import React, { FormEvent, useRef, useState } from "react";
import { ImageInfo } from "../CreateImage";

const ACCEPTED_UPLOAD_FILE_TYPE =
  "image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime";

const loadImage = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = URL.createObjectURL(file);
    image.onload = () => resolve(image);
  });
};

const hasCorrectFileType = (type: string) => {
  return ACCEPTED_UPLOAD_FILE_TYPE.split(",").includes(type);
};

export default function DropZone({
  goNext,
  addImageInfo,
}: {
  goNext: () => void;
  addImageInfo: (images: ImageInfo[]) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      return;
    }
    const imagePromises = [];
    for (const file of e.currentTarget.files) {
      imagePromises.push(loadImage(file));
    }
    const loadedImages: HTMLImageElement[] = await Promise.all(imagePromises);
    const imageInfoList = [];
    for (const image of loadedImages) {
      imageInfoList.push(getImageInfo(image));
    }
    addImageInfo(imageInfoList)
    goNext();
  };

  function handleDragOver(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  async function handleDrop(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      const imagePromises = [];
      for (const item of ev.dataTransfer.items) {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (!file || !hasCorrectFileType(file.type)) {
            return setError("Missing file or incorrect file type!");
          }
          imagePromises.push(loadImage(file));
        }
        const loadedImages: HTMLImageElement[] = await Promise.all(imagePromises);
        const imageInfoList = [];
        for (const image of loadedImages) {
          imageInfoList.push(getImageInfo(image));
        }
        addImageInfo(imageInfoList)
      }
      goNext();
    }
  }

  const getImageInfo = (image: HTMLImageElement) => {
    if (!containerRef.current) throw new Error("Container not ready.");
    const containerWidth = containerRef.current!.offsetWidth;
    const natWidth = image.naturalWidth;
    const natHeight = image.naturalHeight;
    if (natWidth === 0 || natHeight === 0)
      throw new Error("Image size cannot be zero.");
    const ratio = natHeight / natWidth;
    if (ratio > 1) {
      return {
        dataURL: image.src,
        width: containerWidth,
        height: containerWidth * ratio,
        natWidth: image.naturalWidth,
        natHeight: image.naturalHeight,
        image,
      };
    } else {
      return {
        dataURL: image.src,
        width: containerWidth / ratio,
        height: containerWidth,
        natWidth: image.naturalWidth,
        natHeight: image.naturalHeight,
        image,
      };
    }
  };

  return (
    <div
      className="bg-white w-upload-image-width h-full"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex justify-center items-center text-lg font-bold h-upload-header w-full border-b">
        <p>Create new post</p>
      </div>
      <div ref={containerRef} className="w-full aspect-1">
        <div className="flex items-center w-full h-full justify-center flex-col gap-2">
          <div className="w-20">
            {error ? icons[IconType.Exclaimation] : icons[IconType.DragAndDrop]}
          </div>
          <p className="text-xl my-1 whitespace-nowrap">
            {error ? error : "Drag photos and videos here"}
          </p>
          <form>
            <label
              htmlFor="upload"
              className="bg-blue-500 p-2 hover:bg-blue-600 text-white rounded-md"
            >
              Select from computer
            </label>
            <input
              accept={ACCEPTED_UPLOAD_FILE_TYPE}
              id="upload"
              type="file"
              onChange={handleChange}
              multiple
              hidden
            />
          </form>
        </div>
      </div>
    </div>
  );
}

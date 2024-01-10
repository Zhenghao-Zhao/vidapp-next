import { IconType } from "@/app/_assets/Icons";
import React, { RefObject, useRef, useState } from "react";
import IconButton from "../common/buttons/IconButton";
import AdjustableImage from "./AdjustableImage";
import { Steps } from "./CreateImage";
import { toast } from "react-toastify";

export default function ImageEditor({
  dataURLs,
  prev,
}: {
  dataURLs: string[] | null;
  prev: () => void;
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const canvasArrayRef = useRef<RefObject<HTMLCanvasElement>[]>([]);
  const handleLeftClick = () => {
    if (!listRef.current) return;
    listRef.current.scrollLeft -= 800;
    setCurrentImage((prev) => prev - 1);
  };
  const handleRightClick = () => {
    if (!listRef.current) return;
    listRef.current.scrollLeft += 800;
    setCurrentImage((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    if (!canvasArrayRef.current) return;
    const formData = new FormData();
    const blobs: Promise<Blob | null>[] = [];
    for (const c of canvasArrayRef.current) {
      const blob: Promise<Blob | null> = new Promise((resolve) =>
        c.current?.toBlob(resolve)
      );
      blobs.push(blob);
    }
    const rst = await Promise.all(blobs);
    for (const b of rst) {
      console.log(b);
      if (!b) throw new Error("Image does not exist!");
      const file = new File([b], "fileName.jpg", { type: "image/jpeg" });
      formData.append("file", file);
    }
    const res = await fetch("/api/image", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.ok) {
      toast.success("Submit successfully");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="flex flex-row justify-between items-center text-lg font-bold h-[50px] w-full px-4 bg-white">
        <IconButton icon={IconType.ArrowLeft} handleClick={prev} />
        <p>Edit</p>
        <button onClick={handleSubmit}>Next</button>
      </div>
      <div
        className={`flex h-[800px] w-[800px] overflow-hidden bg-white`}
        ref={listRef}
      >
        {dataURLs &&
          dataURLs.map((url, index) => (
            <div
              key={index}
              className="h-full w-full shrink-0 overflow-hidden "
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

function Indicator({
  imageCount,
  currIndex,
}: {
  imageCount: number;
  currIndex: number;
}) {
  return (
    <div className="bg-black p-2 rounded-xl bg-opacity-20 flex items-center absolute bottom-4 gap-2 z-10">
      {Array.from({ length: imageCount }).map((_, i) => (
        <div
          key={i}
          className={`w-[6px] h-[6px] transition-colors duration-200 ease-in-out rounded-full ${
            i === currIndex ? "bg-white" : "bg-black"
          }`}
        />
      ))}
    </div>
  );
}

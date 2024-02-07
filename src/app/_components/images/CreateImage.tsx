import { IconType, icons } from "@/app/_assets/Icons";
import React, { FormEvent, useEffect, useState } from "react";
import Spinner, { ImageLoader } from "../loaders";
import ImageEditor from "./ImageEditor";

const ACCEPTED_UPLOAD_FILE_TYPE =
  "image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime";

const hasCorrectFileType = (type: string) => {
  return ACCEPTED_UPLOAD_FILE_TYPE.split(",").includes(type);
};

export default function CreateImage() {
  const [error, setError] = useState<string | null>(null);
  const [dataURLs, setDataURLs] = useState<string[]>([]);

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      return;
    }
    const urlContainer = [];
    for (const file of e.currentTarget.files) {
      urlContainer.push(URL.createObjectURL(file));
    }
    setDataURLs(urlContainer);
  };

  function handleDragOver(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  async function handleDrop(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      const urlContainer = [];
      const fileContainer: File[] = [];
      for (const item of ev.dataTransfer.items) {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (!file || !hasCorrectFileType(file.type)) {
            return setError("Missing file or incorrect file type!");
          }
          fileContainer.push(file);
          urlContainer.push(URL.createObjectURL(file));
        }
      }
      setDataURLs(urlContainer);
    }
  }

  function resetImages() {
    setDataURLs([]);
  }

  return (
    <div className="h-upload-height bg-white">
      {dataURLs.length > 0 ? (
        <ImageEditor dataURLs={dataURLs} resetImages={resetImages} />
      ) : (
        <div
          className="bg-white w-upload-width h-full min-w-upload-width"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex justify-center items-center text-lg font-bold h-[50px] w-full border-b">
            <p>Create new post</p>
          </div>
          <div className="w-full h-upload-width ">
            <div className="flex items-center w-full h-full justify-center flex-col gap-2">
              <div className="w-20">
                {error
                  ? icons[IconType.Exclaimation]
                  : icons[IconType.DragAndDrop]}
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
      )}
    </div>
  );
}

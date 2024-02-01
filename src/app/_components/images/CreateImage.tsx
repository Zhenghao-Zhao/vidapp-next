import { IconType, icons } from "@/app/_assets/Icons";
import React, { FormEvent, useEffect, useState } from "react";
import Spinner, { ImageLoader } from "../loaders";
import ImageEditor from "./ImageEditor";

const ACCEPTED_UPLOAD_FILE_TYPE =
  "image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime";

const hasCorrectFileType = (type: string) => {
  return ACCEPTED_UPLOAD_FILE_TYPE.split(",").includes(type);
};

async function readDataURL(
  imageFile: File
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export default function CreateImage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataURLs, setDataURLs] = useState<string[]>([]);

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      return;
    }
    const urlContainer = [];
    for (const file of e.currentTarget.files) {
      urlContainer.push(readDataURL(file));
    }
    setLoading(true);
    try {
      const base64Array = await Promise.all(urlContainer);
      setDataURLs(base64Array as string[]);
      setLoading(false);
    } catch (e) {
      return setError(e as string);
    }
    setLoading(false);
  };

  function handleDragOver(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  async function handleDrop(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    setLoading(true);

    if (ev.dataTransfer.items) {
      const urlContainer: Promise<string | ArrayBuffer | null>[] = [];
      const fileContainer: File[] = [];
      for (const item of ev.dataTransfer.items) {
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (!file || !hasCorrectFileType(file.type)) {
            setLoading(false);
            return setError("Missing file or incorrect file type!");
          }
          fileContainer.push(file);
          urlContainer.push(readDataURL(file));
        }
      }

      try {
        const base64Array = await Promise.all(urlContainer);
        setDataURLs(base64Array as string[]);
      } catch (e) {
        return setError(e as string);
      }
      setLoading(false);
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
            {loading ? (
                <ImageLoader />
            ) : (
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}

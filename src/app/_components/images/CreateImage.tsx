import { IconType, icons } from "@/app/_assets/Icons";
import React, { FormEvent, useState } from "react";
import { ImageLoader } from "../loaders";
import { delay } from "@/app/_utility/helpers";
import ImageEditor from "./ImageEditor";
import IconButton from "../common/buttons/IconButton";
import { toast } from "react-toastify";

const ACCEPTED_UPLOAD_FILE_TYPE =
  "image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime";

const hasCorrectFileType = (type: string) => {
  return ACCEPTED_UPLOAD_FILE_TYPE.split(",").includes(type);
};

async function readDataURL(
  imageFile: File
): Promise<string | ArrayBuffer | null> {
  await delay(1000);
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

export enum Steps {
  UPLOAD,
  EDIT,
  COMMIT,
}

export default function CreateImage({
  addPrevewImages,
  next,
}: {
  addPrevewImages: (f: string[]) => void;
  next: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      addPrevewImages(base64Array as string[]);
      setLoading(false);
    } catch (e) {
      return setError(e as string);
    }
    setLoading(false);
    next();
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
        addPrevewImages(base64Array as string[]);
      } catch (e) {
        return setError(e as string);
      }
      setLoading(false);
      next();
    }
  }

  return (
      <div
        className="bg-white"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="flex justify-center items-center text-lg font-bold h-[50px] w-full border-b">
          <p>Create a new post</p>
        </div>
        {loading ? (
          <ImageLoader width={800} height={800} />
        ) : (
          <div className="w-[800px] h-[800px] flex items-center justify-center flex-col gap-2">
            <div className="w-20">
              {error
                ? icons[IconType.Exclaimation]
                : icons[IconType.DragAndDrop]}
            </div>
            <p className="text-xl my-1">
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
  );
}

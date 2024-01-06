import { IconType, icons } from "@/app/_assets/Icons";
import React, { FormEvent, useState } from "react";
import { ImageLoader } from "../loaders";
import { delay } from "@/app/_utility/helpers";
import ImageEditor from "./ImageEditor";
import IconButton from "../common/buttons/IconButton";

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
  CROP,
  EDIT,
  COMMIT,
}

export default function CreateImage() {
  const [files, setFiles] = useState<File[] | null>(null);
  const [dataURLs, setDataURLs] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Steps>(0);

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      return;
    }
    const container = [];
    for (const file of e.currentTarget.files) {
      container.push(readDataURL(file));
    }
    setLoading(true);
    try {
      const base64Array = await Promise.all(container);
      setDataURLs(base64Array as string[]);
      setLoading(false);
    } catch (e) {
      setError(e as string);
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
      const container: Promise<string | ArrayBuffer | null>[] = [];
      for (const item of ev.dataTransfer.items) {
        if (item.kind === "file") {
          const file = item.getAsFile();

          if (!file || !hasCorrectFileType(file.type)) {
            setLoading(false);
            return setError("Missing file or incorrect file type!");
          }
          container.push(readDataURL(file));
        }
      }

      try {
        const base64Array = await Promise.all(container);
        setDataURLs(base64Array as string[]);
      } catch (e) {
        setError(e as string);
      }
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg overflow-hidden bg-white">
      <div
        className={`h-[50px] ${
          !dataURLs && "border-b border-black"
        } flex items-center justify-center relative`}
      >
        {currentStep > 0 && (
          <IconButton
            handleClick={() => setCurrentStep((prev) => prev - 1)}
            className="absolute left-2"
            icon={IconType.ArrowLeftCircle}
          />
        )}
        <p className="text-lg font-bold">Create a new post</p>
        <IconButton
          handleClick={() =>
            setCurrentStep((prev) => (prev < 2 ? prev + 1 : prev))
          }
          className="absolute right-2"
          icon={IconType.ArrowRightCircle}
        />
      </div>
      <div
        className="w-[800px] h-[800px] overflow-hidden"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {loading ? (
          <ImageLoader />
        ) : dataURLs ? (
          <ImageEditor dataURLs={dataURLs} setDataURLs={setDataURLs} currentStep={currentStep}/>
        ) : (
          <div className="w-full h-full flex items-center justify-center flex-col gap-2">
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
    </div>
  );
}

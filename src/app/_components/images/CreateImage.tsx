import { IconType, icons } from "@/app/_assets/Icons";
import React, { FormEvent, useState } from "react";
import { ImageLoader } from "../loaders";
import { delay } from "@/app/_utility/helpers";
import ImageCarousel from "./ImageCarousel";

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

export default function CreateImage() {
  const [files, setFiles] = useState<File[] | null>(null);
  const [dataURLs, setDataURLs] = useState<string[] | null>(null);
  const [converting, setConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      return;
    }
    const container = [];
    for (const file of e.currentTarget.files) {
      container.push(readDataURL(file));
    }
    setConverting(true);
    try {
      const base64Array = await Promise.all(container);
      setDataURLs(base64Array as string[]);
      setConverting(false);
    } catch (e) {
      setError(e as string);
    }
    setConverting(false);
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   if (!imageRef.current || !imageRef.current.files) return;

  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", imageRef.current.files[0]);
  //   const res = await fetch("/api/image", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   const data = await res.json();
  //   if (data.ok) {
  //     setImage(imageRef.current.files[0]);
  //   }
  //   console.log(res, data);
  // };

  function handleDragOver(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
  }

  async function handleDrop(ev: React.DragEvent<HTMLDivElement>) {
    ev.preventDefault();
    setConverting(true);

    if (ev.dataTransfer.items) {
      const container: Promise<string | ArrayBuffer | null>[] = [];
      for (const item of ev.dataTransfer.items) {
        if (item.kind === "file") {
          const file = item.getAsFile();

          if (!file || !hasCorrectFileType(file.type)) {
            setConverting(false);
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
      setConverting(false);
    }
  }

  return (
    <div className="bg-white rounded-lg">
      <div className="">
        <div className="h-[50px] border-b border-black flex items-center justify-center">
          <p className="text-lg font-bold">Create a new post</p>
        </div>
        <div
          className="flex items-center justify-center flex-col gap-2 w-[800px] h-[800px] overflow-hidden"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {converting ? (
            <ImageLoader />
          ) : dataURLs ? (
            <ImageCarousel dataURLs={dataURLs} />
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

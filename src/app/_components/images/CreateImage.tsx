import { IconType, icons } from "@/app/_assets/Icons";
import Image from "next/image";
import React, { FormEvent, useRef, useState } from "react";
import { ImageLoader, LoadingComponent } from "../loaders";
import { delay } from "@/app/_utility/helpers";

async function readFileAs64(imageFile: File) {
  await delay();
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
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [converting, setConverting] = useState(false);

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) {
      return;
    }
    const file = e.currentTarget.files[0];
    setConverting(true);
    const base64 = await readFileAs64(file);
    setBase64(base64 as string);
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

  return (
    <div className="w-[1000px] h-[800px] bg-white rounded-lg">
      {converting? <ImageLoader /> : base64 ? (
        <Image
          src={base64}
          fill={true}
          alt="Upload Image"
          className="object-contain"
        />
      ) : (
        <>
          <div className="h-[50px] border-b border-black flex items-center justify-center">
            <p className="text-lg font-bold">Create a new post</p>
          </div>
          <div className="flex items-center justify-center flex-col gap-2 h-[750px]">
            <div className="w-20 ">{icons[IconType.DragAndDrop]}</div>
            <p className="text-xl my-1">Drag photos and videos here</p>
            <form>
              <label
                htmlFor="upload"
                className="bg-blue-500 p-2 text-white rounded-md"
              >
                Select from computer
              </label>
              <input
                accept="image/jpeg,image/png,image/heic,image/heif,video/mp4,video/quicktime"
                id="upload"
                type="file"
                onChange={handleChange}
                hidden
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
}

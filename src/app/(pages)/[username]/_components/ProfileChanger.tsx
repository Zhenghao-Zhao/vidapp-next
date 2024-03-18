import React, { FormEvent, useEffect, useState } from "react";
import {
  ACCEPTED_UPLOAD_FILE_TYPE,
  CanvasData,
  initFilterValues,
} from "@/app/_components/createPost/uploadSteps/constants";
import Spinner, { SpinnerSize } from "@/app/_components/loaders";
import { postProfileImage } from "@/app/_mutations";
import { useMutation } from "@tanstack/react-query";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import useWorker from "@/app/_hooks/useWorker";
import ProfileImage from "./ProfileImage";
import { loadImage } from "@/app/_utility/helpers";

export default function ProfileChanger() {
  const { profile, setProfile } = useAuthContext();
  const worker = useWorker((event: MessageEvent<any>) => {
    if (!profile) return;
    const formData = new FormData();
    formData.append("file", event.data[0]);
    if (profile.image_id)
      formData.append("image_id", profile.image_id.toString());
    mutate(formData);
  });

  const {
    mutate,
    isPending: isUploadPending,
    error,
  } = useMutation({
    mutationFn: (formData: FormData) => postProfileImage(formData),
    onSuccess: (data) => {
      setProfile({ ...profile, ...data.data.profile });
    },
    onError: () => {
      console.log(error?.message);
    },
  });

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    if (
      !e.currentTarget.files ||
      !e.currentTarget.files[0] ||
      !profile ||
      !worker
    )
      return;
    const file = e.currentTarget.files[0];
    const image: HTMLImageElement = await loadImage(file);
    const initSize = 320;
    const canvasData: CanvasData = {
      sx: 0,
      sy: 0,
      sWidth: image.naturalWidth,
      sHeight: image.naturalHeight,
      dx: 0,
      dy: 0,
      dWidth: initSize,
      dHeight: initSize * (image.naturalHeight / image.naturalWidth),
      cWidth: initSize,
      cHeight: initSize,
      filter: initFilterValues,
    };
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const offscreen = canvas.transferControlToOffscreen();
    worker.postMessage(
      { canvas: offscreen, blobs: [file], canvasData: [canvasData] },
      [offscreen]
    );
  };
  return (
    <form>
      <div className="relative">
        <label htmlFor="profileUpload">
          <ProfileImage />
        </label>
        {isUploadPending && (
          <div className="absolute w-full h-full bg-white opacity-50 flex items-center justify-center top-0">
            <Spinner size={SpinnerSize.MEDIUM} />
          </div>
        )}
      </div>
      <input
        accept={ACCEPTED_UPLOAD_FILE_TYPE}
        id="profileUpload"
        type="file"
        onChange={handleChange}
        hidden
      />
    </form>
  );
}
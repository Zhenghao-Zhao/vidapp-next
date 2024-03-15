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
import { loadImage } from "@/app/_components/createPost/uploadSteps/drop";
import { profile } from "console";
import useWorker from "@/app/_hooks/useWorker";
import ProfileImage from "./ProfileImage";

export default function ProfileChanger() {
  const { profile, setProfile } = useAuthContext();
  const [blob, setBlob] = useState<Blob | null>(null);
  const worker = useWorker((event: MessageEvent<any>) =>
    setBlob(event.data[0])
  );
  const {
    mutate,
    isPending: isUploadPending,
    error,
  } = useMutation({
    mutationFn: (formData: FormData) => postProfileImage(formData),
    onSuccess: (data) => {
      // setProfile
      console.log(data)
    },
    onError: () => {
      console.log(error?.message);
    },
  });

  useEffect(() => {
    if (!blob || !profile) return;
    const formData = new FormData();
    formData.append("file", blob);
    formData.append("profile_image_id", profile.image_id + "");
    mutate(formData);
  }, [blob]);

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || !profile || !worker) return;
    const file = e.currentTarget.files[0];
    const image: HTMLImageElement = await loadImage(file);
    const canvasData: CanvasData = {
      sx: 0,
      sy: 0,
      sWidth: image.naturalWidth,
      sHeight: image.naturalHeight,
      dx: 0,
      dy: 0,
      dWidth: image.naturalWidth,
      dHeight: image.naturalHeight,
      styleSize: 150,
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
        {isUploadPending && (
          <div className="absolute w-full h-full bg-white opacity-50 flex items-center justify-center">
            <Spinner size={SpinnerSize.MEDIUM} />
          </div>
        )}
        <label htmlFor="profileUpload">
          <ProfileImage />
        </label>
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

import {
  ACCEPTED_UPLOAD_FILE_TYPE,
  CanvasData,
  initFilterValues,
} from "@/app/_components/createPost/uploadSteps/constants";
import Spinner, { SpinnerSize } from "@/app/_components/loaders";
import { useDataContext } from "@/app/_contexts/providers/DataContextProvider";
import useWorker from "@/app/_hooks/useWorker";
import { handlePostProfileImage } from "@/app/_mutations";
import { PROFILE_IMAGE_SIZE } from "@/app/_utility/constants";
import { loadImage } from "@/app/_utility/helpers";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import ProfileImage from "./ProfileImage";

export default function ProfileChanger() {
  const { data: serverData, setData } = useDataContext();
  const worker = useWorker((event: MessageEvent<any>) => {
    const formData = new FormData();
    formData.append("file", event.data[0]);
    mutate(formData);
  });
  const {
    mutate,
    isPending: isUploadPending,
    error,
  } = useMutation({
    mutationFn: (formData: FormData) => handlePostProfileImage(formData),
    onSuccess: (data) => {
      const imageURL = data.data.profile.imageURL;
      const rtn_profile = {...serverData!.profile, imageURL};
      setData(({...serverData!, profile: rtn_profile}))
    },
    onError: () => {
      console.log(error?.message);
    },
  });

  const handleChange = async (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files || !e.currentTarget.files[0] || !serverData || !worker)
      return;
    const file = e.currentTarget.files[0];
    const image: HTMLImageElement = await loadImage(file);
    const dWidth = Math.max(
      PROFILE_IMAGE_SIZE,
      (image.naturalWidth / image.naturalHeight) * PROFILE_IMAGE_SIZE
    );
    const dHeight = Math.max(
      PROFILE_IMAGE_SIZE,
      (image.naturalHeight / image.naturalWidth) * PROFILE_IMAGE_SIZE
    );
    const canvasData: CanvasData = {
      sx: 0,
      sy: 0,
      sWidth: image.naturalWidth,
      sHeight: image.naturalHeight,
      dx: 0,
      dy: 0,
      dWidth,
      dHeight,
      cWidth: PROFILE_IMAGE_SIZE,
      cHeight: PROFILE_IMAGE_SIZE,
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
          <ProfileImage imageURL={serverData?.profile.imageURL} />
        </label>
        {isUploadPending && (
          <div className="absolute w-full h-full opacity-50 flex items-center justify-center top-0">
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

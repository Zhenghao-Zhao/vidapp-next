import {
    ACCEPTED_UPLOAD_FILE_TYPE,
    CanvasData,
    initFilterValues,
} from "@/app/_components/posts/createPost/lib";
import Throbber, { ThrobberSize } from "@/app/_components/ui/loaders";
import { handlePostProfileImage } from "@/app/_libs/api/mutations";
import { Image } from "@/app/_libs/constants";
import { useDataContext } from "@/app/_libs/contexts/providers/ServerContextProvider";
import useWorker from "@/app/_libs/hooks/useWorker";
import { loadImage } from "@/app/_libs/utils";
import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import ProfileImage from "./ProfileImage";

export default function ProfileChanger({twSize}: {twSize?: string}) {
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
      Image.PROFILE_IMAGE_SIZE,
      (image.naturalWidth / image.naturalHeight) * Image.PROFILE_IMAGE_SIZE
    );
    const dHeight = Math.max(
      Image.PROFILE_IMAGE_SIZE,
      (image.naturalHeight / image.naturalWidth) * Image.PROFILE_IMAGE_SIZE
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
      cWidth: Image.PROFILE_IMAGE_SIZE,
      cHeight: Image.PROFILE_IMAGE_SIZE,
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
      <div className="relative ">
        <label htmlFor="profileUpload">
          <ProfileImage imageURL={serverData?.profile.imageURL} twSize={twSize} />
        </label>
        {isUploadPending && (
          <div className="absolute w-full h-full opacity-50 flex items-center justify-center top-0">
            <Throbber size={ThrobberSize.MEDIUM} />
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

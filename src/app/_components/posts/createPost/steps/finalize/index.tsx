import Carousel from "@/app/_components/posts/components/Carousel";
import { Chaser } from "@/app/_components/ui/loaders";
import { useModalContext } from "@/app/_libs/contexts/providers/ModalContextProivder";
import { handleAddPost } from "@/app/_libs/mutries/mutations";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import UploadHeader from "../../components/UploadHeader";
import { UploadSteps } from "../../lib";

export default function Finalize({
  uploadImages,
  currentImageIndex,
  currentStep,
  goPrev,
  goNext,
  changeCurrentImageIndex,
}: {
  uploadImages: Blob[];
  currentImageIndex: number;
  currentStep: UploadSteps;
  goPrev: () => void;
  goNext: () => void;
  changeCurrentImageIndex: (i: number) => void;
}) {
  const [caption, setCaption] = useState("");
  const { setOpenAlert: setShowAlert } = useModalContext();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => handleAddPost(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries();
      setShowAlert(false);
    },
  });

  const blobURLs = useMemo(() => {
    return uploadImages.map((blob) => URL.createObjectURL(blob));
  }, [uploadImages]);

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const blob of uploadImages) {
      formData.append("file", blob);
    }
    formData.append("text", caption);
    mutate(formData);
    goNext();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.currentTarget.value);
  };

  if (currentStep == UploadSteps.Submit) {
    return (
      <div className="flex flex-col w-full h-full">
        <UploadHeader title={isPending ? "Sharing" : "Shared"} />
        <div className="flex justify-center items-center w-upload-image-width h-upload-image-width">
          {isPending ? <Chaser /> : "Uploaded succesfully!"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col h-full">
      <UploadHeader
        onPrev={goPrev}
        onNext={handleSubmit}
        title={"Create a new post"}
        nextLabel="Share"
      />
      <div className="flex h-upload-image-width">
        <Carousel
          childIndex={currentImageIndex}
          updateChildIndex={changeCurrentImageIndex}
          length={blobURLs.length}
          className="w-upload-image-width h-upload-image-width"
        >
          <img
            src={blobURLs[currentImageIndex]}
            className="object-cover w-full h-full"
            alt="upload image"
          />
        </Carousel>
        <textarea
          className="bg-modal-primary w-upload-caption outline-none h-full p-2 border-t"
          onChange={handleTextChange}
          value={caption}
          placeholder="Write a caption..."
        />
      </div>
    </div>
  );
}

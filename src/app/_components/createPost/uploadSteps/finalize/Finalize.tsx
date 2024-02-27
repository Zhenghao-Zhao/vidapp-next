import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Carousel from "@/app/_components/images/common";
import { useAuthContext } from "@/app/_contexts/AuthContextProvider";
import { useMutation } from "@tanstack/react-query";
import { UploadSteps } from "../constants";
import { Chaser } from "@/app/_components/loaders/Loaders";
import axios from "axios";

function addPost(postData: FormData) {
  return axios.post("api/image", postData);
}

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
  const { mutate, isPending } = useMutation({
    mutationFn: addPost,
  });

  const { user } = useAuthContext();

  useEffect(() => {
    blobURLs.forEach((url) => {
      const image = new window.Image();
      image.src = url;
    });
  }, []);

  const blobURLs = useMemo(() => {
    return uploadImages.map((blob) => URL.createObjectURL(blob));
  }, [uploadImages]);

  const handleSubmit = async () => {
    if (!user) return;
    const formData = new FormData();
    for (const blob of uploadImages) {
      formData.append("file", new File([blob], "uploadImage"));
    }
    formData.append("text", caption);
    formData.append("userID", user.id);
    mutate(formData);
    goNext();
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.currentTarget.value);
  };

  if (currentStep == UploadSteps.Submit) {
    return (
      <div className="flex flex-col w-full h-full bg-white">
        <Header title="Sharing" />
        <div className="flex justify-center items-center w-upload-image-width h-upload-image-width">
          {isPending ? <Chaser /> : "Uploaded succesfully!"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col h-full">
      <Header
        onPrev={goPrev}
        onNext={handleSubmit}
        title={"Create a new post"}
      />
      <div className="flex h-upload-image-width">
        <Carousel
          childIndex={currentImageIndex}
          updateChildIndex={changeCurrentImageIndex}
          length={blobURLs.length}
          className="w-upload-image-width h-upload-image-width bg-white"
        >
          <img
            src={blobURLs[currentImageIndex]}
            className="object-cover w-full h-full"
            alt="upload image"
          />
        </Carousel>
        <textarea
          className="w-upload-caption outline-none h-full p-2 border-t"
          onChange={handleTextChange}
          value={caption}
          placeholder="Write a caption..."
        />
      </div>
    </div>
  );
}

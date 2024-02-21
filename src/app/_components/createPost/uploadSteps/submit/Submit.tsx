import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Carousel from "@/app/_components/images/common";

export default function Submit({
  uploadImages,
  currentImageIndex,
  goPrev,
  changeCurrentImageIndex,
}: {
  uploadImages: Blob[];
  currentImageIndex: number;
  goPrev: () => void;
  changeCurrentImageIndex: (i: number) => void;
}) {
  const [isPending, setPending] = useState(false);
  const [caption, setCaption] = useState('');

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
    const formData = new FormData();
    for (const blob of uploadImages) {
      formData.append('file', blob);
    }
    const res = await fetch("api/image", {
      method: "POST",
      body: formData
    })
    const data = await res.json();
    if (data.ok) {
      console.log('success!')
    } else {
      console.log(data.ok)
    }
  };
  
  return (
    <div className="flex w-full flex-col h-full">
      <Header
        onPrev={goPrev}
        onNext={handleSubmit}
        title={"Create a new post"}
        isPending={isPending}
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
          // onChange={handleTextChange}
          // value={caption}
          placeholder="Write a caption..."
        />
      </div>
    </div>
  );
}

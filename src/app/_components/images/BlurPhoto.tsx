import Modal from "@/app/_contexts/providers/ModalContextProivder";
import { Photo } from "@/app/_types";
import Image from "next/image";
import React, { useState } from "react";
import { ModalContent, ModalTrigger } from "../../_ui/modal";

export const BlurPhoto = React.forwardRef(function BlurPhoto(
  {
    photo,
  }: {
    photo: Photo;
  },
  ref: React.Ref<HTMLDivElement>
) {
  const [loading, setLoading] = useState(true);
  return (
    <>
      <Modal>
        <ModalTrigger>
          <div ref={ref} className="group">
            <div className="relative">
              <div
                className={`aspect-w-3 aspect-h-2 w-full overflow-hidden rounded-lg group-hover:rounded-none duration-700 bg-gray-200`}
              >
                <Image
                  src={photo.src.original}
                  alt={photo.alt}
                  className={`object-cover duration-700 ease-in-out
                              ${
                                loading
                                  ? "grayscale blur-2xl scale-110"
                                  : "grayscale-0 blur-0 scale-100"
                              }`}
                  onLoad={() => {
                    setLoading(false);
                  }}
                  priority={true}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div
                className={`text-white duration-200 absolute bottom-0 h-12 w-full invisible opacity-0 group-hover:visible group-hover:opacity-100
                              flex items-center justify-center backdrop-blur-xl bg-black bg-opacity-20 `}
              >
                Created by: {photo && photo.photographer}
              </div>
            </div>
          </div>
        </ModalTrigger>
        <ModalContent>
          <div className="w-[800px] bg-background-primary">
            <img
              src={photo.src.original}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
            />
          </div>
        </ModalContent>
      </Modal>
    </>
  );
});

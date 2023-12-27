import { IconType, icons } from "@/app/_assets/Icons";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function ImageCarousel({
  dataURLs: dataURLs,
}: {
  dataURLs: string[];
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const handleClickLeft = () => {
    if (!listRef.current) return;
    listRef.current.scrollLeft -= 800;
    setCurrentImage((prev) => prev - 1);
  };
  const handleClickRight = () => {
    if (!listRef.current) return;
    listRef.current.scrollLeft += 800;
    setCurrentImage((prev) => prev + 1);
  };
  return (
    <div className="flex items-center justify-center h-full w-full relative">
      <div className="flex h-full w-full overflow-hidden scroll-smooth duration-75" ref={listRef}>
        {dataURLs.map((url, index) => (
          <div key={index} className="h-full w-full shrink-0 relative">
            <Image
              src={url}
              fill={true}
              alt="Upload Image"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {currentImage > 0 && (
        <div className="w-6 h-6 absolute left-0" onClick={handleClickLeft}>
          {icons[IconType.ArrowLeftCircle]}
        </div>
      )}
      {currentImage < dataURLs.length - 1 && (
        <div className="w-6 h-6 absolute right-0 " onClick={handleClickRight}>
          {icons[IconType.ArrowRightCircle]}
        </div>
      )}
    </div>
  );
}

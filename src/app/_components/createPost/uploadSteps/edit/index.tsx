import Carousel from "@/app/_components/images/common";
import useWorker from "@/app/_hooks/useWorker";
import { UPLOAD_IMAGE_SIZE } from "@/app/_utility/constants";
import { useCallback, useMemo, useState } from "react";
import CanvasImage from "../components/CanvasImage";
import { EditPalette } from "../components/EditPalette";
import Header from "../components/Header";
import { FilterParams, ImageInfo, Transform } from "../constants";

export default function Edit({
  imageInfoList,
  transforms,
  filters,
  blobs,
  changeFilters,
  currentImageIndex,
  changeCurrentImageIndex,
  changeUploadImages,
  goNext,
  goPrev,
}: {
  imageInfoList: ImageInfo[];
  transforms: Transform[];
  filters: FilterParams[];
  blobs: Blob[];
  currentImageIndex: number;
  changeFilters: (f: FilterParams) => void;
  changeCurrentImageIndex: (imageIndex: number) => void;
  changeUploadImages: (imageURLs: Blob[]) => void;
  goNext: () => void;
  goPrev: () => void;
}) {
  const [isPending, setPending] = useState(false);
  const worker = useWorker((e: MessageEvent<any>) => {
    changeUploadImages(e.data);
    setPending(false);
    goNext();
  });

  const onClickNext = () => {
    if (!worker) return;
    setPending(true);
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const offscreen = canvas.transferControlToOffscreen();
    const canvasData = imageInfoList.map((_, i) => {
      return { ...getCropParams(i), filter: filters[i] };
    });
    worker.postMessage({ canvas: offscreen, blobs, canvasData }, [offscreen]);
  };

  const getCropParams = useCallback(
    (imageIndex: number) => {
      const transform = transforms[imageIndex];
      const imageInfo = imageInfoList[imageIndex];
      const containerSize = Math.min(imageInfo.width, imageInfo.height);
      const marginRight =
        (imageInfo.width * transform.scale - containerSize) / 2;
      const marginBottom =
        (imageInfo.height * transform.scale - containerSize) / 2;

      const sx =
        ((marginRight - transform.translateX) /
          (imageInfo.width * transform.scale)) *
        imageInfo.natWidth;
      const sy =
        ((marginBottom - transform.translateY) /
          (imageInfo.height * transform.scale)) *
        imageInfo.natHeight;
      const sWidth =
        (containerSize / (imageInfo.width * transform.scale)) *
        imageInfo.natWidth;
      const sHeight =
        (containerSize / (imageInfo.height * transform.scale)) *
        imageInfo.natHeight;
      return {
        sx,
        sy,
        sWidth,
        sHeight,
        dx: 0,
        dy: 0,
        dWidth: UPLOAD_IMAGE_SIZE,
        dHeight: UPLOAD_IMAGE_SIZE,
        cWidth: UPLOAD_IMAGE_SIZE,
        cHeight: UPLOAD_IMAGE_SIZE,
        displaySize: containerSize,
      };
    },
    [imageInfoList, transforms]
  );

  const currentCropParams = useMemo(() => {
    return getCropParams(currentImageIndex);
  }, [currentImageIndex, getCropParams]);

  return (
    <div className="flex w-full flex-col">
      <Header
        onPrev={goPrev}
        onNext={onClickNext}
        title={"Edit"}
        isPending={isPending}
      />
      <div className="flex">
        <Carousel
          childIndex={currentImageIndex}
          updateChildIndex={changeCurrentImageIndex}
          length={imageInfoList.length}
          className="w-upload-image-width h-upload-image-width bg-white"
        >
          <CanvasImage
            cropParams={{
              ...currentCropParams,
              image: imageInfoList[currentImageIndex].image,
            }}
            filterParams={filters[currentImageIndex]}
          />
        </Carousel>
        <EditPalette
          key={currentImageIndex}
          filter={filters[currentImageIndex]}
          changeFilters={changeFilters}
        />
      </div>
    </div>
  );
}

import Carousel from "@/app/_components/images/common";
import AdjustableImage from "../components/AdjustableImage";
import UploadHeader from "../components/UploadHeader";
import { ImageInfo, Transform } from "../constants";

export default function Crop({
  currentImageIndex,
  imageInfoList,
  transforms,
  changeTransforms,
  changeCurrentImageIndex,
  goPrev,
  goNext,
}: {
  currentImageIndex: number;
  imageInfoList: ImageInfo[];
  transforms: Transform[];
  changeTransforms: (transform: Transform) => void;
  changeCurrentImageIndex: (imageIndex: number) => void;
  goPrev: () => void;
  goNext: () => void;
}) {
  return (
    <div className="flex w-full flex-col">
      <UploadHeader onPrev={goPrev} onNext={goNext} title={"Crop"} />
      <Carousel
        childIndex={currentImageIndex}
        updateChildIndex={changeCurrentImageIndex}
        length={imageInfoList.length}
        className="w-upload-image-width h-upload-image-width"
      >
        <AdjustableImage
          key={currentImageIndex}
          imageInfo={imageInfoList[currentImageIndex]}
          transform={transforms[currentImageIndex]}
          changeTransforms={changeTransforms}
        />
      </Carousel>
    </div>
  );
}

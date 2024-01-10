import { IconType } from "../../_assets/Icons";
import { TooltipWrapper } from "../overlay/TooltipWrapper";
import IconButton from "../common/buttons/IconButton";
import { useState } from "react";
import CreateImage from "../images/CreateImage";
import { Modal, ModalOpener } from "../overlay/Modal";
import { toast } from "react-toastify";
import ImageEditor from "../images/ImageEditor";

export enum Steps {
  UPLOAD,
  EDIT,
  COMMIT,
}

export default function Create() {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<Steps>(0);
  const [dataURLs, setDataURLs] = useState<string[] | null>(null);

  const addPreviewImages = (urls: string[]) => {
    setDataURLs(urls);
  };

  return (
    <>
      <TooltipWrapper title="Create">
        <ModalOpener onClick={() => setShowModal(true)}>
          <IconButton icon={IconType.CreateIcon} />
        </ModalOpener>
      </TooltipWrapper>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="overflow-hidden rounded-md">
            {currentStep === 0 && (
              <CreateImage
                addPrevewImages={addPreviewImages}
                next={() => setCurrentStep((prev) => prev + 1)}
              />
            )}
            {currentStep === 1 && (
              <ImageEditor
                dataURLs={dataURLs}
                prev={() => setCurrentStep((prev) => prev - 1)}
              />
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

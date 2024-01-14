import { IconType } from "../../_assets/Icons";
import { TooltipWrapper } from "../overlay/TooltipWrapper";
import IconButton from "../common/buttons/IconButton";
import { useState } from "react";
import CreateImage from "../images/CreateImage";
import { Modal, ModalOpener } from "../overlay/Modal";

export enum Steps {
  UPLOAD,
  EDIT,
  COMMIT,
}

export default function Create() {
  const [showModal, setShowModal] = useState(false);

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
            <CreateImage />
          </div>
        </Modal>
      )}
    </>
  );
}

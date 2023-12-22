import { IconType } from "../../assets/Icons";
import { TooltipWrapper } from "../overlay/TooltipWrapper";
import IconButton from "../common/buttons/IconButton";
import { useState } from "react";
import CreateImage from "../images/CreateImage";
import { Modal, ModalOpener } from "../overlay/Modal";

export default function Create() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <TooltipWrapper title="Create">
        <ModalOpener onClick={() => setShowModal(true)}>
          <IconButton icon={IconType.CreateIcon} />
        </ModalOpener>
      </TooltipWrapper>
      { showModal && <Modal onClose={() => setShowModal(false)}>
        <CreateImage />
      </Modal>}
    </>
  )
}
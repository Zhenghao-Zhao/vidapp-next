import { IconType } from "../../_assets/Icons";
import { TooltipWrapper } from "../overlay/TooltipWrapper";
import IconButton from "../common/buttons/IconButton";
import { useState } from "react";
import { Modal, ModalOpener } from "../overlay/Modal";
import CreatePost from "../createPost";

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
            <CreatePost />
          </div>
        </Modal>
      )}
    </>
  );
}

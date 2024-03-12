import { IconType } from "../../../../../../_assets/Icons";
import { Tooltip } from "../../../../../tooltip";
import IconButton from "../../../../../common/buttons/IconButton";
import { useState } from "react";
import { Modal, ModalOpener } from "../../../../../modal";
import CreatePost from "../../../../../createPost";

export default function Create() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Tooltip title="Create">
        <ModalOpener onClick={() => setShowModal(true)}>
          <IconButton icon={IconType.CreateIcon} />
        </ModalOpener>
      </Tooltip>
      {showModal && (
        <Modal onClose={() => setShowModal(false)} animation="fade-in">
          <div className="overflow-hidden rounded-md">
            <CreatePost />
          </div>
        </Modal>
      )}
    </>
  );
}

import { useState } from "react";
import { IconType } from "../../../../../../_assets/Icons";
import IconButton from "../../../../../common/buttons/IconButton";
import CreatePost from "../../../../../createPost";
import { Modal, ModalOpener } from "../../../../../modal";
import { Tooltip } from "../../../../../tooltip";

export default function Create() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Tooltip title="Create">
        <ModalOpener onClick={() => setShowModal(true)}>
          <IconButton icon={IconType.Create} />
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

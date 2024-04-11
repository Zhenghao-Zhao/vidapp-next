import { useState } from "react";
import { IconType } from "../../../../../../_assets/Icons";
import IconButton from "../../../../../common/buttons/IconButton";
import CreatePost from "../../../../../createPost";
import { Modal, ModalOpener } from "../../../../../modal";

export default function Create() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ModalOpener onClick={() => setShowModal(true)}>
        <IconButton icon={IconType.Create} tip="Create" />
      </ModalOpener>
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

import Spinner, { SpinnerSize } from "@/app/_components/loaders";
import { Suspense, lazy, useState } from "react";
import { IconType } from "../../../../../_assets/Icons";
import IconButton from "../../../../common/buttons/IconButton";
import { ModalContent, ModalTrigger } from "../../../../modal";
import Modal from "@/app/_contexts/providers/ModalContextProivder";
const CreatePost = lazy(() => import("../../../../createPost"));

export default function Create() {
  return (
    <>
      <Modal>
        <ModalTrigger>
          <IconButton icon={IconType.Create} tip="Create" />
        </ModalTrigger>
        <ModalContent animation="fade-in">
          <div className="overflow-hidden rounded-md bg-white min-w-upload-image-width min-h-upload-height flex items-center justify-center">
            <Suspense fallback={<Spinner size={SpinnerSize.MEDIUM} />}>
              <CreatePost />
            </Suspense>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

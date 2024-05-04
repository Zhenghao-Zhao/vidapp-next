import { DiscardAlert } from "@/app/_components/alerts";
import Modal from "@/app/_contexts/providers/ModalContextProivder";
import Spinner, { SpinnerSize } from "@/app/_ui/loaders";
import { Suspense, lazy } from "react";
import { IconType } from "../../../../_assets/Icons";
import IconButton from "../../../../_ui/buttons/iconButton";
import { ModalContent, ModalTrigger } from "../../../../_ui/modal";
const CreatePost = lazy(() => import("../../../../_components/createPost"));

export default function Create() {
  return (
    <Modal defaultOpenAlert={false} alert={<DiscardAlert />}>
      <ModalTrigger>
        <IconButton icon={IconType.Create} tip="Create" className="p-2" />
      </ModalTrigger>
      <ModalContent animation="fade-in">
        <div className="overflow-hidden rounded-md min-w-upload-image-width min-h-upload-height flex items-center justify-center">
          <Suspense fallback={<Spinner size={SpinnerSize.MEDIUM} />}>
            <CreatePost />
          </Suspense>
        </div>
      </ModalContent>
    </Modal>
  );
}

import Modal from "@/app/_contexts/providers/ModalContextProivder";
import { IconType } from "@/app/_icons";
import { DiscardAlert } from "@/app/_ui/alert/alerts";
import IconButton from "@/app/_ui/buttons/iconButton";
import Spinner, { SpinnerSize } from "@/app/_ui/loaders";
import { ModalTrigger, ModalContent } from "@/app/_ui/modal";
import { lazy, Suspense } from "react";
const CreatePost = lazy(() => import("@/app/posts/create"));

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

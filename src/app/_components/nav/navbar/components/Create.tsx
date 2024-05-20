import { DiscardAlert } from "@/app/_components/ui/alert/alerts";
import IconButton from "@/app/_components/ui/buttons/iconButton";
import { IconType } from "@/app/_components/ui/icons";
import Spinner, { SpinnerSize } from "@/app/_components/ui/loaders";
import { ModalContent, ModalTrigger } from "@/app/_components/ui/modal";
import Modal from "@/app/_libs/contexts/providers/ModalContextProivder";
import { Suspense, lazy } from "react";
const CreatePost = lazy(() => import("@/app/_components/posts/createPost"));

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

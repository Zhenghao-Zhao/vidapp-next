import { IconType } from "@/app/_assets/Icons";
import Modal, {
  useModalContext,
} from "@/app/_contexts/providers/ModalContextProivder";
import { useOverlayContext } from "@/app/_contexts/providers/OverlayContextProvider";
import React from "react";
import { createPortal } from "react-dom";
import Icon from "../icon";

type Props = {
  children: React.ReactNode;
  animation?: string | undefined;
  initShowAlert?: boolean;
};

export function ModalContent({ children, animation }: Props) {
  const { setShowOverlay } = useOverlayContext();
  const { show, setShow, showAlert, alert } = useModalContext();

  const handleBackdropClick = () => {
    if (alert === undefined || !showAlert) {
      setShow(false);
      setShowOverlay(false);
    }
  };

  function ModalBackdrop({ handleClick }: { handleClick: () => void }) {
    return (
      <div className="w-full h-full bg-backdrop" onClick={handleClick} role="backdrop">
        <div className="absolute top-view-close-top right-view-close-right bg-modal-primary rounded-full p-2 cursor-pointer group">
          <div className="group-hover:scale-125 transition-all">
            <Icon icon={IconType.Cross} />
          </div>
        </div>
      </div>
    );
  }
  
  if (!show) return null;

  return createPortal(
    <div className="fixed flex justify-center items-center inset-0 z-50">
      {alert === undefined || !showAlert ? (
        <ModalBackdrop handleClick={handleBackdropClick} />
      ) : (
        <Modal>
          <ModalTrigger className="w-full h-full relative">
            <ModalBackdrop handleClick={handleBackdropClick} />
          </ModalTrigger>
          <ModalContent>
            {React.cloneElement(alert, { onConfirm: () => setShow(false) })}
          </ModalContent>
        </Modal>
      )}
      <div
        className="absolute rounded-md bg-modal-primary text-text-primary"
        style={{ animation: animation && `${animation} 200ms ease-out` }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modalPortal")!
  );
}

export function ModalTrigger({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { setShowOverlay, setScrollTop } = useOverlayContext();
  const { setShow } = useModalContext();
  const handleClick = () => {
    setScrollTop(document.documentElement.scrollTop);
    setShow(true);
    setShowOverlay(true);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}

type BackdropProps = {
  show: boolean;
  onClose: () => void;
};

export function Backdrop({ show, onClose }: BackdropProps) {
  const { setShowOverlay } = useOverlayContext();
  const handleClick = () => {
    onClose();
    setShowOverlay(false);
  };
  return (
    <div
      className={`${show ? "fixed" : "hidden"} inset-0 bg-backdrop z-30`}
      onClick={handleClick}
    />
  );
}

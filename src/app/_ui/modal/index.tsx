import Alert from "@/app/_contexts/providers/AlertContextProvider";
import { useModalContext } from "@/app/_contexts/providers/ModalContextProivder";
import { useOverlayContext } from "@/app/_contexts/providers/ScrollContextProvider";
import { IconType } from "@/app/_icons";
import React from "react";
import { createPortal } from "react-dom";
import { AlertContent, AlertTrigger } from "../alert";
import Icon from "../icon";

type Props = {
  children: React.ReactNode;
  animation?: string | undefined;
  initShowAlert?: boolean;
};

export function ModalContent({ children, animation="fade-in-scale" }: Props) {
  const { open: show, openModal: showModal, alert, openAlert: showAlert } = useModalContext();

  const handleBackdropClick = () => {
    if (alert !== undefined && showAlert) return;
    showModal(false);
  };

  function ModalBackdrop({ handleClick }: { handleClick: () => void }) {
    return (
      <div
        className="w-screen min-h-screen bg-backdrop"
        onClick={handleClick}
        role="backdrop"
      >
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
      {alert !== undefined && showAlert ? (
        <Alert>
          <AlertTrigger>
            <ModalBackdrop handleClick={handleBackdropClick} />
          </AlertTrigger>
          <AlertContent>
            {React.cloneElement(alert, { onConfirm: () => showModal(false) })}
          </AlertContent>
        </Alert>
      ) : (
        <ModalBackdrop handleClick={handleBackdropClick} />
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
  const { openModal: showModal } = useModalContext();
  const handleClick = () => {
    showModal(true);
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
  const { setShowScroll } = useOverlayContext();
  const handleClick = () => {
    onClose();
    setShowScroll(false);
  };
  return (
    <div
      className={`${show ? "fixed" : "hidden"} inset-0 bg-backdrop z-30`}
      onClick={handleClick}
    />
  );
}

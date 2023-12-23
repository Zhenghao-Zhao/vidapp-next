import { useOverlayContext } from "@/app/contexts/OverlayContextProvider";
import { useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export function Modal({ children, onClose }: Props) {
  const { setShowOverlayBackground } = useOverlayContext();
  const handleBackdropClick = () => {
    onClose();
    setShowOverlayBackground(false);
  };

  return createPortal(
    <div className="fixed flex justify-center items-center inset-0 z-50">
      <div className="absolute bg-white rounded-md max-w-[80%]">{children}</div>
      <div
        className="w-full h-full bg-backdrop"
        onClick={handleBackdropClick}
      />
    </div>,
    document.getElementById("modalPortal")!
  );
}

export function ModalOpener({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const { setShowOverlayBackground, setScrollTop } = useOverlayContext();
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = (e: React.MouseEvent) => {
    if (e.target === ref.current) return;
    setScrollTop(document.documentElement.scrollTop);
    onClick();
    setShowOverlayBackground(true);
  };
  return (
    <div onClick={handleClick} ref={ref}>
      {children}
    </div>
  );
}

type BackdropProps = {
  show: boolean;
  onClose: () => void;
};

export function Backdrop({ show, onClose }: BackdropProps) {
  const { setShowOverlayBackground } = useOverlayContext();
  const handleClick = () => {
    onClose();
    setShowOverlayBackground(false);
  };
  return (
    <div
      className={`${show ? "fixed" : "hidden"} inset-0 bg-backdrop z-30`}
      onClick={handleClick}
    />
  );
}

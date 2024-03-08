import { useOverlayContext } from "@/app/_contexts/OverlayContextProvider";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "../common";
import { IconType } from "@/app/_assets/Icons";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  animation?: string | undefined;
};

export function Modal({ children, onClose, animation }: Props) {
  const { setShowOverlayBackground } = useOverlayContext();
  const handleBackdropClick = () => {
    onClose();
    setShowOverlayBackground(false);
  };

  return createPortal(
    <div className="fixed flex justify-center items-center inset-0 z-50">
      <div
        className="w-full h-full bg-backdrop relative"
        onClick={handleBackdropClick}
      >
        <div
          className="absolute top-view-close-top right-view-close-right bg-white rounded-full p-2 cursor-pointer group"
        >
          <div className="group-hover:scale-125 transition-all">
            <Icon icon={IconType.Cross} />
          </div>
        </div>
      </div>
      <div
        className="absolute rounded-md"
        style={{ animation: animation && `${animation} 200ms ease-out` }}
      >
        {children}
      </div>
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

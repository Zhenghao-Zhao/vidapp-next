import { useOverlayContext } from "@/app/contexts/OverlayContextProvider";
import { useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({children, onClose}: Props) {
  const {show, setShow} = useOverlayContext();

  const handleClick = () => {
    setShow(false);
    onClose();
  }

  if (!show) return;

  return createPortal(
    <div className="fixed flex justify-center items-center inset-0 z-50">
      <div className="absolute w-[450px] bg-white rounded-md p-4">{children}</div>
      <div className="w-full h-full bg-backdrop" onClick={handleClick} />
    </div>
    , document.getElementById('modalPortal')!
  )
}

export function ModalOpener({children}: {children: React.ReactNode;}) {
  const {setShow, setScrollTop} = useOverlayContext();
  const ref = useRef<HTMLDivElement>(null);
  const handleClick = (e: React.MouseEvent) => {
    if (e.target === ref.current) return;
    setShow(true);
    setScrollTop(document.documentElement.scrollTop);
  }
  return (
    <div onClick={handleClick} ref={ref}>
      {children}
    </div>
  )
}

type BackdropProps = {
  onClose: () => void;
}

export function Backdrop({onClose}: BackdropProps) {
  const {show, setShow} = useOverlayContext();
  const handleClick = () => {
    onClose();
    setShow(false);
  }
  return (
    <div className={`${show? "fixed" : "hidden"} inset-0 bg-backdrop z-30`} onClick={handleClick}/>
  )
}
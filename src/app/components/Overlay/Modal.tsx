import { useOverlayContext } from "@/app/contexts/OverlayContextProvider";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({children, onClose}: Props) {
  const {setShow} = useOverlayContext();

  const handleClick = () => {
    setShow(false);
    onClose();
  }

  return createPortal(
    <div className="fixed flex justify-center items-center inset-0 z-[1000]">
      <div className="absolute w-[450px]">{children}</div>
      <div className="w-full h-full bg-backdrop" onClick={handleClick} />
    </div>
    , document.getElementById('modalPortal')!
  )
}

export function ModalOpener({children}: {children: React.ReactNode;}) {
  const {setShow, setScrollTop} = useOverlayContext();

  const handleClick = () => {
    setShow(true);
    setScrollTop(document.documentElement.scrollTop);
  }

  return (
    <div onClick={handleClick}>
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
    <div className={`${show? "fixed" : "hidden"} inset-0 bg-backdrop z-[100]`} onClick={handleClick}/>
  )
}
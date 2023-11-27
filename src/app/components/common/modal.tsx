import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({children, onClose}: Props) {
  return createPortal(
    <div className="fixed flex justify-center items-center inset-0 z-[1000]">
      <div className="absolute w-[450px]">{children}</div>
      <div className="w-full h-full bg-backdrop" onClick={onClose} />
    </div>
    , document.getElementById('modalPortal')!
  )
}
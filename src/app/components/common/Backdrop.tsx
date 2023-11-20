'use client'

type Props = {
  show: boolean;
  onClose: () => void;
}

export default function Backdrop({ show, onClose }: Props) {
  return (
    <div className={`${show? "fixed" : "hidden"} inset-0 bg-backdrop z-[100]`} onClick={onClose}/>
  )
}
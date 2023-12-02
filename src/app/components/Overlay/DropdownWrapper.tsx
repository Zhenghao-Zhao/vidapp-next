'use client'

import { RefObject, useEffect, useRef } from "react";
import useOverlayPosition from "@/app/hooks/useOverlayPosition";

type Props = {
  node: RefObject<HTMLElement>;
  show: boolean;
  children: React.ReactNode;
}

export default function DropdownWrapper({ node: nodeRef, show, children }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { position, setOverlayPosition } = useOverlayPosition(nodeRef, dropdownRef);

  useEffect(() => {
    setOverlayPosition();
  }, [show])

  let style = {
    left: position.left + 'px',
    top: position.top + 'px',
  };

  return (
    <div style={style} ref={dropdownRef} className={`fixed ${!show && 'opacity-0 invisible'} transition-opacity shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}>
      { children }
    </div>
  )
}
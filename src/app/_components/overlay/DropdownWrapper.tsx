"use client";

import { RefObject, useEffect, useRef } from "react";
import useOverlayPosition from "@/app/_hooks/useOverlayPosition";

type Props = {
  openerRef: RefObject<HTMLElement>;
  children: React.ReactNode;
};

export default function DropdownWrapper({ openerRef, children }: Props) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { position, setOverlayPosition } = useOverlayPosition(
    openerRef,
    dropdownRef
  );

  useEffect(() => {
    window.addEventListener("resize", setOverlayPosition);
    return () => window.removeEventListener("resize", setOverlayPosition);
  }, []);

  let style = {
    left: position.left + "px",
    top: position.top + "px",
  };

  return (
    <div
      style={style}
      ref={dropdownRef}
      className={`fixed shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] [1000]`}
    >
      {children}
    </div>
  );
}

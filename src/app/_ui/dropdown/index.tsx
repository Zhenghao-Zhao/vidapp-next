"use client";

import { useDropdownContext } from "@/app/_contexts/providers/DropdownContextProvider";
import { DropdownPosition } from "@/app/_types";
import { getOverlayPosition } from "@/app/_utils";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export function DropdownContent({ children }: Props) {
  const [position, setPosition] = useState<DropdownPosition>({
    left: 0,
    top: 0,
  });
  const { show, contentRef, triggerRef } = useDropdownContext();

  useEffect(() => {
    function resetDropdownPos() {
      getOverlayPosition(triggerRef, contentRef, setPosition);
    }
    window.addEventListener("resize", resetDropdownPos);
    return () => window.removeEventListener("resize", resetDropdownPos);
  }, []);

  useEffect(() => {
    if (!show || !triggerRef.current || !contentRef.current) return;
    getOverlayPosition(triggerRef, contentRef, setPosition);
  }, [show, triggerRef, contentRef]);

  let style = {
    left: position.left + "px",
    top: position.top + "px",
  };

  if (!show) return null;

  return (
    <div
      style={style}
      ref={contentRef}
      className="fixed shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-modal-primary rounded-lg"
    >
      {children}
    </div>
  );
}

export function DropdownTrigger({ children }: { children: ReactNode }) {
  const { show, setShow, triggerRef } = useDropdownContext();
  return (
    <div onClick={() => setShow(!show)} ref={triggerRef}>
      {children}
    </div>
  );
}

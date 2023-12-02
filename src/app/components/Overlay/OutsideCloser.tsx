import React, { useRef, useEffect, RefObject } from "react";

function useOutsideCloser(callback: () => void, ref: RefObject<HTMLElement>) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

type Props = {
  onClose: () => void;
  children: React.ReactNode;
}

export default function OutsideCloser({ onClose, children }: Props) {
  const wrapperRef = useRef(null);
  useOutsideCloser(onClose, wrapperRef);

  return <div ref={wrapperRef}>{children}</div>;
}
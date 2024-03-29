import React, { useEffect, useRef } from "react";

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function OutsideCloser({ onClose, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}

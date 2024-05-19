import { OutsideCloser } from "@/app/_components/_common";
import React, {
  RefObject,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

type DropdownContextType = {
  show: boolean;
  setShow: (b: boolean) => void;
  triggerRef: RefObject<HTMLDivElement>;
  contentRef: RefObject<HTMLDivElement>;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export function useDropdownContext() {
  const value = useContext(DropdownContext);
  if (value == null) throw Error("Cannot use outside of Provider");

  return value;
}

export default function Dropdown({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <DropdownContext.Provider
      value={{
        show,
        setShow,
        triggerRef,
        contentRef,
      }}
    >
      <OutsideCloser onClose={() => setShow(false)}>{children}</OutsideCloser>
    </DropdownContext.Provider>
  );
}

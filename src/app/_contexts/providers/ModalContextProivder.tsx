import React, { createContext, useContext, useState } from "react";
import { useOverlayContext } from "./ScrollContextProvider";

type ModalContextType = {
  open: boolean;
  setOpen: (b: boolean) => void;
  openAlert: boolean;
  setOpenAlert: (b: boolean) => void;
  alert: React.ReactElement<{ onConfirm?: () => void }> | undefined;
  openModal: (b: boolean) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function useModalContext() {
  const value = useContext(ModalContext);
  if (value == null) throw Error("Cannot use outside of Modal Provider");

  return value;
}

export default function Modal({
  alert,
  defaultOpenAlert = true,
  children,
}: {
  alert?: React.ReactElement<{ onConfirm?: () => void }>;
  defaultOpenAlert?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(defaultOpenAlert);
  const { setShowScroll } = useOverlayContext();

  const openModal = (b: boolean) => {
    setOpen(b);
    setShowScroll(b); 
  }

  return (
    <ModalContext.Provider
      value={{ open, setOpen, openAlert, setOpenAlert, alert, openModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

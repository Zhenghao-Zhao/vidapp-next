import React, { createContext, useContext, useEffect, useState } from "react";
import { useOverlayContext } from "./ScrollContextProvider";
import { useRouter } from "next/navigation";

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
  defaultOpen = false,
  rollback = false,
  children,
}: {
  alert?: React.ReactElement<{ onConfirm?: () => void }>;
  defaultOpenAlert?: boolean;
  defaultOpen?: boolean;
  rollback?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [openAlert, setOpenAlert] = useState(defaultOpenAlert);
  const { setShowScroll } = useOverlayContext();
  const router = useRouter();

  const openModal = (b: boolean) => {
    setOpen(b);
    setShowScroll(b);
    if (!b && rollback) {
      router.back();
    }
  }

  return (
    <ModalContext.Provider
      value={{ open, setOpen, openAlert, setOpenAlert, alert, openModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

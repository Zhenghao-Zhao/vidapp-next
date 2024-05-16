import { useRouter } from "next/navigation";
import React, { createContext, useContext, useLayoutEffect, useState } from "react";
import { useScrollContext } from "./ScrollContextProvider";

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
  if (value == null) throw Error("Cannot use outside of Provider");

  return value;
}

export default function Modal({
  alert,
  defaultOpenAlert = true,
  defaultOpen = false,
  rollbackURL,
  children,
}: {
  alert?: React.ReactElement<{ onConfirm?: () => void }>;
  defaultOpenAlert?: boolean;
  defaultOpen?: boolean;
  rollbackURL?: string,
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [openAlert, setOpenAlert] = useState(defaultOpenAlert);
  const { setShowScroll } = useScrollContext();
  const router = useRouter();

  useLayoutEffect(() => {
    setShowScroll(false);
    return () => setShowScroll(true);
  }, [])

  const openModal = (b: boolean) => {
    setOpen(b);
    setShowScroll(!b);
    if (!b && rollbackURL) {
      if (window.location.href !== rollbackURL){
        router.back();
      } else {
        history.go(-2)
      }
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

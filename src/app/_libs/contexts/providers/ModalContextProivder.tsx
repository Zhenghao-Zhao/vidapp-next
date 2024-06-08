import { useRouter } from "next/navigation";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useScrollContext } from "./ScrollContextProvider";

type ModalContextType = {
  open: boolean;
  setOpen: (b: boolean) => void;
  openAlert: boolean;
  setOpenAlert: (b: boolean) => void;
  alert: React.ReactElement<{ onConfirm?: () => void }> | undefined;
  toggleModal: (b: boolean) => void;
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
  isRouted = false,
  children,
}: PropsWithChildren<{
  alert?: React.ReactElement<{ onConfirm?: () => void }>;
  defaultOpenAlert?: boolean;
  isRouted?: boolean;
}>) {
  const [open, setOpen] = useState(isRouted);
  const [openAlert, setOpenAlert] = useState(defaultOpenAlert);
  const { setShowScroll } = useScrollContext();
  const router = useRouter();

  // if modal is routed and thus default set to open, remove scrollbar
  useLayoutEffect(() => {
    if (isRouted) {
      setShowScroll(false);
    }
  }, [setShowScroll, isRouted]);

  // add scrollbar back when exiting
  // todo: fix overlay guidebar
  useEffect(() => {
    return () => setShowScroll(true);
  }, []);

  const toggleModal = (open: boolean) => {
    setOpen(open);
    setShowScroll(!open);

    if (!open && isRouted) {
      router.back();
    }
  };

  return (
    <ModalContext.Provider
      value={{ open, setOpen, openAlert, setOpenAlert, alert, toggleModal }}
    >
      {children}
    </ModalContext.Provider>
  );
}

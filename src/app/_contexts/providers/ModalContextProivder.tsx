import React, { createContext, useContext, useState } from "react";

type ModalContextType = {
  show: boolean;
  setShow: (b: boolean) => void;
  showAlert: boolean;
  setShowAlert: (b: boolean) => void;
  alert: React.ReactElement<{ onConfirm?: () => void }> | undefined;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function useModalContext() {
  const value = useContext(ModalContext);
  if (value == null) throw Error("Cannot use outside of Modal Provider");

  return value;
}

export default function Modal({
  initShowAlert = true,
  alert,
  children,
}: {
  initShowAlert?: boolean;
  alert?: React.ReactElement<{ onConfirm?: () => void }>;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(initShowAlert);

  return (
    <ModalContext.Provider
      value={{ show, setShow, showAlert, setShowAlert, alert }}
    >
      {children}
    </ModalContext.Provider>
  );
}

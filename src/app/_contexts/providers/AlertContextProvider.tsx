import React, { createContext, useContext, useState } from "react";

type AlertContextType = {
  open: boolean;
  setOpen: (b: boolean) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export function useAlertContext() {
  const value = useContext(AlertContext);
  if (value == null) throw Error("Cannot use outside of Alert Provider");

  return value;
}

export default function Alert({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <AlertContext.Provider
      value={{ open, setOpen }}
    >
      {children}
    </AlertContext.Provider>
  );
}

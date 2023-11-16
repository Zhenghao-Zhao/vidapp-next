'use client'
import { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
}

export type Position = {
  x: number;
  y: number;
}

interface BaseTooltipContextType {
  show: boolean;
  setShow: (b: boolean) => void;
  position: Position | null;
  setPosition: (p: Position) => void;
  content: string;
  setContent: (s: string) => void;
}


const TooltipContext = createContext<BaseTooltipContextType | null>(null);

export function useStaticContext() {
  const value = useContext(TooltipContext);
  if (value == null) throw Error("Cannot use outside of Tooltip Provider");

  return value;
}

export function TooltipContextProvider({ children }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const [position, setPosition] = useState<Position | null>(null); 
  const [content, setContent] = useState<string>("");

  const values = {
    show, 
    setShow, 
    position, 
    setPosition, 
    content, 
    setContent
  }

  return (
    <TooltipContext.Provider value={values}>
      { children }
    </TooltipContext.Provider>
  )
}
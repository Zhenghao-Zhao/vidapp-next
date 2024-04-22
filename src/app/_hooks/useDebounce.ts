import { useEffect, useState } from "react";

const MIN_TIMEOUT = 200;

export default function useDebounce(func: () => void, val: any, timeout=MIN_TIMEOUT) {
  const [timer, setTimer] = useState<number | undefined>();
  
  useEffect(() => {
    setTimer(debounce());
    return () => clearTimeout(timer);
  }, [val])
  
  const debounce = () => {
    clearTimeout(timer);
    return window.setTimeout(() => {
      func();
    }, timeout)
  }

  return null;
}


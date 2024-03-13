import React, { useEffect, useState } from "react";

export default function useWorker(
  onMessage: (e: MessageEvent<any>) => void,
  path: string,
) {
  const [worker, setWorker] = useState<Worker | null>(null);

  useEffect(() => {
    const myWorker = new Worker(
      new URL(path, import.meta.url)
    );
    setWorker(myWorker);
    myWorker.onmessage = onMessage;
    return () => {
      myWorker.terminate();
    };
  }, [onMessage]);

  return worker;
}

import React, { useEffect } from "react";
import { useLoaderContext } from "../_contexts/LoaderContextProvider";

export default function usePageLoader() {
  const { setShowLoader: setShow } = useLoaderContext();
  useEffect(() => {
    setShow(false);
  }, [setShow]);
}

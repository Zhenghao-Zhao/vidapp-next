import { useEffect } from "react";
import { useLoaderContext } from "../_contexts/providers/LoaderContextProvider";

export default function usePageLoader() {
  const { setShowLoader: setShow } = useLoaderContext();
  useEffect(() => {
    setShow(false);
  }, [setShow]);
}

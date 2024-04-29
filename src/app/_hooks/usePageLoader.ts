import { useEffect } from "react";
import { useLoaderContext } from "../_contexts/providers/LoaderContextProvider";
import { useGuidebarContext } from "../_contexts/providers/GuidebarContextProvider";

export default function usePageLoader() {
  const { setShowLoader: setShow } = useLoaderContext();
  const { setShowOverlayGuide } = useGuidebarContext();

  useEffect(() => {
    setShowOverlayGuide(false);
  }, []);

  useEffect(() => {
    setShow(false);
  }, [setShow]);
}

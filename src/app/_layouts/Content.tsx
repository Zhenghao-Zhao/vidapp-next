"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useLayoutEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GuideBar,
  GuideTypes,
  MiniGuide,
  OverlayGuide,
} from "../_components/guide";
import { Beam } from "../_components/loaders";
import PageHeader from "../_components/navbar";
import { useGuidebarContext } from "../_contexts/providers/GuidebarContextProvider";
import { useLoaderContext } from "../_contexts/providers/LoaderContextProvider";
import { useOverlayContext } from "../_contexts/providers/OverlayContextProvider";

interface Props {
  children: React.ReactNode;
}

export default function Content({ children }: Props) {
  const { overlayIsShown, scrollTop } = useOverlayContext();
  const { guideLayout } = useGuidebarContext();
  const { show } = useLoaderContext();
  const dateRef = useRef(new Date());
  useLayoutEffect(() => {
    if (!overlayIsShown) {
      document.documentElement.scrollTop = scrollTop;
    }
  }, [overlayIsShown, scrollTop]);

  const style: React.CSSProperties = {
    position: "fixed",
    width: "100%",
    height: "100%",
    left: 0,
    top: -scrollTop,
  };

  return (
    <>
      <div style={overlayIsShown ? style : { position: "relative" }}>
        {show && <Beam />}
        <PageHeader />
        <MiniGuide />
        <GuideBar />
        <OverlayGuide />
        <section
          className={`mt-14 smGb:max-lgGb:ml-guide-small ${
            guideLayout === GuideTypes.Regular
              ? "lgGb:ml-guide-normal"
              : "lgGb:ml-guide-small"
          } px-6`}
        >
          <div className="p-2 min-h-main-min-height flex flex-col">
            <div className="grow flex">{children}</div>
            <footer className="flex items-center justify-center w-full h-footer-height border-t">
              © {dateRef.current.getFullYear()} BlueApp from ZhenghaoZhao
            </footer>
          </div>
        </section>
      </div>

      <div id="modalPortal" />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

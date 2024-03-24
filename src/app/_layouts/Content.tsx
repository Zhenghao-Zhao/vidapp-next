"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { memo, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GuideBar,
  GuideTypes,
  MiniGuide,
  OverlayGuide,
} from "../_components/guide";
import PageHeader from "../_components/navbar";
import { useGuidebarContext } from "../_contexts/GuidebarContextProvider";
import { useOverlayContext } from "../_contexts/OverlayContextProvider";

interface Props {
  children: React.ReactNode;
}

export default memo(function Content({ children }: Props) {
  const { overlayIsShown, scrollTop } = useOverlayContext();
  const { guideLayout } = useGuidebarContext();
  const dateRef = useRef(new Date());

  useEffect(() => {
    if (!overlayIsShown) {
      document.documentElement.scrollTop = scrollTop;
    }
  }, [overlayIsShown, scrollTop]);

  const style: React.CSSProperties = {
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
    top: -scrollTop,
  };
  return (
    <html lang="en" className="font-roboto">
      <body style={overlayIsShown ? style : {}}>
        <div
          className={`absolute inset-0 ${
            overlayIsShown && "overflow-y-hidden"
          }`}
        >
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
                © {dateRef.current.getFullYear()} VidApp from ZhenghaoZhao
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
      </body>
    </html>
  );
});

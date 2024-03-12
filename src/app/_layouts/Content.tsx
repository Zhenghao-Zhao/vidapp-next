"use client";
import PageHeader from "../_components/header";
import { memo, useEffect, useRef } from "react";
import { useOverlayContext } from "../_contexts/OverlayContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MiniGuide,
  GuideBar,
  OverlayGuide,
  GuideTypes,
} from "../_components/guide";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useGuidebarContext } from "../_contexts/GuidebarContextProvider";

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
            <div className="p-2">
              {children}
              <footer className="flex items-center justify-center w-full h-[80px] border-t">
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

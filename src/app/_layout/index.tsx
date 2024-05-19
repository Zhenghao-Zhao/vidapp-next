"use client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GuideBar, GuideTypes, MiniGuide, OverlayGuide } from "../_components/_nav/guide";
import PageHeader from "../_components/_nav/navbar";
import { useGuidebarContext } from "../_libs/_contexts/providers/GuidebarContextProvider";
import { useScrollContext } from "../_libs/_contexts/providers/ScrollContextProvider";

interface Props {
  children: React.ReactNode;
}

export default function ContentLayout({ children }: Props) {
  const { showScroll } = useScrollContext();
  const { guideLayout, setShowOverlayGuide, showOverlayGuide } =
    useGuidebarContext();
  const dateRef = useRef(new Date());
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!showScroll) {
      document.documentElement.classList.add("withoutScroll");
    } else {
      document.documentElement.classList.remove("withoutScroll");
    }
  }, [showScroll]);

  // clear overlay guide when move to a new
  useLayoutEffect(() => {
    if (showOverlayGuide) setShowOverlayGuide(false);
  }, [pathname]);

  return (
    <>
      <div className="relative">
        <PageHeader />
        <MiniGuide />
        <GuideBar />
        <OverlayGuide />
        <section
          className={`mt-6 smGb:max-lgGb:ml-guide-small ${
            guideLayout === GuideTypes.Regular
              ? "lgGb:ml-guide-normal"
              : "lgGb:ml-guide-small"
          } px-6`}
        >
          <div className="p-2 min-h-main-minHeight flex flex-col">
            <div className="grow flex justify-center">{children}</div>
            <footer className="flex items-center justify-center w-full h-footer-height border-t">
              © {dateRef.current.getFullYear()} BlueApp from ZhenghaoZhao
            </footer>
          </div>
        </section>
      </div>
      <div id="modalPortal"></div>
      <div id="alertPortal" />
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

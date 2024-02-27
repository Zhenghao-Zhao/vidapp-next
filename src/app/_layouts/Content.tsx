"use client";
import PageHeader from "../_components/header/Header";
import { memo, useEffect } from "react";
import { useOverlayContext } from "../_contexts/OverlayContextProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MiniGuide, GuideBar, OverlayGuide } from "../_components/guide";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface Props {
  children: React.ReactNode;
}
const queryClient = new QueryClient();

export default memo(function Content({ children }: Props) {
  const { showOverlayBackground, scrollTop } = useOverlayContext();

  useEffect(() => {
    if (!showOverlayBackground) {
      document.documentElement.scrollTop = scrollTop;
    }
  }, [showOverlayBackground, scrollTop]);

  const style: React.CSSProperties = {
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
    top: -scrollTop,
  };
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" className="font-roboto">
        <body style={showOverlayBackground ? style : {}}>
          <div
            className={`absolute inset-0 ${
              showOverlayBackground && "overflow-y-hidden"
            }`}
          >
            <PageHeader />
            <MiniGuide />
            <GuideBar />
            <OverlayGuide />
            {children}
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
    </QueryClientProvider>
  );
});

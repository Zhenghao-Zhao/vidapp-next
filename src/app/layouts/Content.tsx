'use client'
import GuideBar from "../components/guide/GuideBar";
import MiniGuide from "../components/guide/MiniGuide";
import OverlayGuide from "../components/guide/OverlayGuide";
import PageHeader from "./Header";
import { memo, useEffect } from "react";
import { useOverlayContext } from "../contexts/OverlayContextProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  children: React.ReactNode
}

export default memo(function Content({ children }: Props) {
  const { show, scrollTop } = useOverlayContext();

  useEffect(() => {
    if (!show) {
      document.documentElement.scrollTop = scrollTop;
    }
  }, [show, scrollTop])

  const style: React.CSSProperties = {
    position: "fixed",
    left: 0,
    bottom: 0,
    right: 0,
    top: -scrollTop,
  }

  return (
    <html lang="en" className='font-roboto'>
      <body style={show? style:{}}>
        <div className={`absolute inset-0 ${show && 'overflow-y-hidden'}`} >
          <PageHeader />
          <MiniGuide />
          <GuideBar />
          <OverlayGuide />
          { children }       
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
      </body>
    </html>
  )
})
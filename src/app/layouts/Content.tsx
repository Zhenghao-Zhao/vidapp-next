'use client'
import { useGuidebarContext } from "../contexts/GuidebarContextProvider";
import GuideBar from "../components/guide/GuideBar";
import MiniGuide from "../components/guide/MiniGuide";
import OverlayGuide from "../components/guide/OverlayGuide";
import PageHeader from "./PageHeader";
import { memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useOverlayContext } from "../contexts/OverlayContextProvider";

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
      <body style={show? style:{}}>
        <div className={`absolute inset-0 ${show && 'overflow-y-hidden'}`} >
          <PageHeader />
          <MiniGuide />
          <GuideBar />
          <OverlayGuide />
          { children }       
        </div>
        <div id="modalPortal" />
      </body>
  )
})
'use client'
import { useGuidebarContext } from "../contexts/GuidebarContextProvider";
import GuideBar from "../components/guide/GuideBar";
import MiniGuide from "../components/guide/MiniGuide";
import OverlayGuide from "../components/guide/OverlayGuide";
import PageHeader from "./PageHeader";
import { memo, useRef, useState } from "react";

interface Props {
  children: React.ReactNode
}

export default function Content({ children }: Props) {
  // const [overflow, setOverflow] = useState<boolean>(false);
  const { showOverlay } = useGuidebarContext();
  const ref = useRef<HTMLDivElement>(null);

  // const handleClick = () => {
  //   // if (ref.current != null) ref.current.style.overflow = "hidden"
  //   console.log("here");
  //   setOverflow(true);
  // }
  return (
      <div ref={ref} className={`absolute inset-0 ${showOverlay && "overflow-y-hidden"}`}>
          <InnerContent>
            {children}
          </InnerContent>
          {/* <button onClick={handleClick} className="bg-blue-200 absolute">click me</button> */}
        <div id="modalPortal" />
      </div>
  )
}

const InnerContent = memo(function InnerContent({children}: Props) {
  return (
        <>
          <PageHeader />
          <MiniGuide />
          <GuideBar />
          <OverlayGuide />
          { children }          
        </>)
})
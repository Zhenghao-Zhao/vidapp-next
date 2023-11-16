'use client'
import { useGuidebarContext } from "../../contexts/GuidebarContextProvider";

export default function Backdrop() {
  const { showOverlay, setShowOverlay } = useGuidebarContext();
  return (
    <div className={`${showOverlay? "fixed" : "hidden"} inset-0 bg-backdrop z-[100]`} onClick={() => setShowOverlay(false)}/>
  )
}
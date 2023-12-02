'use client'
import { useGuidebarContext } from "../contexts/GuidebarContextProvider";
import GuideBar from "../components/guide/GuideBar";
import MiniGuide from "../components/guide/MiniGuide";
import OverlayGuide from "../components/guide/OverlayGuide";
import PageHeader from "./PageHeader";

interface Props {
  children: React.ReactNode
}

export default function Content({ children }: Props) {
  const { showOverlay } = useGuidebarContext();

  return (
      <div className={`absolute inset-0 ${showOverlay && "overflow-hidden"}`}>
          <PageHeader />
          <MiniGuide />
          <GuideBar />
          <OverlayGuide />
        { children }
        <div id="modalPortal" />
      </div>
  )
}
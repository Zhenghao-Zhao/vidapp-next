import { GuideTypes } from "../types/common";
import ChipBar from "../components/chipbar/ChipBar";
import VideoPanel from "../components/video/VideoPanel";
import { useGuidebarContext } from "../contexts/GuidebarContextProvider";

export default function PageBody() {
  const { guideLayout } = useGuidebarContext();
  return (
    <section className={`mt-14 smGb:max-lgGb:ml-guide-small ${guideLayout===GuideTypes.Regular? "lgGb:ml-guide-normal":"lgGb:ml-guide-small"} px-6`}>
      <ChipBar />
      <VideoPanel />
    </section>
  )
}
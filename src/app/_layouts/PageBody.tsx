import ChipBar from "../_components/chipbar";
import { useGuidebarContext } from "../_contexts/GuidebarContextProvider";
import ImagePanel from "../_components/images/ImagePanel";
import { GuideTypes } from "../_components/guide";

export default function PageBody() {
  const { guideLayout } = useGuidebarContext();
  return (
    <section
      className={`mt-14 smGb:max-lgGb:ml-guide-small ${
        guideLayout === GuideTypes.Regular
          ? "lgGb:ml-guide-normal"
          : "lgGb:ml-guide-small"
      } px-6`}
    >
      <ChipBar />
      <ImagePanel />
    </section>
  );
}

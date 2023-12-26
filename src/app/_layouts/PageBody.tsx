import { GuideTypes } from "../_types/common";
import ChipBar from "../_components/chipbar/ChipBar";
import { useGuidebarContext } from "../_contexts/GuidebarContextProvider";
import ImagePanel from "../_components/images/ImagePanel";

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

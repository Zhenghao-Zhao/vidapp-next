import { twMerge } from "tailwind-merge";
import { useMemo } from "react";
import { GuideSections } from "../../_assets/Data";
import { useGuidebarContext } from "../../_contexts/GuidebarContextProvider";
import GuideSection from "./GuideSection";
import { GuideTypes } from ".";

type Props = {
  className?: string;
};

export default function GuideBar({ className }: Props) {
  const { guideLayout } = useGuidebarContext();

  const sections = useMemo((): JSX.Element[] => {
    return GuideSections.map((section, i) => (
      <GuideSection
        key={i}
        title={section.title}
        data={section.data}
        icon={section.icon}
        collapseSize={section.collapse}
      />
    ));
  }, []);

  return (
    <section
      className={twMerge(
        `hidden scrollbar-hidden flex-col items-center w-guide-normal fixed top-14 bottom-0 overflow-y-scroll text-sm bg-white ${
          guideLayout === GuideTypes.Regular ? "lgGb:flex" : "lgGb:hidden"
        }`,
        className
      )}
    >
      {sections}
      <div className="guide-section !border-none p-4 !pb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, molestiae
        minima! Quod quas laboriosam molestias fugiat. Voluptates nesciunt optio
        placeat.
      </div>
    </section>
  );
}

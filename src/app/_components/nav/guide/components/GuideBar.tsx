import { useDataContext } from "@/app/_libs/contexts/providers/ServerContextProvider";
import { twMerge } from "tailwind-merge";
import { GuideTypes } from "..";
import { useGuidebarContext } from "../../../../_libs/contexts/providers/GuidebarContextProvider";
import GuideSection from "./GuideSection";

type Props = {
  className?: string;
};

export default function GuideBar({ className }: Props) {
  const { guideLayout } = useGuidebarContext();
  const { data: serverData } = useDataContext();

  const sections = serverData!.guideData;
  if (!sections) return null;

  return (
    <section
      className={twMerge(
        `hidden scrollbar-hidden flex-col items-center w-guide-normal fixed top-14 bottom-0 overflow-y-scroll text-sm bg-background-primary ${
          guideLayout === GuideTypes.Regular ? "lgGb:flex" : "lgGb:hidden"
        }`,
        className
      )}
    >
      {<GuideSection title={sections[0].title} entries={sections[0].entries} />}
      {<GuideSection title={sections[1].title} entries={sections[1].entries} />}
      {<GuideSection title={sections[3].title} entries={sections[3].entries} />}
      <div className="guide-section !border-none p-4 !pb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, molestiae
        minima! Quod quas laboriosam molestias fugiat. Voluptates nesciunt optio
        placeat.
      </div>
    </section>
  );
}

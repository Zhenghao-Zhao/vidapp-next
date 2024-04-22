import { useDataContext } from "@/app/_contexts/providers/DataContextProvider";
import { getFriends } from "@/app/_queries";
import { Friend, GuideEntryType } from "@/app/_types";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { GuideTypes } from ".";
import { useGuidebarContext } from "../../_contexts/providers/GuidebarContextProvider";
import GuideSection from "./GuideSection";

type Props = {
  className?: string;
};

export default function GuideBar({ className }: Props) {
  const { guideLayout } = useGuidebarContext();
  const { data: serverData } = useDataContext();
  const { data: queryResult, isPending } = useQuery({
    queryKey: ["following"],
    queryFn: () => getFriends(0, serverData!.profile.uid, 'following'),
    initialData: serverData!.following,
  });
  const followingData = useMemo(() => {
    if (!queryResult) return [];
    const data: GuideEntryType[] = queryResult.friends.map((info: Friend) => {
      return {
        name: info.name,
        url: window.location.origin + "/" + info.username,
        image: info.imageURL,
      };
    });
    return data;
  }, [queryResult]);
  
  const sections = serverData!.guideData;
  if (!sections) return null;

  return (
    <section
      className={twMerge(
        `hidden scrollbar-hidden flex-col items-center w-guide-normal fixed top-14 bottom-0 overflow-y-scroll text-sm bg-white ${
          guideLayout === GuideTypes.Regular ? "lgGb:flex" : "lgGb:hidden"
        }`,
        className
      )}
    >
      {<GuideSection title={sections[0].title} entries={sections[0].entries} />}
      {<GuideSection title={sections[1].title} entries={sections[1].entries} />}
      {
        <GuideSection
          title={sections[2].title}
          entries={followingData}
          isEntriesLoading={isPending}
        />
      }
      {<GuideSection title={sections[3].title} entries={sections[3].entries} />}
      <div className="guide-section !border-none p-4 !pb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, molestiae
        minima! Quod quas laboriosam molestias fugiat. Voluptates nesciunt optio
        placeat.
      </div>
    </section>
  );
}

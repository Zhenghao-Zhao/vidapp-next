import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { GuideTypes } from ".";
import { GuideEntryType, GuideSections } from "../../_assets/Data";
import { useGuidebarContext } from "../../_contexts/providers/GuidebarContextProvider";
import GuideSection from "./GuideSection";
import { useDataContext } from "@/app/_contexts/providers/DataContextProvider";
import { useQuery } from "@tanstack/react-query";
import { getFollowing } from "@/app/_queries";

type Props = {
  className?: string;
};

type FollowerInfo = {
  name: string;
  username: string;
  imageURL: string;
};

export default function GuideBar({ className }: Props) {
  const { guideLayout } = useGuidebarContext();
  const { data } = useDataContext();

  const { data: following, isPending } = useQuery<FollowerInfo[]>({
    queryKey: ["following"],
    queryFn: () => getFollowing(data!.user_id),
    enabled: !!data,
  });

  const followingData = useMemo(() => {
    if (!following) return;
    const data: GuideEntryType[] = following.map((info) => {
      return {
        name: info.name,
        url: window.location.origin + "/" + info.username,
        image: info.imageURL,
      };
    });
    return data;
  }, [following]);

  const sections = useMemo((): JSX.Element[] => {
    return GuideSections.map((section, i) => {
      if (i === 2) {
        return followingData ? (
          <GuideSection
            key={i}
            title={section.title}
            data={followingData}
            icon={section.icon}
            collapseSize={section.collapse}
          />
        ) : (
          <div>No data</div>
        );
      }
      return (
        <GuideSection
          key={i}
          title={section.title}
          data={section.data}
          icon={section.icon}
          collapseSize={section.collapse}
        />
      );
    });
  }, [followingData]);
  console.log(followingData);
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

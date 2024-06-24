import { useDataContext } from "@/app/_libs/contexts/providers/ServerContextProvider";
import { twMerge } from "tailwind-merge";
import { GuideTypes } from "..";
import { useGuidebarContext } from "../../../../_libs/contexts/providers/GuidebarContextProvider";
import GuideSection from "./GuideSection";
import Divider from "@/app/_components/ui/divider";

type Props = {
  className?: string;
};

export default function GuideBar({ className }: Props) {
  const { guideLayout } = useGuidebarContext();
  const { data: serverData } = useDataContext();

  const username = serverData.profile.username;
  const sections = getGuideData(username);

  return (
    <section
      className={twMerge(
        `hidden scrollbar-hidden flex-col items-center w-guide-normal fixed top-14 bottom-0 overflow-y-scroll text-sm bg-background-primary ${
          guideLayout === GuideTypes.Regular ? "lgGb:flex" : "lgGb:hidden"
        }`,
        className
      )}
    >
      <GuideSection title={sections[0].title} entries={sections[0].entries} />
      <Divider />
      <GuideSection title={sections[1].title} entries={sections[1].entries} />
      <Divider />
      <GuideSection title={sections[3].title} entries={sections[3].entries} />
      <Divider />
      <div className="guide-section !border-none p-4 !pb-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, molestiae
        minima! Quod quas laboriosam molestias fugiat. Voluptates nesciunt optio
        placeat.
      </div>
    </section>
  );
}

function getGuideData(username: string) {
  const guideData = [
    {
      title: "",
      entries: [
        {
          name: "Home",
          url: "/",
          icon: "home",
        },
        {
          name: "Exposition",
          url: "/explore",
          icon: "explore",
        },
      ],
    },

    {
      title: "You",
      collapse: 5,
      icon: "arrowRight",
      entries: [
        {
          name: "Your collection",
          url: "/" + username,
          icon: "you",
        },
        {
          name: "Bookmarks",
          url: "#",
          icon: "library",
        },
      ],
    },
    {
      title: "Recent following",
      collapse: 7,
      entries: [],
    },
    {
      title: "Explore",
      entries: [
        {
          name: "Trending",
          url: "#",
          icon: "trending",
        },
        {
          name: "Music",
          url: "#",
          icon: "music",
        },
        {
          name: "Films",
          url: "#",
          icon: "films",
        },
        {
          name: "Live",
          url: "#",
          icon: "live",
        },
        {
          name: "Gaming",
          url: "#",
          icon: "gaming",
        },
        {
          name: "News",
          url: "#",
          icon: "news",
        },
        {
          name: "Sports",
          url: "#",
          icon: "sports",
        },
        {
          name: "Podcasts",
          url: "#",
          icon: "podcasts",
        },
      ],
    },
  ];

  return guideData;
}

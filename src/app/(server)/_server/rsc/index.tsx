import { createClient } from "@/app/_libs/utils/supabase/server";
import { ENV } from "@/env";

export async function Data() {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData || !userData.user) return;

  const uid = userData.user.id;
  const { data: profileData } = await supabase
    .from("profiles")
    .select("uid, username, name, image_filename")
    .eq("uid", uid)
    .single();
  if (!profileData) throw new Error("User profile not found");

  const imageURL =
    profileData.image_filename &&
    ENV.R2_BUCKET_URL_PUBLIC + "/" + profileData.image_filename;

  const guideData = getGuideData(profileData.username);

  const appData = { profile: { ...profileData, imageURL }, guideData };
  return (
    <script
      id="data"
      type="application/json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(appData) }}
    />
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

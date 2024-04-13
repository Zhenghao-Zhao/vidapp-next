import { createClient } from "@/app/_utility/supabase/server";
import { ENV } from "@/app/env";
import { getUserFollowing } from "../utils/queries";

export async function Data() {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData || !userData.user) return null;

  const uid = userData.user.id;
  const { data: profileData } = await supabase
    .from("profiles")
    .select("uid, username, name, image_filename")
    .eq("uid", uid)
    .single();
  if (!profileData) return null;

  const imageURL =
    profileData.image_filename &&
    ENV.R2_BUCKET_URL_PUBLIC + "/" + profileData.image_filename;
  const following = await getUserFollowing(supabase, uid);

  const guideData = [
    {
      title: "",
      entries: [
        {
          name: "Home",
          url: "/",
          icon: "Home",
        },
      ],
    },

    {
      title: "You",
      collapse: 5,
      icon: "ArrowRight",
      entries: [
        {
          name: "Your collection",
          url: "/" + profileData.username,
          icon: "You",
        },
        {
          name: "Bookmarks",
          url: "#",
          icon: "Library",
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
          icon: "Trending",
        },
        {
          name: "Music",
          url: "#",
          icon: "Music",
        },
        {
          name: "Films",
          url: "#",
          icon: "Films",
        },
        {
          name: "Live",
          url: "#",
          icon: "Live",
        },
        {
          name: "Gaming",
          url: "#",
          icon: "Gaming",
        },
        {
          name: "News",
          url: "#",
          icon: "News",
        },
        {
          name: "Sports",
          url: "#",
          icon: "Sports",
        },
        {
          name: "Podcasts",
          url: "#",
          icon: "Podcasts",
        },
      ],
    },
  ];
  const chips = [
    "All",
    "Mixes",
    "Music",
    "Top Gear",
    "Performance cars",
    "Game shows",
    "Gaming",
    "Car Racing",
    "NBA",
    "Computer programming",
    "Culinary arts",
    "Retrievers",
    "Live",
    "Comedy",
    "Action-adventure games",
    "Recently uploaded"
  ]
  
  const appData = { profile: {...profileData, imageURL}, guideData, chips, following };
  return (
    <script
      id="data"
      type="application/json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(appData) }}
    />
  );
}

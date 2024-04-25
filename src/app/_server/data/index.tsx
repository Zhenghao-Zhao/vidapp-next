import { createClient } from "@/app/_utils/supabase/server";
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

  const followingData = await getUserFollowing(supabase, uid);
  
  const following = typeof (followingData) === 'string'? undefined : followingData;

  const guideData = [
    {
      title: "",
      entries: [
        {
          name: "Home",
          url: "/",
          icon: "home",
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
          url: "/" + profileData.username,
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

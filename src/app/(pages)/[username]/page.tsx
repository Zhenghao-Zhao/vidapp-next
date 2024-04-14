import { getFirstPagePosts, getUserProfile } from "@/app/_server/utils/queries";
import { createClient } from "@/app/_utility/supabase/server";
import { notFound } from "next/navigation";
import Content from "./_components/Content";
import Header from "./_components/Header";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) return notFound(); // todo: should be unauthenticated error

  const from_uid = userData.user.id;
  const profileData = await getUserProfile(supabase, params.username, from_uid);
  if (!profileData) return notFound();

  const postData = await getFirstPagePosts(
    supabase,
    profileData.uid,
    from_uid,
    0,
    9
  );
  if (!postData) return notFound();

  const postInitData = {
    pageParams: [],
    pages: [{ nextCursor: postData.nextCursor, posts: postData.posts }],
  };

  const isOwner = profileData.uid === userData.user.id;

  return (
    <div className="flex flex-col grow">
      <div className="max-w-grid-maxWidth w-full h-full m-auto">
        <Header profile={profileData} isOwner={isOwner} />
        <Content
          uid={profileData.uid}
          isOwner={isOwner}
          initialData={postInitData}
        />
      </div>
    </div>
  );
}

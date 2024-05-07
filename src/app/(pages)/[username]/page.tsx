import { getFirstPagePosts, getUserProfile } from "@/app/_server/utils/queries";
import { Profile } from "@/app/_types";
import { createClient } from "@/app/_utils/supabase/server";
import { notFound } from "next/navigation";
import Container from "./Container";

export type InitData = {
  profile: Profile,
  isOwner: boolean,
  postData: any,
}

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  if (!data || !data.session) return notFound(); // todo: should be unauthenticated error

  const user = data.session.user;
  const from_uid = user.id;
  const profileData = await getUserProfile(supabase, params.username, from_uid);
  if (!profileData) return notFound();

  const isOwner = profileData.uid === user.id;
  const postData = await getFirstPagePosts(
    supabase,
    profileData.uid,
    from_uid,
    0,
    9
  );
  if (!postData) return notFound();

  const postInitData = {
    pageParams: [0],
    pages: [{ nextCursor: postData.nextCursor, posts: postData.posts }],
  };

  return (
    <Container initData={{profile: profileData, isOwner, postData: postInitData}} />
  );
}

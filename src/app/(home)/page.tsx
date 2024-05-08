import { notFound } from "next/navigation";
import { getFollowingPosts } from "../_server/utils/queries";
import { createClient } from "../_utils/supabase/server";
import Container from "./Container";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  if (!data || !data.session) return notFound(); // todo: should be unauthenticated error

  const user = data.session.user;
  const {data: postData, error} = await getFollowingPosts(supabase, user.id);
  if (error) return notFound();

  const postInitData = {
    pageParams: [0],
    pages: [postData],
  };

  return <Container initData={postInitData} />;
}

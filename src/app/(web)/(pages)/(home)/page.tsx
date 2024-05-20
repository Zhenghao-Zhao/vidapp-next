import { notFound } from "next/navigation";
import { getFollowingPosts } from "../../../(server)/_server/utils/queries";
import { createClient } from "../../../_libs/utils/supabase/server";
import Content from "./_content";

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

  return <Content initData={postInitData} />;
}

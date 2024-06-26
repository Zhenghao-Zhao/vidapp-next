import { notFound } from "next/navigation";
import { getFolloweePosts } from "../../(server)/_server/utils/queries";
import { createClient } from "../../_libs/utils/supabase/server";
import Content from "./_content";
import Auth from "@/app/_components/auth";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return <Auth />;

  const { data: postData, error } = await getFolloweePosts(supabase, user.id);
  if (error) return notFound();

  const postInitData = {
    pageParams: [0],
    pages: [postData],
  };
  return <Content initData={postInitData} />;
}

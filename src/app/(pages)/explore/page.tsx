import { getExplorePosts } from "@/app/(server)/_server/utils/queries";
import { createClient } from "@/app/_libs/utils/supabase/server";
import Content from "./_content";

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  if (!data || !data.session) throw new Error("User session expired");

  const user = data.session.user;
  const { data: postData, error: postError } = await getExplorePosts(
    supabase,
    user.id,
    0,
    9
  );
  if (postError) throw new Error(postError.message);

  const postInitData = {
    pageParams: [0],
    pages: [postData],
  };

  return <Content uid={user.id} initData={postInitData} />;
}

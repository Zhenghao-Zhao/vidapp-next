import { getUserProfile } from "@/app/_server/utils/queries";
import { createClient } from "@/app/_utility/supabase/server";
import { notFound } from "next/navigation";
import PageContent from "./_content";

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

  return <PageContent initProfile={profileData} />;
}

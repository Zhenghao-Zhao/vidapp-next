import Spinner, { SpinnerSize } from "@/app/_components/loaders";
import { getUserProfile } from "@/app/_server/utils/queries";
import { createClient } from "@/app/_utility/supabase/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Header from "./Header";
import Main from "./Main";

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

  const isOwner = profileData.uid === userData.user.id;

  return (
    <div className="max-w-grid-maxWidth flex flex-col grow">
      <Header profile={profileData} isOwner={isOwner} />
      <Suspense fallback={<Spinner size={SpinnerSize.MEDIUM} />}>
        <Main uid={profileData.uid} from_uid={from_uid} isOwner={isOwner} />
      </Suspense>
    </div>
  );
}

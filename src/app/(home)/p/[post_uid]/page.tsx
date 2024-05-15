import { getPost } from "@/app/_server/utils/queries";
import { createClient } from "@/app/_utils/supabase/server";
import PostView from "@/app/posts/PostView";
import { notFound } from "next/navigation";
import React from "react";
import Container from "./_Container";

export default async function Page({
  params: { post_uid },
}: {
  params: { post_uid: string };
}) {
  const supabase = createClient();
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData || !sessionData.session) return notFound(); // todo: should be unauthenticated error

  const user = sessionData.session.user;
  const from_uid = user.id;
  const { data, error } = await getPost(supabase, post_uid, from_uid);
  if (error) return notFound();

  return <Container initData={data} />;
}

import { Database } from "@/app/_schema/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function supaAddLikeToPost(
  supabase: SupabaseClient<Database>,
  post_uid: string,
  from_uid: string
) {
  return supabase.from("likes").insert({ post_uid, from_uid });
}

export async function supaRemoveLikeToPost(
  supabase: SupabaseClient<Database>,
  post_uid: string,
  from_uid: string
) {
  return supabase.from("likes").delete().match({ post_uid, from_uid });
}

export async function supaDeletePost(
  supabase: SupabaseClient<Database>,
  uid: string,
  from_uid: string
) {
  return supabase.from("posts").delete().match({ uid, from_uid });
}

export async function supaGetComments(
  supabase: SupabaseClient<Database>,
  post_uid: string,
  arg_from: number,
  arg_to: number
) {
  return supabase.rpc("get_paginated_post_comments", {
    arg_post_uid: post_uid,
    arg_from,
    arg_to,
  });
}

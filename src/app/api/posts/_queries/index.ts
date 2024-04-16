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
) {
  return supabase.from("posts").delete().eq('uid', uid);
}

export async function supaGetComments(
  supabase: SupabaseClient<Database>,
  post_uid: string,
  from_uid: string,
  arg_from: number,
  arg_limit: number
) {
  return supabase.rpc("get_paginated_post_comments", {
    arg_post_uid: post_uid,
    arg_from_uid: from_uid,
    arg_from,
    arg_limit,
  });
}

export async function supaAddComment(
  supabase: SupabaseClient<Database>,
  post_uid: string,
  from_uid: string,
  comment: string
) {
  return supabase
    .from("comments")
    .insert({ comment, from_uid, post_uid })
    .select("created_at, uid, profiles (uid, username, name, image_filename)").single();
}

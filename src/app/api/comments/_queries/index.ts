import { SupabaseClient } from "@supabase/supabase-js";

export async function supaAddLikeToComment(
  supabase: SupabaseClient,
  comment_uid: string,
  liked_by: string
) {
  return supabase.from("comment_likes").insert({ comment_uid, liked_by }).select();
}

export async function supaRemoveLikeToComment(
  supabase: SupabaseClient,
  comment_uid: string,
  liked_by: string
) {
  return supabase
    .from("comment_likes")
    .delete()
    .match({ comment_uid, liked_by }).select();
}

import { Database } from "@/app/_schema/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function supaAddLikeToPost(
  supabase: SupabaseClient<Database>,
  post_id: string,
  from_uid: string,
) {
  return supabase.from("likes").insert({ post_id, from_uid });
}

export async function supaRemoveLikeToPost(
  supabase: SupabaseClient<Database>,
  post_id: string,
  from_uid: string,
) {
  return supabase.from("likes").delete().match({ post_id, from_uid });
}

export async function supaDeletePost(
  supabase: SupabaseClient<Database>,
  post_id: string,
  from_uid: string,
) {
  return supabase.from("posts").delete().match({ post_id, from_uid });
}

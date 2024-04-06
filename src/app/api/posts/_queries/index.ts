import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function supaAddLikeToPost(
  post_id: string,
  from_uid: string
) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("likes").insert({ post_id, from_uid });
}

export async function supaRemoveLikeToPost(
  post_id: string,
  from_uid: string
) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("likes").delete().match({ post_id, from_uid });
}

export async function supaDeletePost(post_id: string, from_uid: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.from('posts').delete().match({ post_id, from_uid });
}


import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function supaAddLikeToPost(
  post_id: string,
  from_username: string
) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("likes").insert({ post_id, from_username });
}

export async function supaRemoveLikeToPost(
  post_id: string,
  from_username: string
) {
  const supabase = createRouteSupabaseClient();
  return supabase.from("likes").delete().match({ post_id, from_username });
}

export async function supaDeletePost(post_id: string, username: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.from('posts').delete().match({ post_id, username });
}


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

export async function supaIncrementLikesCount(post_id: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.rpc("increment_likes", { row_id: post_id });
}

export async function supaDecrementLikesCount(post_id: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.rpc("decrement_likes", { row_id: post_id });
}

export async function supaDeletePost(post_id: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.from('posts').delete().match({ post_id });
}

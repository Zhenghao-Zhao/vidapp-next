import { ImageRow, PostRow } from "@/app/_schema";
import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function supaGetPostCount(username: string) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("username", username);
}

export async function supaGetPaginatedPosts(
  username: string,
  from: number,
  to: number
) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("posts")
    .select("description, likes_count, images (filename)")
    .eq("username", username)
    .range(from, to);
}

export async function supaGetUserProfileByUsername(username: string) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("profiles")
    .select("username, name, image_id, images (filename)")
    .eq("username", username)
    .single();
}

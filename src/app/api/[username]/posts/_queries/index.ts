import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function supaGetPaginatedPosts(
  username: string,
  from: number,
  to: number
) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("posts")
    .select("post_id, created_at, description, likes_count, images (filename), profiles (username, name, image_filename), likes (from_username)")
    .eq("username", username)
    .range(from, to).order('created_at', { ascending: false });
}

export async function supaGetUserProfileByUsername(username: string) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("profiles")
    .select("username, name, image_filename, posts (id)")
    .eq("username", username)
    .single();
}

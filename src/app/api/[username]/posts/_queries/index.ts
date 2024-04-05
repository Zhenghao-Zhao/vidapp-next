import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function supaGetPaginatedPosts(
  username: string,
  from: number,
  to: number
) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("posts")
    .select(
      "post_id, created_at, description, images (filename), profiles (username, name, image_filename), likes (from_username)"
    )
    .eq("username", username)
    .range(from, to)
    .order("created_at", { ascending: false });
}

export async function supaGetUserProfileByUsername(username: string) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("profiles")
    .select("username, name, image_filename, posts (id)")
    .eq("username", username)
    .single();
}

export async function supaGetUserProfileWithFunction(username: string, from_username: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.rpc("get_user_profile", { arg_username: username, arg_from_username: from_username });
}

export async function supaGetPaginatedPostsFunction(
  username: string,
  from: number,
  to: number
) {
  const supabase = createRouteSupabaseClient();
  return supabase.rpc("get_paginated_user_posts", {
    arg_username: username,
    arg_from: from,
    arg_to: to,
  });
}

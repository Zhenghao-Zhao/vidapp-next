import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export async function supaGetPaginatedPosts(
  uid: string,
  from: number,
  to: number
) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("posts")
    .select(
      "post_id, created_at, description, images (filename), profiles (username, name, image_filename), likes (from_username)"
    )
    .eq("username", uid)
    .range(from, to)
    .order("created_at", { ascending: false });
}

export async function supaGetUserProfileByUsername(uid: string) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("profiles")
    .select("username, name, image_filename, posts (id)")
    .eq("username", uid)
    .single();
}

export async function supaGetUserProfileWithFunction(uid: string, from_uid: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.rpc("get_user_profile", { arg_uid: uid, arg_from_uid: from_uid });
}

export async function supaGetPaginatedPostsFunction(
  uid: string,
  from_uid: string,
  from: number,
  to: number
) {
  const supabase = createRouteSupabaseClient();
  return supabase.rpc("get_paginated_user_posts", {
    arg_uid: uid,
    arg_from_uid: from_uid,
    arg_from: from,
    arg_to: to,
  });
}

import { Database } from "@/app/_schema/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function supaGetPaginatedPosts(
  supabase: SupabaseClient<Database>,
  uid: string,
  from: number,
  to: number
) {
  return supabase
    .from("posts")
    .select(
      "uid, created_at, description, images (filename), profiles (username, name, image_filename), likes (from_username)"
    )
    .eq("username", uid)
    .range(from, to)
    .order("created_at", { ascending: false });
}

export async function supaGetUserProfileByUsername(
  supabase: SupabaseClient<Database>,
  uid: string
) {
  return supabase
    .from("profiles")
    .select("username, name, image_filename, posts (id)")
    .eq("username", uid)
    .single();
}

export async function supaGetUserProfileWithFunction(
  supabase: SupabaseClient<Database>,
  username: string,
  from_uid: string
) {
  return supabase
    .rpc("get_user_profile", { arg_username: username, arg_from_uid: from_uid })
    .single();
}

export async function supaGetPaginatedPostsFunction(
  supabase: SupabaseClient<Database>,
  uid: string,
  from_uid: string,
  from: number,
  to: number
) {
  return supabase.rpc("get_paginated_user_posts", {
    arg_uid: uid,
    arg_from_uid: from_uid,
    arg_from: from,
    arg_to: to,
  });
}

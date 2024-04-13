import { Database } from "@/app/_schema/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export function supaGetFollowers(
  supabase: SupabaseClient<Database>,
  uid: string
) {
  return supabase
    .from("followers")
    .select("profiles (username, name, image_filename)")
    .eq("owner_uid", uid);
}

export function supaGetPaginatedFollowersFunction(
  supabase: SupabaseClient<Database>,
  uid: string,
  from: number,
  limit: number
) {
  return supabase.rpc("get_paginated_user_followers", { arg_uid: uid, arg_from: from, arg_limit: limit });
}

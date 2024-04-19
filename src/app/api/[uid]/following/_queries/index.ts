import { Database } from "@/app/_schema/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export function supaGetFollowingFunction(
  supabase: SupabaseClient<Database>,
  uid: string,
  from: number,
  limit: number
) {
  return supabase.rpc("get_paginated_user_following", {
    arg_uid: uid,
    arg_from: from,
    arg_limit: limit,
  });
}

export function supaQueryFollowing(
  supabase: SupabaseClient<Database>,
  uid: string,
  query: string,
) {
  return supabase.rpc("query_following", {
    arg_uid: uid,
    arg_query: query,
  })
}

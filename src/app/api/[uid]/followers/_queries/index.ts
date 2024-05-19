import { Database } from "@/app/_libs/_schema/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export function supaGetFollowers(
  supabase: SupabaseClient<Database>,
  uid: string,
  from: number,
  limit: number
) {
  return supabase.rpc("get_paginated_user_followers", {
    arg_uid: uid,
    arg_from: from,
    arg_limit: limit,
  });
}

export function supaQueryFollowers(
  supabase: SupabaseClient<Database>,
  uid: string,
  query: string
) {
  return supabase.rpc("query_followers", {
    arg_uid: uid,
    arg_query: query,
  });
}

import { Database } from "@/app/_schema/supabase";
import { createClient } from "@/app/_utility/supabase/server";
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

export function supaGetFollowersFunction(
  supabase: SupabaseClient<Database>,
  uid: string
) {
  return supabase.rpc("get_user_followers", { arg_uid: uid });
}

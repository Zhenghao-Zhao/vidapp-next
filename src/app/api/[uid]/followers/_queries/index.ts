import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export function supaGetFollowers(uid: string) {
  const supabase = createRouteSupabaseClient();
  return supabase
    .from("followers")
    .select("profiles (username, name, image_filename)")
    .eq("owner_uid", uid);
}

export function supaGetFollowersFunction(uid: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.rpc("get_user_followers", { arg_uid: uid });
}



import { createRouteSupabaseClient } from "@/app/_utility/supabase-server";

export function supaGetFollowingFunction(uid: string) {
  const supabase = createRouteSupabaseClient();
  return supabase.rpc("get_user_following", { arg_uid: uid });
}